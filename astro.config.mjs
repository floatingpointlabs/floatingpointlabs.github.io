import sitemap from "@astrojs/sitemap";
import { defineConfig } from "astro/config";

import { DEFAULT_LOCALE, LOCALE_TAG, LOCALES, SITE } from "./src/config/site";

export default defineConfig({
  i18n: {
    defaultLocale: DEFAULT_LOCALE,
    locales: [...LOCALES],
    // English keeps the bare apex (`/services`); French is prefixed (`/fr/services`).
    routing: { prefixDefaultLocale: false }
  },
  integrations: [
    sitemap({
      // Emits <xhtml:link rel="alternate" hreflang="..."> for every page pair.
      i18n: { defaultLocale: DEFAULT_LOCALE, locales: LOCALE_TAG }
    })
  ],
  // Shared with robots.txt and the schema.org `url`, so the canonical host is
  // stated once rather than here and in src/config/site.ts separately.
  site: SITE.url
});
