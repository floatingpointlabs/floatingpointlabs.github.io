# floatingpointlabs.github.io

Marketing landing page for [Floating Point Labs](https://floatingpointlabs.ca), built with [Astro](https://astro.build) and hosted on GitHub Pages.

## Development

```sh
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # output → dist/
pnpm preview  # serve dist/ locally
```

## Structure

```
public/          — static assets copied verbatim (favicon, CNAME, logos)
src/
  pages/         — routes (index, about, services, projects, contact, 404)
                   projects/[id].astro renders one page per case study
  layouts/       — BaseLayout.astro (html shell, fonts, global css)
  components/    — Hero, Nav, Footer, Wordmark, Ascii, SectionHeader,
                   BackgroundGrid, AsciiDrift, LogoImpact
  content/       — markdown collections (projects, team)
  data/          — services.ts (shared service + process copy)
  lib/           — ascii.ts (build-time character-art renderer)
  styles/        — global.css
content.config.ts
astro.config.mjs
```

## Character art

`renderMark()` in `src/lib/ascii.ts` rasterises the wave-and-dot mark into
characters at build time, with no dependencies: it measures each cell's coverage
against the mark's quadratic stroke and its dot, then maps that onto a density
ramp. The wave and the dot come back as separate layers on one shared grid, which
is what lets the hero draw the wave in while the dot drops onto it.

The geometry in `MARK` mirrors the SVG in `Nav.astro` — **edit the two together**,
or the character art and the SVG stop being the same logo.

Generating beats hand-authoring here for two reasons. A trace drifts: an earlier
hand-drawn mark kept the right silhouette and fill but flattened the S-curve into
a bent tube, which is obvious once it fills the viewport. And Prettier reformats
literal ASCII embedded in `.astro` markup, silently destroying the alignment.

Cell aspect matters. `CELL_ASPECT` is the Geist Mono advance (0.6em) over
`--ascii-line-height` in `global.css`; if either changes, the mark comes out
stretched until they agree again.

`renderField()` uses a seeded PRNG so decorative texture is identical on every
build. Swapping it for `Math.random()` would churn the diff on each `pnpm build`.

## Adding content

Both collections ship empty. Until the first entry is added, `pnpm build` prints
`The collection "projects" does not exist or is empty` — that message is expected
and does not indicate a misconfiguration. The pages render their empty states.

Each directory contains a `_template.md` showing the expected frontmatter.
Templates are excluded from the build via the glob pattern in `content.config.ts`;
note that `_`-prefixed files are **not** ignored automatically the way they are
under `src/pages`, so a template without that exclusion would publish itself as a
real page.

Add a case study at `src/content/projects/<slug>.md`:

```yaml
---
client: Client name # optional
order: 1 # ascending; controls listing order
stack: [TypeScript, Postgres] # optional
summary: One or two sentences, used on the index and as the page description.
title: Project title
year: 2026 # optional
---
```

Add a team member at `src/content/team/<slug>.md`:

```yaml
---
links: [{ href: "https://example.com", label: "Website" }] # optional
name: Full name
order: 1
role: Role or title
---
```

The markdown body becomes the case study text, or the person's bio.

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds with Astro and publishes via `actions/deploy-pages`. The custom apex domain `floatingpointlabs.ca` is preserved through `public/CNAME`.

**One-time setup:** in the repo's GitHub Pages settings, set **Source** to "GitHub Actions".
