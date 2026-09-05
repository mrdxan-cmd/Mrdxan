/**
 * Runs the full QA suite against a production build:
 *   build (with placeholders visible) → start server → verify-site → screenshots → form
 *
 * Usage: npm run qa
 */
import { spawn } from "node:child_process";
import { setTimeout as sleep } from "node:timers/promises";

const port = process.env.PORT ?? "3000";
const env = {
  ...process.env,
  PORT: port,
  NEXT_PUBLIC_SHOW_PLACEHOLDERS: process.env.NEXT_PUBLIC_SHOW_PLACEHOLDERS ?? "true",
  QUOTE_ALLOW_LOG_ONLY: "true",
  QA_BASE_URL: `http://localhost:${port}`,
  QA_REPORT: "1",
  NEXT_TELEMETRY_DISABLED: "1",
};

function run(cmd, args, opts = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(cmd, args, { stdio: "inherit", env, ...opts });
    child.on("exit", (code) => (code === 0 ? resolve() : reject(new Error(`${cmd} ${args.join(" ")} exited with ${code}`))));
  });
}

if (!process.env.QA_SKIP_BUILD) {
  await run("npx", ["next", "build"]);
}

const server = spawn("npx", ["next", "start", "-p", port], { stdio: "inherit", env });
const stop = () => {
  if (!server.killed) server.kill("SIGTERM");
};
process.on("exit", stop);
process.on("SIGINT", () => {
  stop();
  process.exit(130);
});

// Wait for server
let ready = false;
for (let i = 0; i < 60 && !ready; i++) {
  try {
    const res = await fetch(`http://localhost:${port}/`);
    ready = res.ok;
  } catch {
    await sleep(500);
  }
}
if (!ready) {
  stop();
  throw new Error("Server did not start");
}

let failed = false;
for (const script of ["scripts/qa/verify-site.mjs", "scripts/qa/screenshots.mjs", "scripts/qa/form.mjs"]) {
  console.log(`\n=== ${script} ===`);
  try {
    await run("node", [script]);
  } catch (e) {
    failed = true;
    console.error(String(e));
  }
}
stop();
process.exit(failed ? 1 : 0);
