export default {
  arrowParens: "always",
  bracketSameLine: true,
  bracketSpacing: true,
  htmlWhitespaceSensitivity: "ignore",
  overrides: [{ files: "*.astro", options: { parser: "astro" } }],
  plugins: ["prettier-plugin-astro"],
  printWidth: 100,
  semi: true,
  singleQuote: false,
  tabWidth: 2,
  trailingComma: "none",
  useTabs: false
};
