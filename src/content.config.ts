import { glob } from "astro/loaders";
import { defineCollection, z } from "astro:content";

/*
 * Both collections ship empty on purpose. The schemas and routes exist so real
 * case studies and real teammates can be dropped in as markdown without
 * touching any component; until then the pages fall through to their empty
 * states. See README.md for the frontmatter each entry expects.
 */

/*
 * `_`-prefixed files are NOT ignored by the glob loader the way they are under
 * src/pages — without the negation below, `_template.md` builds and publishes
 * itself as a real case study. The exclusion is what keeps it documentation.
 */
const TEMPLATES_EXCLUDED = ["**/*.md", "!**/_*.md"];

const projects = defineCollection({
  loader: glob({ base: "./src/content/projects", pattern: TEMPLATES_EXCLUDED }),
  schema: z.object({
    client: z.string().optional(),
    order: z.number().default(0),
    stack: z.array(z.string()).default([]),
    summary: z.string(),
    title: z.string(),
    year: z.number().optional()
  })
});

const team = defineCollection({
  loader: glob({ base: "./src/content/team", pattern: TEMPLATES_EXCLUDED }),
  schema: z.object({
    links: z.array(z.object({ href: z.string().url(), label: z.string() })).default([]),
    name: z.string(),
    order: z.number().default(0),
    role: z.string()
  })
});

export const collections = { projects, team };
