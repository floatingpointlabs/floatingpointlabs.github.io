/**
 * Build-time ASCII helpers for the Floating Point Labs identity.
 *
 * The hero mark is rasterised from the same geometry the SVG logo draws, rather
 * than hand-traced into a text file — a trace drifts from the logo (uneven
 * stroke, stairstepped edges) and, worse, can be authored on a grid whose
 * proportions don't survive monospace cells. Deriving it means the character
 * art and the SVG are two renderings of one shape.
 *
 * Everything here runs in Astro frontmatter, so the art ships as static HTML
 * with no client JS.
 */

/** Density ramp, lightest to heaviest. Used by the decorative texture. */
export const RAMP = " .:-=+*#%@";

export interface MarkLayers {
  /** The dot alone, on the shared grid. */
  dot: string[];
  /** Centre of the dot in grid cells, so the impact burst can find it. */
  dotCell: { col: number; row: number };
  /** Wave and dot together, for places that don't animate the two apart. */
  full: string[];
  /** The wave alone, on the shared grid. */
  wave: string[];
}

interface FieldOptions {
  cols: number;
  /** Fraction of cells that receive a glyph. */
  density?: number;
  ramp?: string;
  rows: number;
  seed?: number;
}

type Point = readonly [number, number];

/**
 * A monospace cell is taller than it is wide, so the horizontal and vertical
 * sampling steps have to differ or the mark comes out stretched. This is the
 * Geist Mono advance (0.6em) over `--ascii-line-height` in `global.css` — keep
 * the two in step.
 */
const CELL_ASPECT = 0.6 / 1.05;

/**
 * Geometry of the mark, mirrored from the SVG in `Nav.astro`:
 *
 *   <path d="M14 41q8.2-18.8 17.6-11.1t18 .3" stroke-width="8.8" />
 *   <circle cx="40.8" cy="22.2" r="5.1" />
 *
 * The `t` command reflects the previous control point, which is expanded here
 * into the explicit second quadratic. Edit these alongside the SVG.
 */
const MARK = {
  /** Quadratic segments as [start, control, end]. */
  curve: [
    [
      [14, 41],
      [22.2, 22.2],
      [31.6, 29.9]
    ],
    [
      [31.6, 29.9],
      [41, 37.6],
      [49.6, 30.2]
    ]
  ] as ReadonlyArray<readonly [Point, Point, Point]>,
  dot: { r: 5.1, x: 40.8, y: 22.2 },
  strokeWidth: 8.8
};

/**
 * Coverage ramp for the mark, deliberately shorter than `RAMP`. The faintest
 * characters turn a soft edge into scattered specks at hero scale, which reads
 * as dirt on the screen rather than as anti-aliasing.
 */
const MARK_RAMP = "+*#%";

/**
 * Rows across the mark's outer bound. The butt caps cut area away, so the art
 * crops to a little under this — currently 27 rows by 78 columns.
 */
const MARK_ROWS = 30;

/** Cells below this coverage stay blank. */
const MIN_COVERAGE = 0.15;

/** Polyline resolution for the stroke. Chord error at this density is < 0.01 units. */
const CURVE_SAMPLES = 160;

/** Supersamples per axis, per cell. */
const SUPERSAMPLE = 4;

/** A sparse scatter of glyphs, used as bounded decorative texture. */
export function renderField({
  cols,
  density = 0.14,
  ramp = RAMP,
  rows,
  seed = 1
}: FieldOptions): string[] {
  const random = seededRandom(seed);
  const lines: string[] = [];

  for (let row = 0; row < rows; row++) {
    let line = "";
    for (let col = 0; col < cols; col++) {
      // Bias toward the lighter half of the ramp so texture stays behind content.
      line += random() < density ? (ramp[1 + Math.floor(random() * 4)] ?? ".") : " ";
    }
    lines.push(line.trimEnd());
  }

  return lines;
}

/**
 * Rasterise the mark into character art, as two layers on one shared grid.
 *
 * The hero animates them separately — the wave draws itself in while the dot
 * drops onto it — so they are rendered independently and cropped to the *same*
 * bounding box. Stacking them reproduces the whole mark with no alignment work,
 * and because both come from the geometry there is no risk of the two layers
 * disagreeing about where the grid starts.
 */
export function renderMark(): MarkLayers {
  const half = MARK.strokeWidth / 2;
  const { dot } = MARK;

  // Flatten the path once; every coverage sample reuses it.
  const spine: Point[] = [];
  for (const [start, control, end] of MARK.curve) {
    for (let i = 0; i <= CURVE_SAMPLES; i++) {
      if (i === 0 && spine.length > 0) continue;
      spine.push(quadratic(start, control, end, i / CURVE_SAMPLES));
    }
  }

  /*
   * The SVG sets no `stroke-linecap`, so the ends are butt caps: flat and
   * perpendicular to the tangent. Distance to the spine alone would round them
   * off, so each end is clipped by the half-plane through its endpoint.
   */
  const [startPoint, startControl] = MARK.curve[0]!;
  const [, endControl, endPoint] = MARK.curve[MARK.curve.length - 1]!;
  const startTangent = direction(startPoint, startControl);
  const endTangent = direction(endControl, endPoint);

  const inWave = (x: number, y: number) => {
    if ((x - startPoint[0]) * startTangent[0] + (y - startPoint[1]) * startTangent[1] < 0) {
      return false;
    }
    if ((x - endPoint[0]) * endTangent[0] + (y - endPoint[1]) * endTangent[1] > 0) return false;
    return distanceToPolyline(x, y, spine) <= half;
  };
  const inDot = (x: number, y: number) => Math.hypot(x - dot.x, y - dot.y) <= dot.r;

  /*
   * Cell size comes from an outer bound on the art — the stroke can never stray
   * further than `half` from its spine, and the caps only ever cut area away.
   * The true extent is recovered by cropping afterwards. Since every cell is the
   * same size, cropping in whole cells keeps the proportions right however
   * generous this bound turns out to be.
   */
  const spineX = spine.map(([x]) => x);
  const spineY = spine.map(([, y]) => y);
  const top = Math.min(Math.min(...spineY) - half, dot.y - dot.r);
  const bottom = Math.max(Math.max(...spineY) + half, dot.y + dot.r);
  const left = Math.min(Math.min(...spineX) - half, dot.x - dot.r);
  const right = Math.max(Math.max(...spineX) + half, dot.x + dot.r);

  const cellHeight = (bottom - top) / MARK_ROWS;
  const cellWidth = cellHeight * CELL_ASPECT;
  const originX = left - cellWidth;
  const originY = top - cellHeight;
  const cols = Math.ceil((right - originX) / cellWidth) + 1;
  const rows = MARK_ROWS + 2;

  const coverage = (test: (x: number, y: number) => boolean) => {
    const grid: string[][] = [];
    for (let row = 0; row < rows; row++) {
      const line: string[] = [];
      for (let col = 0; col < cols; col++) {
        let hits = 0;
        for (let sy = 0; sy < SUPERSAMPLE; sy++) {
          for (let sx = 0; sx < SUPERSAMPLE; sx++) {
            const x = originX + (col + (sx + 0.5) / SUPERSAMPLE) * cellWidth;
            const y = originY + (row + (sy + 0.5) / SUPERSAMPLE) * cellHeight;
            if (test(x, y)) hits++;
          }
        }
        const fraction = hits / (SUPERSAMPLE * SUPERSAMPLE);
        line.push(fraction <= MIN_COVERAGE ? " " : rampChar(fraction));
      }
      grid.push(line);
    }
    return grid;
  };

  const waveGrid = coverage(inWave);
  const dotGrid = coverage(inDot);

  let maxCol = -1;
  let maxRow = -1;
  let minCol = cols;
  let minRow = rows;
  for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
      if (waveGrid[row]![col] === " " && dotGrid[row]![col] === " ") continue;
      if (row < minRow) minRow = row;
      if (row > maxRow) maxRow = row;
      if (col < minCol) minCol = col;
      if (col > maxCol) maxCol = col;
    }
  }

  const crop = (grid: string[][]) =>
    grid.slice(minRow, maxRow + 1).map((line) =>
      line
        .slice(minCol, maxCol + 1)
        .join("")
        .trimEnd()
    );

  const wave = crop(waveGrid);
  const dotLines = crop(dotGrid);

  return {
    dot: dotLines,
    dotCell: {
      col: (dot.x - originX) / cellWidth - minCol - 0.5,
      row: (dot.y - originY) / cellHeight - minRow - 0.5
    },
    full: wave.map((line, row) => {
      let merged = "";
      for (let col = 0; col <= maxCol - minCol; col++) {
        const glyph = line[col] ?? " ";
        merged += glyph === " " ? (dotLines[row]?.[col] ?? " ") : glyph;
      }
      return merged.trimEnd();
    }),
    wave
  };
}

/**
 * Deterministic xorshift32. Texture must be stable across builds, otherwise
 * every `pnpm build` rewrites the markup and churns the diff.
 */
export function seededRandom(seed: number): () => number {
  let state = seed >>> 0 || 1;
  return () => {
    state ^= state << 13;
    state >>>= 0;
    state ^= state >>> 17;
    state ^= state << 5;
    state >>>= 0;
    return state / 0x100000000;
  };
}

/** Unit vector from `from` to `to`. */
function direction(from: Point, to: Point): Point {
  const dx = to[0] - from[0];
  const dy = to[1] - from[1];
  const length = Math.hypot(dx, dy) || 1;
  return [dx / length, dy / length];
}

function distanceToPolyline(x: number, y: number, points: Point[]): number {
  let best = Infinity;
  for (let i = 0; i < points.length - 1; i++) {
    const [ax, ay] = points[i]!;
    const [bx, by] = points[i + 1]!;
    const dx = bx - ax;
    const dy = by - ay;
    const lengthSquared = dx * dx + dy * dy;
    const t = lengthSquared
      ? Math.min(1, Math.max(0, ((x - ax) * dx + (y - ay) * dy) / lengthSquared))
      : 0;
    const px = ax + t * dx - x;
    const py = ay + t * dy - y;
    const squared = px * px + py * py;
    if (squared < best) best = squared;
  }
  return Math.sqrt(best);
}

function quadratic(start: Point, control: Point, end: Point, t: number): Point {
  const u = 1 - t;
  return [
    u * u * start[0] + 2 * u * t * control[0] + t * t * end[0],
    u * u * start[1] + 2 * u * t * control[1] + t * t * end[1]
  ];
}

function rampChar(fraction: number): string {
  const scaled = ((fraction - MIN_COVERAGE) / (1 - MIN_COVERAGE)) * MARK_RAMP.length;
  return MARK_RAMP[Math.min(MARK_RAMP.length - 1, Math.floor(scaled))]!;
}
