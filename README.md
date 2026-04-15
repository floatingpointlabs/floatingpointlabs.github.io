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
  pages/         — routes (index.astro)
  layouts/       — BaseLayout.astro (html shell, fonts, global css)
  components/    — Logo, Hero, Footer, BackgroundGrid, GlowDots, LogoImpact
  styles/        — global.css
astro.config.mjs
```

## Deployment

Pushes to `main` trigger `.github/workflows/deploy.yml`, which builds with Astro and publishes via `actions/deploy-pages`. The custom apex domain `floatingpointlabs.ca` is preserved through `public/CNAME`.

**One-time setup:** in the repo's GitHub Pages settings, set **Source** to "GitHub Actions".
