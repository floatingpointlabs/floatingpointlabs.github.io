import type { Copy } from "./types";

/**
 * French copy.
 *
 * Typography follows French convention: a non-breaking space precedes `%`,
 * `:`, `?` and `!`. Where that space must not break it is written as the
 * escape U+00A0 rather than a literal character, which eslint rejects.
 *
 * NOTE FOR REVIEW: this translation has not yet been read by a native
 * francophone. Have one review it before launch — weak French reads as a
 * negative signal to exactly the buyers this positioning targets.
 */

export const fr = {
  common: {
    langSwitchLabel: "Changer de langue",
    otherLangName: "English",
    skipToContent: "Aller au contenu",
    sourceLabel: "Source"
  },
  contact: {
    email: {
      body: "Vous préférez le courriel ? Écrivez-nous directement, une vraie personne vous répondra.",
      label: "Nous écrire"
    },
    form: {
      companyLabel: "Entreprise",
      emailLabel: "Courriel professionnel",
      formUnavailable:
        "Le formulaire n’est pas encore connecté. Écrivez-nous directement — nous lisons chaque message.",
      messageLabel: "Qu’essayez-vous d’accomplir ?",
      messagePlaceholder:
        "Une phrase ou deux suffisent. Quel processus, produit ou goulot d’étranglement avez-vous en tête ?",
      nameLabel: "Nom",
      optional: "facultatif",
      sizeLabel: "Taille de l’entreprise",
      sizeOptions: ["1–9", "10–49", "50–99", "100–499", "500+"],
      stageLabel: "Où vous situez-vous ?",
      stageUnsure: "Je ne sais pas — c’est justement l’objet du diagnostic",
      submit: "Envoyer"
    },
    lede: "Parlez-nous brièvement de votre entreprise et nous vous reviendrons avec un avis franc : y a-t-il quelque chose qui vaut la peine d’être entrepris ? Si la réponse est non, nous le dirons — une réponse courte aujourd’hui coûte moins cher qu’un long projet plus tard.",
    title: "Voyons où vous en êtes réellement"
  },
  cta: {
    body: "Un appel court, sans présentation. Nous vous demandons ce que vous faites, nous regardons où l’IA aiderait réellement, et nous vous disons franchement s’il vaut la peine de commencer maintenant.",
    label: "Réserver un appel de diagnostic",
    title: "Vous ne savez pas si vous êtes prêt ?"
  },
  footer: {
    rights: "Tous droits réservés.",
    sourcesNote:
      "Les données d’adoption et les détails des programmes proviennent de sources publiées par le gouvernement du Canada, référencées tout au long du site."
  },
  home: {
    adoptionGap: {
      caption:
        "Stratégie nationale sur l’intelligence artificielle du Canada, publiée le 4 juin 2026.",
      currentLabel: "des entreprises canadiennes utilisent l’IA aujourd’hui",
      srDescription:
        "Diagramme à barres comparant l’adoption actuelle et cible de l’IA par les entreprises canadiennes : 12 pour cent aujourd’hui, contre une cible nationale de 60 pour cent d’ici 2034.",
      targetLabel: "la cible nationale pour 2034",
      title: "L’écart que le Canada cherche à combler"
    },
    hero: {
      ctaSecondary: "Voir notre approche",
      eyebrow: "Stratégie nationale sur l’IA du Canada",
      lede: "Ottawa vise 60 % des entreprises canadiennes utilisant l’IA d’ici 2034. Aujourd’hui, c’est 12 %. Nous accompagnons les petites et moyennes entreprises, de la curiosité à l’exploitation concrète — une étape mesurable à la fois.",
      title: "L’adoption de l’IA pour les",
      titleAccent: "PME canadiennes"
    },
    ladder: {
      eyebrow: "Le parcours",
      lede: "Le plan d’adoption de l’IA par les PME du Canada répartit les entreprises en quatre niveaux de maturité. Savoir où vous vous situez, c’est ce qui transforme « il faudrait faire quelque chose avec l’IA » en une décision que vous pouvez réellement financer.",
      mostSmes: "La plupart des PME canadiennes sont ici",
      title: "Quatre étapes, définies par Ottawa — pas par nous"
    },
    servicesTeaser: {
      eyebrow: "Ce que nous faisons",
      lede: "Quatre mandats, chacun conçu pour vous faire gravir un échelon et chacun visant un obstacle que le plan fédéral nomme explicitement.",
      link: "Voir tous les services",
      title: "Nous vous rejoignons là où vous êtes"
    }
  },
  meta: {
    contact: {
      description:
        "Parlez à Floating Point Labs de l’adoption de l’IA dans votre entreprise. Réservez un appel de diagnostic ou écrivez-nous directement.",
      title: "Contact"
    },
    home: {
      description:
        "Floating Point Labs est une firme-conseil canadienne en IA qui aide les petites et moyennes entreprises à adopter l’intelligence artificielle : diagnostic, projet pilote, intégration et autonomie interne.",
      title: "L’adoption de l’IA pour les PME canadiennes"
    },
    services: {
      description:
        "Diagnostics de maturité en IA, projets pilotes, intégration de systèmes et habilitation des équipes pour les PME canadiennes — et de l’aide pour repérer les programmes de financement fédéraux auxquels vous pourriez être admissible.",
      title: "Services"
    }
  },
  nav: {
    contact: "Contact",
    home: "Accueil",
    services: "Services"
  },
  notFound: {
    body: "Cette page n’existe pas — ou elle a été déplacée. Le point flottant a atterri ailleurs.",
    link: "Retour à l’accueil",
    title: "Page introuvable"
  },
  services: {
    barriers: {
      dataReadiness: "Préparation des données",
      legacy: "Systèmes hérités",
      literacy: "Littératie en IA",
      resistance: "Résistance au changement",
      useCases: "Cas d’usage et rendement"
    },
    barriersNote:
      "Les étiquettes indiquent les obstacles à l’adoption que chaque mandat vise, tels que nommés dans le plan d’adoption de l’IA par les PME du Canada.",
    funding: {
      body: "La stratégie nationale s’accompagne de fonds, dont une bonne part vise précisément les entreprises de votre taille. La plupart des PME que nous rencontrons ignorent à quels programmes elles sont admissibles. Nous vous aidons à le déterminer et à monter la demande.",
      disclaimer:
        "Nous ne sommes pas un organisme gouvernemental et n’avons aucun rôle dans les décisions de financement. Nous vous aidons à repérer les programmes et à présenter une demande — nous ne pouvons garantir aucun résultat.",
      programs: {
        computeAccess: {
          body: "Accès subventionné à la puissance de calcul pour les entreprises qui, autrement, ne pourraient pas se permettre des charges de travail sérieuses.",
          label: "Fonds d’accès à la puissance de calcul"
        },
        irap: {
          body: "Le programme de longue date du Conseil national de recherches destiné aux PME : contributions non remboursables et accompagnement-conseil pour les projets d’innovation.",
          label: "PARI CNRC"
        },
        lift: {
          body: "Une initiative de la Banque de développement du Canada aidant les PME à financer l’intégration de l’IA dans leurs activités. Du financement assorti de services-conseils, et non une subvention.",
          label: "LIFT"
        },
        mitacs: {
          body: "Des partenariats de recherche qui placent des talents universitaires au sein de votre entreprise, avec un appel de 2026 portant sur l’accélération de l’adoption de l’IA par les PME.",
          label: "Mitacs"
        },
        regionalAi: {
          body: "Livrée par les agences de développement régional : l’offre dépend donc de l’endroit où vous exercez vos activités.",
          label: "Initiative régionale en IA"
        },
        sred: {
          body: "L’incitatif fiscal permanent du Canada pour le développement expérimental — souvent le moyen le plus simple de récupérer le coût d’un premier projet technique.",
          label: "Crédits d’impôt RS&DE"
        }
      },
      title: "Du financement auquel vous êtes peut-être déjà admissible"
    },
    intro: {
      eyebrow: "Services",
      lede: "Nous ne vendons pas un programme de transformation. Nous vendons la prochaine étape : assez circonscrite pour que vous puissiez juger si elle a fonctionné, et assez honnête pour que vous le sachiez si ce n’est pas le cas.",
      title: "Des mandats adaptés à votre étape"
    },
    items: {
      enable: {
        body: "Former vos gens, établir les règles et transférer la propriété. La mesure du succès, c’est que vous n’ayez plus besoin de nous.",
        deliverables: [
          "Formation en littératie IA adaptée à chaque rôle",
          "Lignes directrices d’utilisation, de confidentialité et d’approvisionnement",
          "Un processus de révision interne pour les nouveaux travaux en IA",
          "Transfert de compétences à un responsable désigné de votre équipe"
        ],
        label: "Habilitation et gouvernance"
      },
      integrate: {
        body: "Faire sortir l’IA du projet pilote pour l’intégrer aux systèmes qui font réellement tourner votre entreprise — y compris ceux écrits bien avant qu’on parle d’apprentissage automatique.",
        deliverables: [
          "Intégration à vos systèmes existants et hérités",
          "Des pipelines de données conçus pour survivre au roulement de personnel",
          "Surveillance, évaluation et contrôle des coûts",
          "Des guides d’exploitation que votre équipe peut suivre sans nous"
        ],
        label: "Intégration et mise à l’échelle"
      },
      pilot: {
        body: "Un seul cas d’usage, réalisé et mis entre les mains de vrais utilisateurs dans un délai fixe. Assez modeste pour être financé sans analyse de rentabilité, assez réel pour trancher le débat interne.",
        deliverables: [
          "Un système en usage réel, pas une démonstration",
          "Une mesure de référence et un résultat mesuré",
          "Une recommandation de poursuite ou d’arrêt que nous sommes prêts à défendre",
          "Une passation documentée"
        ],
        label: "Projet pilote et preuve de valeur"
      },
      readiness: {
        body: "Un examen structuré de votre situation réelle : vos données, vos systèmes et votre équipe. Vous repartez avec une liste de cas d’usage classés par rendement probable et par effort, et un avis franc sur ceux qui n’en valent pas encore la peine.",
        deliverables: [
          "Votre position sur l’échelle nationale de maturité",
          "Examen de la préparation des données et des systèmes",
          "Liste de cas d’usage classés par effort et rendement estimés",
          "Un plan chiffré pour le premier projet"
        ],
        label: "Diagnostic de maturité en IA"
      }
    },
    movesYouFrom: "Vous fait passer de",
    startsAt: "Pour les entreprises au stade"
  },
  stages: {
    explorer: {
      body: "Applications personnalisées ou propres au secteur, généralement encore à petite échelle.",
      label: "Explorateur"
    },
    novice: {
      body: "Expérimentation avec des outils prêts à l’emploi sur des tâches isolées. L’IA reste un projet parallèle, pas une façon de travailler.",
      label: "Novice"
    },
    optimiser: {
      body: "Usage systématique dans plusieurs flux de travail, choisi pour réduire les délais et les coûts.",
      label: "Optimisateur"
    },
    transformer: {
      body: "IA intégrée à la plupart des opérations, sur une infrastructure unifiée, avec l’expertise détenue à l’interne.",
      label: "Transformateur"
    }
  }
} satisfies Copy;
