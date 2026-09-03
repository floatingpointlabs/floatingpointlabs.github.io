import type { APIRoute } from "astro";

import { SITE } from "../config/site";

/*
 * Served as an endpoint rather than a static public/robots.txt so the host name
 * is written down once, in the site config, instead of a second time here.
 */
export const GET: APIRoute = () =>
  new Response(
    `User-agent: *
Allow: /

Sitemap: ${new URL("sitemap-index.xml", SITE.url).href}
`,
    { headers: { "Content-Type": "text/plain; charset=utf-8" } }
  );
