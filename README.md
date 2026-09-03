# floatingpointlabs.github.io

Marketing landing page for [Floating Point Labs](https://floatingpointlabs.ca), built with [Astro](https://astro.build) and hosted on GitHub Pages.

## Development

```sh
pnpm install
pnpm dev        # http://localhost:4321
pnpm build      # output → dist/
pnpm preview    # serve dist/ locally

pnpm check      # eslint + prettier
pnpm fix        # eslint --fix + prettier --write
pnpm typecheck  # astro sync && astro check — covers .astro files
pnpm og         # regenerate the social card
```

`pnpm typecheck` needs TypeScript 6.x. TypeScript 7's native compiler does not
yet expose the programmatic API `astro check` builds on, so the dependency is
deliberately pinned below 7 — see withastro/roadmap#1321.

## Structure

```
public/          — static assets copied verbatim (favicon, CNAME, logos, og card)
scripts/         — generate-og.mjs (build-time social card)
src/
  pages/         — routes (index, about, services, projects, contact, 404)
                   projects/[id].astro renders one page per case study
                   robots.txt.ts serves robots.txt from the site config
  layouts/       — BaseLayout.astro (html shell, meta, JSON-LD, fonts)
  components/    — Hero, Nav, Footer, Wordmark, Ascii, SectionHeader,
                   BackgroundGrid, AsciiDrift, LogoImpact
  config/        — site.ts (name, email, url, nav — the only place they appear)
  content/       — markdown collections (projects, team)
  data/          — services.ts (shared service + process copy)
  lib/           — ascii.ts (character-art renderer), theme.ts (token reader)
  styles/        — global.css
content.config.ts
astro.config.mjs
```

## Design tokens

Every colour in the site is defined once, in the `:root` block of
`src/styles/global.css`. The brand ramp (`--brand-*`, `--violet-*`) holds the
only raw hex values in the codebase; everything else refers to those through
semantic tokens, and translucency uses `color-mix()` rather than restating a
colour with an alpha.

**A hex literal or `rgba()` anywhere outside that block is a bug.** The palette
previously existed as raw hex in five files — including two near-identical
JavaScript arrays — and drifted. Client-side code that needs a colour reads it
back out of the token layer via `src/lib/theme.ts`, and the logo's SVG gradient
stops reference the same custom properties.

Fonts are self-hosted through Astro's font pipeline (the `fonts` block in
`astro.config.mjs`) rather than fetched from the Google Fonts CDN, so no page
makes a third-party request. Adding a weight there that no rule uses is a
download nobody reads.

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

Pull requests run `.github/workflows/ci.yml` — lint, format, typecheck, build.

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds with Astro and publishes via `actions/deploy-pages`. The custom apex domain `floatingpointlabs.ca` is preserved through `public/CNAME`.

Note that the build downloads font files from the Google Fonts API and caches
them under `.astro/`, so a cold CI build needs network access.

**One-time setup:** in the repo's GitHub Pages settings, set **Source** to "GitHub Actions".
