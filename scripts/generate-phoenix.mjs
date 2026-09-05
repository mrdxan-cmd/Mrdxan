/**
 * Generates public/images/brand/phoenix.svg – the hero artwork – from simple
 * geometry so the feathers stay consistent and editable.
 *
 * Usage: node scripts/generate-phoenix.mjs
 */
import { writeFile } from "node:fs/promises";

const W = 800;
const H = 800;
const f = (n) => Math.round(n * 10) / 10;

/** Leaf/feather shape from base (bx,by) to tip (tx,ty). `bulge` bends the feather, `width` sets thickness. */
function feather(bx, by, tx, ty, width, bulge = 0) {
  const mx = (bx + tx) / 2;
  const my = (by + ty) / 2;
  const dx = tx - bx;
  const dy = ty - by;
  const len = Math.hypot(dx, dy) || 1;
  const nx = -dy / len;
  const ny = dx / len;
  // control points on each side (asymmetric bulge bends the whole feather)
  const c1x = mx + nx * (width + bulge);
  const c1y = my + ny * (width + bulge);
  const c2x = mx - nx * (width - bulge);
  const c2y = my - ny * (width - bulge);
  return `M${f(bx)} ${f(by)} Q${f(c1x)} ${f(c1y)} ${f(tx)} ${f(ty)} Q${f(c2x)} ${f(c2y)} ${f(bx)} ${f(by)}Z`;
}

/** Feathers of one wing. side = 1 (right) or -1 (left). */
function wing(side) {
  const sx = 400 + side * 22; // shoulder
  const sy = 356;
  const specs = [
    // [tipX offset, tipY, width, bulge, opacity]
    [330, 120, 30, 26, 1],
    [300, 205, 30, 30, 0.96],
    [256, 285, 28, 30, 0.92],
    [200, 355, 25, 26, 0.88],
    [140, 420, 22, 20, 0.84],
    [88, 470, 18, 14, 0.8],
  ];
  return specs
    .map(([tx, ty, w, b, o]) => `<path d="${feather(sx, sy, 400 + side * tx, ty, w, side * b)}" opacity="${o}"/>`)
    .join("\n    ");
}

/** Inner, lighter feathers for depth. */
function innerWing(side) {
  const sx = 400 + side * 18;
  const sy = 372;
  const specs = [
    [200, 190, 16, 12],
    [176, 260, 15, 12],
    [140, 320, 13, 10],
    [98, 372, 11, 8],
  ];
  return specs.map(([tx, ty, w, b]) => `<path d="${feather(sx, sy, 400 + side * tx, ty, w, side * b)}"/>`).join("\n    ");
}

/** Tail plumes flowing downward. */
function tail() {
  const bx = 400;
  const by = 540;
  const specs = [
    [-190, 690, 24, -48, 0.95],
    [190, 690, 24, 48, 0.95],
    [-110, 745, 22, -26, 0.9],
    [110, 745, 22, 26, 0.9],
    [-36, 775, 18, -6, 0.85],
    [36, 775, 18, 6, 0.85],
  ];
  return specs.map(([tx, ty, w, b, o]) => `<path d="${feather(bx, by, bx + tx, ty, w, b)}" opacity="${o}"/>`).join("\n    ");
}

/** Crest plumes sweeping back from the head. */
function crest() {
  const hx = 432;
  const hy = 214;
  const specs = [
    [-118, 130, 10, -18],
    [-104, 96, 10, -16],
    [-78, 66, 9, -12],
  ];
  return specs.map(([tx, ty, w, b]) => `<path d="${feather(hx, hy, hx + tx, ty, w, b)}"/>`).join("\n    ");
}

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${W} ${H}" width="${W}" height="${H}" role="img" aria-labelledby="t d">
  <title id="t">Phönix – Markenillustration Maler Phönix</title>
  <desc id="d">Stilisierter Phönix mit ausgebreiteten, flammenartigen Schwingen, der aus dem Feuer aufsteigt.</desc>
  <defs>
    <linearGradient id="wingR" x1="0" y1="1" x2="1" y2="0">
      <stop offset="0" stop-color="#b8281a"/>
      <stop offset="0.4" stop-color="#f45f14"/>
      <stop offset="0.78" stop-color="#ffa06a"/>
      <stop offset="1" stop-color="#ffe0a8"/>
    </linearGradient>
    <linearGradient id="wingL" x1="1" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="#b8281a"/>
      <stop offset="0.4" stop-color="#f45f14"/>
      <stop offset="0.78" stop-color="#ffa06a"/>
      <stop offset="1" stop-color="#ffe0a8"/>
    </linearGradient>
    <linearGradient id="inner" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="#ffb37a"/>
      <stop offset="1" stop-color="#fff1cc"/>
    </linearGradient>
    <linearGradient id="body" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#ffd98a"/>
      <stop offset="0.45" stop-color="#f45f14"/>
      <stop offset="1" stop-color="#8a2c0f"/>
    </linearGradient>
    <linearGradient id="tail" x1="0" y1="0" x2="0" y2="1">
      <stop offset="0" stop-color="#f45f14"/>
      <stop offset="0.55" stop-color="#e0341e"/>
      <stop offset="1" stop-color="#e0341e" stop-opacity="0"/>
    </linearGradient>
    <linearGradient id="flame" x1="0" y1="1" x2="0" y2="0">
      <stop offset="0" stop-color="#e0341e" stop-opacity="0"/>
      <stop offset="0.5" stop-color="#f45f14" stop-opacity="0.8"/>
      <stop offset="1" stop-color="#ffd98a"/>
    </linearGradient>
    <radialGradient id="glow" cx="0.5" cy="0.5" r="0.5">
      <stop offset="0" stop-color="#ff7a33" stop-opacity="0.5"/>
      <stop offset="0.6" stop-color="#f45f14" stop-opacity="0.1"/>
      <stop offset="1" stop-color="#f45f14" stop-opacity="0"/>
    </radialGradient>
    <filter id="soft" x="-30%" y="-30%" width="160%" height="160%"><feGaussianBlur stdDeviation="16"/></filter>
  </defs>

  <circle cx="400" cy="420" r="340" fill="url(#glow)"/>
  <ellipse cx="400" cy="640" rx="140" ry="70" fill="#f45f14" opacity="0.3" filter="url(#soft)"/>

  <!-- flames -->
  <g fill="url(#flame)">
    <path d="M400 790c-74-40-116-104-100-184 8-42 34-74 62-102-10 46 4 74 30 96 2-46 24-82 60-106-8 54 12 88 48 112 30-28 42-66 36-108 42 52 58 112 36 174-18 52-72 94-172 118z"/>
    <path opacity="0.75" d="M334 748c-42-38-54-88-36-138 6 32 22 54 48 64-6-32 2-58 26-82-2 38 12 60 40 76 6-28 24-48 50-58-8 38 4 64 32 82-44 48-100 68-160 56z"/>
  </g>

  <!-- tail -->
  <g fill="url(#tail)">
    ${tail()}
  </g>

  <!-- wings -->
  <g fill="url(#wingR)">
    ${wing(1)}
  </g>
  <g fill="url(#wingL)">
    ${wing(-1)}
  </g>
  <g fill="url(#inner)" opacity="0.55">
    ${innerWing(1)}
    ${innerWing(-1)}
  </g>

  <!-- body -->
  <path fill="url(#body)" d="M400 312c-34 0-58 40-58 108 0 60 24 106 58 160 34-54 58-100 58-160 0-68-24-108-58-108z"/>
  <path fill="#ffe0a8" opacity="0.4" d="M396 340c-14 8-24 36-24 74 0 34 10 66 26 104-6-46-8-80-6-110 2-30 6-52 4-68z"/>

  <!-- neck -->
  <path fill="url(#body)" d="M382 330c-6-36 6-70 30-96l32 14c-18 22-26 50-22 88-12-10-26-12-40-6z"/>

  <!-- head -->
  <g>
    <path fill="url(#body)" d="M432 176c-24 0-40 18-40 42 0 22 14 36 40 46 26-10 40-24 40-46 0-24-16-42-40-42z"/>
    <path fill="#ffe0a8" d="M470 214l42 10-40 16z"/>
    <g fill="url(#wingR)">
      ${crest()}
    </g>
    <circle cx="446" cy="212" r="4.5" fill="#16150f"/>
    <circle cx="447.5" cy="210.5" r="1.4" fill="#fff"/>
  </g>

  <!-- ember particles -->
  <g fill="#ffd98a">
    <circle cx="140" cy="480" r="3" opacity="0.8"/>
    <circle cx="200" cy="580" r="2" opacity="0.6"/>
    <circle cx="660" cy="500" r="3" opacity="0.8"/>
    <circle cx="610" cy="610" r="2" opacity="0.6"/>
    <circle cx="700" cy="360" r="2.5" opacity="0.7"/>
    <circle cx="100" cy="340" r="2.5" opacity="0.7"/>
    <circle cx="560" cy="130" r="2" opacity="0.7"/>
    <circle cx="250" cy="120" r="2" opacity="0.7"/>
  </g>
</svg>
`;

await writeFile("public/images/brand/phoenix.svg", svg);
console.log("✓ public/images/brand/phoenix.svg");
