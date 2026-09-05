/**
 * Keys the black background out of the supplied phoenix artwork (JPG) and writes
 * optimised, trimmed assets with alpha:
 *   public/images/brand/phoenix.png       (hero, full size)
 *   public/images/brand/phoenix.webp      (alternative, smaller)
 *   public/images/brand/phoenix-logo.png  (320px, header/footer logo)
 *
 * Usage: node scripts/prepare-phoenix.mjs <path/to/phoenix.jpg>
 */
import sharp from "sharp";

const src = process.argv[2];
if (!src) {
  console.error("Usage: node scripts/prepare-phoenix.mjs <phoenix.jpg>");
  process.exit(2);
}

const { data, info } = await sharp(src).raw().toBuffer({ resolveWithObject: true });
const { width, height, channels } = info;
const out = Buffer.alloc(width * height * 4);
for (let i = 0, j = 0; i < data.length; i += channels, j += 4) {
  const r = data[i];
  const g = data[i + 1];
  const b = data[i + 2];
  // "screen" keying: alpha = brightest channel, un-premultiply colour so the glow stays vivid
  let a = Math.max(r, g, b);
  if (a < 18) a = 0; // remove JPEG noise in the black background
  const k = a ? 255 / a : 0;
  out[j] = Math.min(255, Math.round(r * k));
  out[j + 1] = Math.min(255, Math.round(g * k));
  out[j + 2] = Math.min(255, Math.round(b * k));
  out[j + 3] = a;
}
const img = sharp(out, { raw: { width, height, channels: 4 } }).trim({ threshold: 10 });
await img.clone().png({ compressionLevel: 9 }).toFile("public/images/brand/phoenix.png");
await img.clone().webp({ quality: 90, alphaQuality: 90 }).toFile("public/images/brand/phoenix.webp");
await img.clone().resize({ width: 320 }).png().toFile("public/images/brand/phoenix-logo.png");
console.log("✓ public/images/brand/phoenix.png / phoenix.webp / phoenix-logo.png");
