/**
 * Figures, programs and engagement structure cited across the site.
 *
 * Every number here traces to a primary government source in SOURCES. Nothing
 * in this file is our own estimate or projection — it is public policy data
 * plus the structural facts about our own engagements, kept in one place so no
 * component hardcodes a statistic it cannot cite and no dictionary can drift
 * from the other on what an engagement actually is.
 *
 * Display labels live in the i18n dictionaries, keyed by the ids below. That
 * keeps official English terminology out of the French pages, while the
 * structure itself stays defined exactly once.
 */

export interface Source {
  publisher: string;
  title: string;
  url: string;
}

export const SOURCES = {
  aiForAll: {
    publisher: "Innovation, Science and Economic Development Canada",
    title: "Canada's National Artificial Intelligence Strategy: AI for All",
    url: "https://ised-isde.canada.ca/site/ised/en/canadas-national-artificial-intelligence-strategy-ai-all"
  },
  blueprint: {
    publisher: "Innovation, Science and Economic Development Canada",
    title: "The SME AI adoption blueprint",
    url: "https://ised-isde.canada.ca/site/ised/en/sme-ai-adoption-blueprint"
  }
} satisfies Record<string, Source>;

export type SourceId = keyof typeof SOURCES;

/**
 * The adoption gap the national strategy sets out to close — the central
 * statistic on the site.
 */
export const ADOPTION_GAP = {
  currentPct: 12,
  sourceId: "aiForAll" as SourceId,
  targetPct: 60
} as const;

/**
 * The four-stage adoption ladder defined in the SME AI adoption blueprint.
 * Ids are stable; labels and descriptions are localized.
 */
export const STAGE_IDS = ["novice", "optimiser", "explorer", "transformer"] as const;

export type StageId = (typeof STAGE_IDS)[number];

/**
 * Which rung most Canadian SMEs occupy. An inference from ADOPTION_GAP — with
 * only 12% of businesses using AI at all, the great majority sit at or below
 * the first rung — so it lives beside the figure it is drawn from rather than
 * inside the component that renders it. Revisit whenever that figure changes.
 */
export const MOST_SMES_STAGE: StageId = "novice";

/**
 * Company-level barriers named in the blueprint. Each engagement declares the
 * barrier ids it answers, so the mapping is data rather than prose.
 */
export const BARRIER_IDS = [
  "literacy",
  "useCases",
  "resistance",
  "dataReadiness",
  "legacy"
] as const;

export type BarrierId = (typeof BARRIER_IDS)[number];

export const SERVICE_IDS = ["readiness", "pilot", "integrate", "enable"] as const;

export interface Service {
  barriers: BarrierId[];
  id: ServiceId;
  /** Movement along the national maturity ladder. Equal ids mean the
   *  engagement locates you on the ladder rather than moving you up it. */
  stageFrom: StageId;
  stageTo: StageId;
}

export type ServiceId = (typeof SERVICE_IDS)[number];

/**
 * Which barriers each engagement answers and where it sits on the ladder.
 * These are facts about the offering, not translations, so they are defined
 * once here instead of being retyped in every locale dictionary — where
 * nothing would have caught the two disagreeing.
 */
export const SERVICES: Service[] = [
  {
    barriers: ["useCases", "dataReadiness"],
    id: "readiness",
    stageFrom: "novice",
    stageTo: "novice"
  },
  { barriers: ["useCases", "resistance"], id: "pilot", stageFrom: "novice", stageTo: "optimiser" },
  {
    barriers: ["legacy", "dataReadiness"],
    id: "integrate",
    stageFrom: "optimiser",
    stageTo: "explorer"
  },
  {
    barriers: ["literacy", "resistance"],
    id: "enable",
    stageFrom: "explorer",
    stageTo: "transformer"
  }
];

export const PROGRAM_IDS = [
  "lift",
  "computeAccess",
  "regionalAi",
  "irap",
  "mitacs",
  "sred"
] as const;

export interface FundingProgram {
  /**
   * Headline figure in CAD as published, or `null` where the program has no
   * single confirmed figure — those are described generically rather than
   * quoted with a number we have not verified against SOURCES.
   */
  amountCad: null | number;
  id: ProgramId;
  /** Stated end year, where the figure is attached to one. */
  through: null | number;
}

export type ProgramId = (typeof PROGRAM_IDS)[number];

export const FUNDING_PROGRAMS: FundingProgram[] = [
  { amountCad: 500_000_000, id: "lift", through: null },
  { amountCad: 700_000_000, id: "computeAccess", through: 2031 },
  { amountCad: 500_000_000, id: "regionalAi", through: null },
  { amountCad: null, id: "irap", through: null },
  { amountCad: null, id: "mitacs", through: null },
  { amountCad: null, id: "sred", through: null }
];
