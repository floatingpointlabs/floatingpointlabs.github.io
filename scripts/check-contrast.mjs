/**
 * Verifies the contrast ratios asserted in global.css against the WCAG formula,
 * reading the values straight out of the token layer so the check can't drift
 * from what the site actually renders. Run with `pnpm contrast`.
 *
 * Exits non-zero if any text token falls below 3:1, which is the floor even for
 * large text and UI components.
 */

import { readFile } from "node:fs/promises";

const css = await readFile(new URL("../src/styles/global.css", import.meta.url), "utf8");

function token(name) {
  const match = css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{6})`));
  if (!match) throw new Error(`token --${name} not found`);
  return match[1];
}

const channel = (c) => (c / 255 <= 0.04045 ? c / 255 / 12.92 : ((c / 255 + 0.055) / 1.055) ** 2.4);

function luminance(hex) {
  const n = parseInt(hex.slice(1), 16);
  return (
    0.2126 * channel((n >> 16) & 255) + 0.7152 * channel((n >> 8) & 255) + 0.0722 * channel(n & 255)
  );
}

function ratio(a, b) {
  const [hi, lo] = [luminance(a), luminance(b)].sort((x, y) => y - x);
  return (hi + 0.05) / (lo + 0.05);
}

const TEXT_TOKENS = [
  "color-fg",
  "color-muted",
  "color-subtle",
  "color-faint",
  "brand-500",
  "violet-400",
  "brand-400",
  "brand-300"
];

const bg = token("color-bg");
let failures = 0;

console.log(`against --color-bg ${bg}:\n`);
for (const name of TEXT_TOKENS) {
  const hex = token(name);
  const r = ratio(bg, hex);
  const verdict = r >= 7 ? "AAA" : r >= 4.5 ? "AA" : r >= 3 ? "large text / UI only" : "FAIL";
  if (r < 3) failures += 1;
  console.log(`  --${name.padEnd(13)} ${hex}  ${r.toFixed(2).padStart(6)}:1  ${verdict}`);
}

/*
 * Text sitting on a filled surface rather than on the page background. The
 * accent is only ever a fill — it is never used as a text colour, which is why
 * it isn't required to clear 4.5:1 above.
 */
const PAIRS = [["color-bg", "brand-300", "skip link"]];

console.log("\ntext on filled surfaces:\n");
for (const [fgName, bgName, label] of PAIRS) {
  const fg = token(fgName);
  const surface = token(bgName);
  const r = ratio(surface, fg);
  const verdict = r >= 7 ? "AAA" : r >= 4.5 ? "AA" : r >= 3 ? "large text only" : "FAIL";
  if (r < 4.5) failures += 1;
  console.log(
    `  ${label.padEnd(12)} ${fg} on ${surface}  ${r.toFixed(2).padStart(6)}:1  ${verdict}`
  );
}

if (failures > 0) {
  console.error(`\n${failures} check(s) failed`);
  process.exit(1);
}
