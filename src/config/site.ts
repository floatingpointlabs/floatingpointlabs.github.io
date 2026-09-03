/**
 * Site-wide constants.
 *
 * Only confirmed facts live here. Anything unverified — founding year, city,
 * phone, social handles, team — is deliberately absent rather than guessed: a
 * consultancy site asserting a wrong detail about itself is worse than one
 * that stays quiet.
 *
 * Imported by `astro.config.mjs` as well as by components, so it must not
 * import from `astro:*` virtual modules.
 */

export const LOCALES = ["en", "fr"] as const;

export type Locale = (typeof LOCALES)[number];

export const DEFAULT_LOCALE: Locale = "en";

/**
 * Every locale-derived value on the site resolves through here.
 *
 * Previously the BCP 47 tag was re-derived by inline ternary in five files, so
 * a third locale would have kept compiling while quietly emitting English in
 * `<html lang>`, `og:locale`, hreflang and currency formatting. One entry now
 * covers all of them.
 */
export const LOCALE_TAG: Record<Locale, string> = {
  en: "en-CA",
  fr: "fr-CA"
};

/** Path segment for each nav entry; labels come from the i18n dictionaries. */
export interface NavItem {
  key: "contact" | "home" | "services";
  path: string;
}

/** Open Graph wants the underscore form of the same tag. */
export function ogLocale(locale: Locale): string {
  return LOCALE_TAG[locale].replace("-", "_");
}

export const NAV: NavItem[] = [
  { key: "home", path: "" },
  { key: "services", path: "services" },
  { key: "contact", path: "contact" }
];

export const SITE = {
  email: "hello@floatingpointlabs.ca",
  /**
   * ACTION REQUIRED: set this to a real Formspree form id (or swap the action
   * for a Tally endpoint). While it is empty the form renders disabled with
   * the mailto fallback promoted — it never silently pretends to submit.
   * See ContactForm.astro.
   */
  formEndpoint: "",
  legalName: "Floating Point Labs Inc.",
  /** Square mark, for the schema.org `logo` field. */
  logo: "/assets/logo-square-with-background.png",
  name: "Floating Point Labs",
  /**
   * TODO: replace with a purpose-built 1200x630 card. This is currently the
   * 1600x1600 square mark — wrong aspect for a social card, and large enough
   * that some unfurlers will skip it.
   */
  ogImage: "/assets/logo-square-with-background.png",
  url: "https://floatingpointlabs.ca"
} as const;

export const MAILTO = `mailto:${SITE.email}`;
