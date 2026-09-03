import type { NavItem } from "../config/site";
import type { BarrierId, ProgramId, ServiceId, StageId } from "../data/strategy";

/**
 * The shape every locale must satisfy.
 *
 * `en.ts` and `fr.ts` are both declared `satisfies Copy`, so a string that is
 * added to one locale and forgotten in the other fails the build instead of
 * silently rendering English on a French page.
 *
 * Only translatable text lives here. Which barriers a service answers and
 * where it sits on the maturity ladder are facts about the offering, not
 * translations — those are in `data/strategy.ts`, keyed by the same ids.
 */

export interface Copy {
  common: {
    langSwitchLabel: string;
    otherLangName: string;
    skipToContent: string;
    sourceLabel: string;
  };
  contact: {
    email: { body: string; label: string };
    form: {
      companyLabel: string;
      emailLabel: string;
      formUnavailable: string;
      messageLabel: string;
      messagePlaceholder: string;
      nameLabel: string;
      optional: string;
      sizeLabel: string;
      sizeOptions: string[];
      stageLabel: string;
      stageUnsure: string;
      submit: string;
    };
    lede: string;
    title: string;
  };
  /** Shared by the closing band on every page and by the hero's primary action. */
  cta: { body: string; label: string; title: string };
  footer: {
    rights: string;
    sourcesNote: string;
  };
  home: {
    adoptionGap: {
      caption: string;
      currentLabel: string;
      /** Text equivalent of the bar visual, for screen readers. */
      srDescription: string;
      targetLabel: string;
      title: string;
    };
    hero: {
      ctaSecondary: string;
      eyebrow: string;
      lede: string;
      title: string;
      /** Rendered with the brand gradient, echoing "Labs" in the wordmark. */
      titleAccent: string;
    };
    ladder: { eyebrow: string; lede: string; mostSmes: string; title: string };
    servicesTeaser: { eyebrow: string; lede: string; link: string; title: string };
  };
  meta: Record<NavItem["key"], PageMeta>;
  nav: Record<NavItem["key"], string>;
  notFound: { body: string; link: string; title: string };
  services: {
    barriers: Record<BarrierId, string>;
    barriersNote: string;
    funding: {
      body: string;
      disclaimer: string;
      programs: Record<ProgramId, FundingCopy>;
      title: string;
    };
    intro: { eyebrow: string; lede: string; title: string };
    items: Record<ServiceId, ServiceCopy>;
    movesYouFrom: string;
    /** Used where an engagement locates you rather than moving you a rung. */
    startsAt: string;
  };
  stages: Record<StageId, StageCopy>;
}

export interface FundingCopy {
  body: string;
  label: string;
}

export interface PageMeta {
  description: string;
  title: string;
}

export interface ServiceCopy {
  body: string;
  deliverables: string[];
  label: string;
}

export interface StageCopy {
  body: string;
  label: string;
}
