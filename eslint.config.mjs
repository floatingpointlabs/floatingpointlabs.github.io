import js from "@eslint/js";
import prettier from "eslint-config-prettier";
import astro from "eslint-plugin-astro";
import perfectionist from "eslint-plugin-perfectionist";
import tseslint from "typescript-eslint";

export default [
  // `.claude/` holds git worktrees, whose generated `.astro/` type files would
  // otherwise be linted as if they were source in this checkout.
  { ignores: ["dist/", ".astro/", "node_modules/", ".claude/"] },
  js.configs.recommended,
  ...tseslint.configs.recommended,
  ...astro.configs.recommended,
  perfectionist.configs["recommended-natural"],
  prettier
];
