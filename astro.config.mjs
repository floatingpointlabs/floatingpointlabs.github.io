import sitemap from "@astrojs/sitemap";
import { defineConfig, fontProviders } from "astro/config";

import { SITE } from "./src/config/site.ts";

export default defineConfig({
  /*
   * Fonts are self-hosted through Astro's font pipeline rather than fetched
   * from the Google Fonts CDN. That removes two third-party origins, two
   * preconnects, and a render-blocking stylesheet from every page, and lets
   * the files be preloaded and fingerprinted like any other asset.
   *
   * Weights are exactly the ones the stylesheet uses — adding a weight here
   * that nothing sets is a download nobody reads.
   */
  fonts: [
    {
      cssVariable: "--font-geist-mono",
      fallbacks: ["ui-monospace", "SFMono-Regular", "Menlo", "Consolas", "monospace"],
      name: "Geist Mono",
      provider: fontProviders.google(),
      styles: ["normal"],
      subsets: ["latin"],
      weights: [400, 700]
    },
    {
      cssVariable: "--font-anek-telugu",
      fallbacks: ["sans-serif"],
      name: "Anek Telugu",
      provider: fontProviders.google(),
      styles: ["normal"],
      subsets: ["latin"],
      weights: [700]
    },
    {
      cssVariable: "--font-geist",
      fallbacks: ["system-ui", "sans-serif"],
      name: "Geist",
      provider: fontProviders.google(),
      styles: ["normal"],
      subsets: ["latin"],
      weights: [400, 700, 800]
    }
  ],
  /* 404 is excluded — it isn't a page anyone should reach from search. */
  integrations: [sitemap({ filter: (page) => !page.includes("/404") })],
  site: SITE.url
});
