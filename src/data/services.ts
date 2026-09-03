/**
 * Single source of truth for the service list.
 *
 * `index.astro` and `services.astro` previously carried their own hand-copied
 * versions of this, which drifted. Both now read from here.
 */

export interface Service {
  body: string;
  focus: string[];
  index: string;
  title: string;
}

export const services: Service[] = [
  {
    body: "Full-stack development for web and backend systems, from prototype to production.",
    focus: ["Web", "Backend", "APIs"],
    index: "01",
    title: "Product engineering"
  },
  {
    body: "Scoping, architecture reviews, and planning engagements for teams navigating uncertainty.",
    focus: ["Scoping", "Architecture", "Planning"],
    index: "02",
    title: "Technical discovery"
  },
  {
    body: "Embedded senior engineers to accelerate delivery and level up in-house practices.",
    focus: ["Embedded", "Delivery", "Mentoring"],
    index: "03",
    title: "Team augmentation"
  }
];

export interface ProcessStep {
  body: string;
  index: string;
  title: string;
}

/*
 * TODO: confirm or replace with the studio's actual process.
 *
 * Every step below is paraphrased from copy already published on the site
 * (the services list, and About's "small teams, tight feedback loops, and a
 * bias toward shipping" / "simple designs that can evolve"). Nothing here is
 * invented, but nothing here has been confirmed as the real process either.
 */
export const processSteps: ProcessStep[] = [
  {
    body: "We start by scoping the work — reviewing the architecture, mapping constraints, and agreeing on what success looks like before anyone writes code.",
    index: "01",
    title: "Discovery"
  },
  {
    body: "Small teams and tight feedback loops. We work in short cycles so direction can change while changing it is still cheap.",
    index: "02",
    title: "Build"
  },
  {
    body: "A bias toward shipping. Work reaches real users early and often, and what we learn there feeds the next cycle.",
    index: "03",
    title: "Ship"
  },
  {
    body: "We prefer simple designs that can evolve over complex abstractions that can't — so what we hand over stays understandable and maintainable by your team.",
    index: "04",
    title: "Evolve"
  }
];
