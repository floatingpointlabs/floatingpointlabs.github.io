/**
 * Generates the 1200x630 Open Graph card at public/assets/og-default.png.
 *
 * Run with `pnpm og`. This is deliberately a build-time script rather than a
 * per-route generator: five marketing pages share one card, and generating
 * per-page images would add a ~10MB wasm rasterizer to every CI build for very
 * little gain. Revisit that trade when case studies exist and a card carrying
 * the client and headline metric becomes worth the cost.
 *
 * Colors are parsed out of the stylesheet rather than restated here, so the
 * card cannot drift from the token layer the site actually renders with.
 */

import { readFile, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = resolve(root, "public/assets/og-default.png");
const WIDTH = 1200;
const HEIGHT = 630;

/** Pull a custom property's value straight from the token layer. */
function token(css, name) {
  const match = css.match(new RegExp(`--${name}:\\s*(#[0-9a-fA-F]{3,8})`));
  if (!match) throw new Error(`token --${name} not found in global.css`);
  return match[1];
}

const css = await readFile(resolve(root, "src/styles/global.css"), "utf8");
const bg = token(css, "color-bg");
const fg = token(css, "color-fg");
const muted = token(css, "color-muted");
const accent1 = token(css, "brand-500");
const accent2 = token(css, "violet-400");
const dotFrom = token(css, "brand-350");
const dotTo = token(css, "violet-600");

/*
 * The character grid that backs the page, reproduced as discrete cells so the
 * card reads as the same surface as the site rather than a generic dark panel.
 */
const CELL = 24;
let grid = "";
for (let y = CELL; y < HEIGHT; y += CELL) {
  for (let x = CELL; x < WIDTH; x += CELL) {
    grid += `<rect x="${x}" y="${y}" width="1" height="1" fill="${accent1}" opacity="0.14"/>`;
  }
}

/* Same geometry the site's SVG mark draws, scaled from its 64x64 viewBox. */
const MARK_SCALE = 1.9;
const mark = `
  <g transform="translate(96, 158) scale(${MARK_SCALE})">
    <path d="M14 41q8.2-18.8 17.6-11.1t18 .3" fill="none" stroke="url(#wave)"
          stroke-linejoin="round" stroke-width="8.8"/>
    <circle cx="40.8" cy="22.2" r="5.1" fill="url(#dot)"/>
  </g>`;

const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${WIDTH}" height="${HEIGHT}">
  <defs>
    <linearGradient id="wave" x1="0%" x2="100%" y1="0%" y2="0%">
      <stop offset="0%" stop-color="${accent1}"/>
      <stop offset="100%" stop-color="${accent2}"/>
    </linearGradient>
    <radialGradient id="dot" cx="38%" cy="32%" r="65%">
      <stop offset="0%" stop-color="${dotFrom}"/>
      <stop offset="100%" stop-color="${dotTo}"/>
    </radialGradient>
  </defs>

  <rect width="${WIDTH}" height="${HEIGHT}" fill="${bg}"/>
  ${grid}
  ${mark}

  <text x="96" y="366" font-family="monospace" font-size="72" font-weight="700" fill="${fg}">
    Floating Point <tspan fill="${accent2}">Labs</tspan>
  </text>

  <text x="96" y="428" font-family="monospace" font-size="30" fill="${muted}">
    Thoughtful software, built with care.
  </text>

  <rect x="96" y="486" width="112" height="3" fill="${accent1}"/>

  <text x="96" y="546" font-family="monospace" font-size="26" fill="${muted}">
    floatingpointlabs.ca
  </text>
</svg>`;

const png = await sharp(Buffer.from(svg)).png({ compressionLevel: 9 }).toBuffer();
await writeFile(OUT, png);

const { height, width } = await sharp(png).metadata();
console.log(`wrote public/assets/og-default.png — ${width}x${height}, ${png.length} bytes`);
