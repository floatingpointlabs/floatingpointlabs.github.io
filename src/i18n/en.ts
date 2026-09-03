import type { Copy } from "./types";

export const en = {
  common: {
    langSwitchLabel: "Switch language",
    otherLangName: "Français",
    skipToContent: "Skip to content",
    sourceLabel: "Source"
  },
  contact: {
    email: {
      body: "Prefer plain email? Write to us directly and we'll reply from a real address.",
      label: "Email us"
    },
    form: {
      companyLabel: "Company",
      emailLabel: "Work email",
      formUnavailable:
        "The contact form isn't connected yet. Please email us directly — we read every message.",
      messageLabel: "What are you trying to do?",
      messagePlaceholder:
        "A sentence or two is plenty. What's the process, product, or bottleneck you have in mind?",
      nameLabel: "Name",
      optional: "optional",
      sizeLabel: "Company size",
      sizeOptions: ["1–9", "10–49", "50–99", "100–499", "500+"],
      stageLabel: "Where would you place yourself?",
      stageUnsure: "Not sure — that's what the assessment is for",
      submit: "Send"
    },
    lede: "Tell us a little about your business and we'll come back with an honest read on whether there's something worth doing. If there isn't, we'll say so — a short answer now is cheaper than a long project later.",
    title: "Let's find out where you actually are"
  },
  cta: {
    body: "A short call, no deck. We'll ask what you do, look at where AI would actually help, and tell you plainly whether it's worth starting now.",
    label: "Book an AI readiness call",
    title: "Not sure whether you're ready?"
  },
  footer: {
    rights: "All rights reserved.",
    sourcesNote:
      "Adoption figures and program details are drawn from published Government of Canada sources, linked throughout."
  },
  home: {
    adoptionGap: {
      caption: "Canada's national AI strategy, published 4 June 2026.",
      currentLabel: "of Canadian businesses use AI today",
      srDescription:
        "Bar chart comparing current and target AI adoption among Canadian businesses: 12 percent today, against a national target of 60 percent by 2034.",
      targetLabel: "the national target for 2034",
      title: "The gap Canada is trying to close"
    },
    hero: {
      ctaSecondary: "See how we work",
      eyebrow: "Canada's national AI strategy",
      lede: "Ottawa wants 60% of Canadian businesses using AI by 2034. Today it's 12%. We take small and mid-sized companies from AI-curious to AI-operational — one measured step at a time.",
      title: "AI adoption for",
      titleAccent: "Canadian SMEs"
    },
    ladder: {
      eyebrow: "The path",
      lede: "Canada's SME AI Adoption Blueprint sorts businesses into four levels of maturity. Knowing which one you're in is what turns “we should do something with AI” into a decision you can actually fund.",
      mostSmes: "Most Canadian SMEs are here",
      title: "Four stages, defined by Ottawa — not by us"
    },
    servicesTeaser: {
      eyebrow: "What we do",
      lede: "Four engagements, each built to move you one rung up the ladder and each aimed at a barrier the federal blueprint names by name.",
      link: "See all services",
      title: "Meet you where you are"
    }
  },
  meta: {
    contact: {
      description:
        "Talk to Floating Point Labs about AI adoption for your business. Book a readiness call or email us directly.",
      title: "Contact"
    },
    home: {
      description:
        "Floating Point Labs is a Canadian AI consultancy helping small and mid-sized businesses adopt AI — from readiness assessment through pilot, integration, and in-house capability.",
      title: "AI adoption for Canadian SMEs"
    },
    services: {
      description:
        "AI readiness assessments, pilots, systems integration, and team enablement for Canadian SMEs — plus help identifying the federal funding programs you may qualify for.",
      title: "Services"
    }
  },
  nav: {
    contact: "Contact",
    home: "Home",
    services: "Services"
  },
  notFound: {
    body: "That page doesn't exist — or it moved. The floating point landed somewhere else.",
    link: "Back to home",
    title: "Page not found"
  },
  services: {
    barriers: {
      dataReadiness: "Data readiness",
      legacy: "Legacy systems",
      literacy: "AI literacy",
      resistance: "Change resistance",
      useCases: "Use cases & ROI"
    },
    barriersNote:
      "Tags mark the adoption barriers each engagement is built to answer, as named in Canada's SME AI Adoption Blueprint.",
    funding: {
      body: "The national strategy came with money attached, and a large share of it is aimed squarely at companies your size. Most SMEs we meet don't know which programs they qualify for. We help you work that out and support the application.",
      disclaimer:
        "We are not a government agency and have no role in funding decisions. We help you identify and apply for programs — we can't promise an outcome.",
      programs: {
        computeAccess: {
          body: "Subsidized access to AI compute for businesses that would otherwise be priced out of running serious workloads.",
          label: "Compute Access Fund"
        },
        irap: {
          body: "The National Research Council's long-running program for SMEs, offering non-repayable contributions and advisory support for innovation projects.",
          label: "NRC IRAP"
        },
        lift: {
          body: "A Business Development Bank of Canada initiative helping SMEs finance the integration of AI into their operations. Financing paired with advisory services, not a grant.",
          label: "LIFT"
        },
        mitacs: {
          body: "Research partnerships that place academic talent inside your business, with a 2026 call themed on accelerating AI adoption by SMEs.",
          label: "Mitacs"
        },
        regionalAi: {
          body: "Delivered through the regional development agencies, so what's available depends on where you operate.",
          label: "Regional AI Initiative"
        },
        sred: {
          body: "Canada's standing tax incentive for experimental development — often the most straightforward way to recover the cost of a first technical project.",
          label: "SR&ED tax credits"
        }
      },
      title: "Funding you may already qualify for"
    },
    intro: {
      eyebrow: "Services",
      lede: "We don't sell a transformation programme. We sell the next step — scoped small enough that you can judge whether it worked, and honest enough that you'll know if it didn't.",
      title: "Engagements built around your stage"
    },
    items: {
      enable: {
        body: "Training your people, setting the rules, and handing over ownership. The measure of success is that you stop needing us.",
        deliverables: [
          "Role-specific AI literacy training",
          "Usage, privacy, and procurement guidelines",
          "An internal review process for new AI work",
          "Capability transfer to a named owner on your team"
        ],
        label: "Enablement & Governance"
      },
      integrate: {
        body: "Moving AI out of the pilot and into the systems your business actually runs on — including the ones written long before anyone said “machine learning”.",
        deliverables: [
          "Integration with your existing and legacy systems",
          "Data pipelines built to survive staff turnover",
          "Monitoring, evaluation, and cost controls",
          "Runbooks your team can operate without us"
        ],
        label: "Integration & Scale"
      },
      pilot: {
        body: "One use case, built and put in front of real users on a fixed timeline. Small enough to fund without a business case, real enough to settle the internal argument about whether this works.",
        deliverables: [
          "A working system in production use, not a demo",
          "Measured baseline and result",
          "A go / no-go recommendation we're willing to argue either way",
          "Documented handover"
        ],
        label: "Pilot & Proof of Value"
      },
      readiness: {
        body: "A structured look at where you actually sit — your data, your systems, and your team. You leave with a shortlist of use cases ranked by likely return and effort, and an honest view of which ones aren't worth it yet.",
        deliverables: [
          "Your placement on the national maturity ladder",
          "Data and systems readiness review",
          "Ranked use-case shortlist with effort and return estimates",
          "A costed plan for the first project"
        ],
        label: "AI Readiness Assessment"
      }
    },
    movesYouFrom: "Moves you from",
    startsAt: "For businesses at"
  },
  stages: {
    explorer: {
      body: "Customized or sector-specific applications, usually still at limited scale.",
      label: "Explorer"
    },
    novice: {
      body: "Experimenting with off-the-shelf tools on isolated tasks. AI is a side project, not part of how the work gets done.",
      label: "Novice"
    },
    optimiser: {
      body: "Systematic use across several workstreams, chosen to cut time and cost.",
      label: "Optimiser"
    },
    transformer: {
      body: "AI embedded across most operations, on unified infrastructure, with the expertise held in-house.",
      label: "Transformer"
    }
  }
} satisfies Copy;
