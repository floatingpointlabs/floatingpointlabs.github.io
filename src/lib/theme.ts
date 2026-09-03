/**
 * Client-side readers for the design tokens in `global.css`.
 *
 * The canvas effects need the brand ramp and the mono stack as JS strings.
 * Re-typing them in each component is exactly how the palette drifted before —
 * the same six purples existed as near-identical arrays in two files and as raw
 * hex in the stylesheet. They are read back out of the token layer instead, so
 * the `:root` block stays the only place a color is written down.
 */

/** Brand ramp, in the order the burst and drift effects expect. */
const PALETTE_TOKENS = [
  "--violet-500",
  "--brand-500",
  "--violet-400",
  "--brand-300",
  "--violet-600",
  "--brand-400"
] as const;

/** Last-resort stack, used only if the token layer failed to load. */
const MONO_FALLBACK = "ui-monospace, SFMono-Regular, Menlo, monospace";

/*
 * The one place a literal colour is allowed outside the token layer: it applies
 * only when the token layer itself is unreadable, so it cannot refer to one.
 * `currentColor` would not do — these values are assigned to `ctx.fillStyle`,
 * which rejects it and silently keeps the previous (black) value.
 */
const COLOR_FALLBACK = "#a78bfa";

export function readMonoStack(): string {
  return readToken("--font-mono", MONO_FALLBACK);
}

/**
 * Never returns an empty array — callers index into it with `% length`, which
 * would produce `undefined` and paint nothing if the tokens ever went missing.
 */
export function readPalette(): string[] {
  const colors = PALETTE_TOKENS.map((token) => readToken(token)).filter(Boolean);
  return colors.length > 0 ? colors : [COLOR_FALLBACK];
}

export function readToken(name: string, fallback = ""): string {
  const value = getComputedStyle(document.documentElement).getPropertyValue(name);
  return value.trim() || fallback;
}
