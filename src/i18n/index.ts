import { getRelativeLocaleUrl } from "astro:i18n";

import type { Copy } from "./types";

import { type Locale, LOCALES } from "../config/site";
import { en } from "./en";
import { fr } from "./fr";

const DICTIONARIES: Record<Locale, Copy> = { en, fr };

export function getCopy(locale: Locale): Copy {
  return DICTIONARIES[locale];
}

/** True when `path` is the route currently being rendered. */
export function isCurrentPath(pathname: string, path: string): boolean {
  return stripLocale(pathname) === path;
}

export function isLocale(value: string | undefined): value is Locale {
  return value !== undefined && (LOCALES as readonly string[]).includes(value);
}

export function otherLocale(locale: Locale): Locale {
  return locale === "en" ? "fr" : "en";
}

/** Always build links through this so locale prefixes are never hand-written. */
export function pathFor(locale: Locale, path: string): string {
  return getRelativeLocaleUrl(locale, path);
}

/**
 * Strip any locale prefix from a pathname, leaving the bare route.
 * `/fr/services/` and `/services/` both become `services`.
 */
export function stripLocale(pathname: string): string {
  const segments = pathname.split("/").filter(Boolean);
  if (isLocale(segments[0])) segments.shift();
  return segments.join("/");
}
