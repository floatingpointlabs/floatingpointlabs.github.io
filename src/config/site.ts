/**
 * Site-wide constants.
 *
 * A collection would be overhead for a single record, and — decisively — a
 * collection can't be read synchronously from `astro.config.mjs`, where the
 * canonical URL is also needed. A plain module can.
 *
 * Only facts that are actually established live here. Anything unverified
 * (founding year, location, social handles, response time) is deliberately
 * absent rather than guessed: a consultancy site asserting a wrong detail is
 * worse than one that stays quiet.
 */

export interface NavLink {
  href: string;
  index: string;
  label: string;
}

export const SITE = {
  description:
    "Floating Point Labs is a small software studio building thoughtful, reliable software for teams that care about craft and clarity.",
  email: "hello@floatingpointlabs.ca",
  /** Used for structured data; the trading name is `name`. */
  legalName: "Floating Point Labs Inc.",
  /**
   * The square brand mark, for structured data. Distinct from `ogImage`:
   * schema.org expects a logo here, not a wide social banner.
   */
  logo: "/assets/logo-square-with-background.png",
  /** Appended as the title suffix on every page except the homepage. */
  name: "Floating Point Labs",
  nav: [
    { href: "/", index: "01", label: "Home" },
    { href: "/about", index: "02", label: "About" },
    { href: "/services", index: "03", label: "Services" },
    { href: "/projects", index: "04", label: "Projects" },
    { href: "/contact", index: "05", label: "Contact" }
  ] satisfies NavLink[],
  /**
   * 1200x630 social card, regenerated with `pnpm og` from scripts/generate-og.mjs.
   * Relative to the site root; resolved against `Astro.site` where needed.
   */
  ogImage: "/assets/og-default.png",
  ogImageAlt: "Floating Point Labs — thoughtful software, built with care.",
  url: "https://floatingpointlabs.ca"
} as const;

/** `mailto:` target, so no component has to rebuild the scheme by hand. */
export const MAILTO = `mailto:${SITE.email}`;
