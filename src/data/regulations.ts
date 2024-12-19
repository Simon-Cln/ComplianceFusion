export interface Link {
  label: string;
  url: string;
}

export interface Regulation {
  id: string;
  name: string;
  description: string;
  keyPoints: string[];
  applicableTo: {
    sectors: string[];
    size: string[];
    criticalLevel: string[];
  };
  links?: Link[];
  implementationDeadline?: string;
  complianceLevel: 'obligatoire' | 'recommande';
  estimatedCost: 'faible' | 'moyen' | 'eleve';
  sanctions?: string[];
}

export const regulations: Regulation[] = [
  {
    "id": "isoiec27001",
    "name": "ISO/IEC 27001",
    "description": "Norme internationale pour un Système de Management de la Sécurité de l’Information (SMSI)",
    "keyPoints": [
      "Confidentialité",
      "intégrité",
      "disponibilité des données",
      "Politique de sécurité",
      "gestion des risques",
      "audits",
      "amélioration continue"
    ],
    "applicableTo": {
      "sectors": [
        "Tous secteurs (international)"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "eleve",
    "sanctions": [
      "Aucune pénalité légale directe"
    ]
  },
  {
    "id": "isoiec27002",
    "name": "ISO/IEC 27002",
    "description": "Guide de bonnes pratiques, extension de l’ISO 27001",
    "keyPoints": [
      "Définir et maintenir des contrôles de sécurité",
      "Classification des actifs",
      "gestion des accès",
      "mesures physiques et logiques"
    ],
    "applicableTo": {
      "sectors": [
        "Tous secteurs (international)"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen",
    "sanctions": [
      "Pas de sanctions légales directes"
    ]
  },
  {
    "id": "isoiec27005",
    "name": "ISO/IEC 27005",
    "description": "Norme pour la gestion des risques en sécurité de l’information",
    "keyPoints": [
      "Identification",
      "analyse",
      "traitement des risques",
      "Méthodologie structurée pour évaluer et hiérarchiser les risques"
    ],
    "applicableTo": {
      "sectors": [
        "Tous secteurs (international)"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen",
    "sanctions": [
      "Aucune pénalité légale directe"
    ]
  },
  {
    "id": "isoiec27017",
    "name": "ISO/IEC 27017",
    "description": "Sécurité de l’information pour le cloud",
    "keyPoints": [
      "Orientée services cloud et virtualisation",
      "Contrôles spécifiques au cloud",
      "répartition des responsabilités client/fournisseur"
    ],
    "applicableTo": {
      "sectors": [
        "Fournisseurs et clients de services cloud"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen",
    "sanctions": [
      "Pas de sanctions légales directes"
    ]
  },
  {
    "id": "isoiec27018",
    "name": "ISO/IEC 27018",
    "description": "Protection des données personnelles dans les environnements cloud publics",
    "keyPoints": [
      "Vie privée",
      "confidentialité des données personnelles",
      "Consentement",
      "anonymisation",
      "audits",
      "transparence"
    ],
    "applicableTo": {
      "sectors": [
        "Fournisseurs cloud",
        "entreprises manipulant données perso"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen",
    "sanctions": [
      "Aucune sanction légale directe ; soutient la conformité RGPD"
    ]
  },
  {
    "id": "isoiec27701",
    "name": "ISO/IEC 27701",
    "description": "Extension de l’ISO 27001 pour la gestion de la vie privée",
    "keyPoints": [
      "Conformité RGPD",
      "protection de la privacy",
      "SMSI intégré",
      "rôles et responsabilités",
      "PIA (Privacy Impact Assessment)"
    ],
    "applicableTo": {
      "sectors": [
        "Tous secteurs traitant des données personnelles"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "eleve",
    "sanctions": [
      "Pas de sanctions directes mais facilite la conformité RGPD"
    ]
  },
  {
    "id": "isoiec22301",
    "name": "ISO/IEC 22301",
    "description": "Gestion de la continuité d’activité",
    "keyPoints": [
      "Résilience organisationnelle en cas d’incidents majeurs",
      "Plan de continuité",
      "analyses d’impact",
      "tests réguliers"
    ],
    "applicableTo": {
      "sectors": [
        "Tous secteurs (international)"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen",
    "sanctions": [
      "Aucune sanction légale directe"
    ]
  },
  {
    "id": "isoiec31000",
    "name": "ISO/IEC 31000",
    "description": "Cadre générique pour la gestion des risques",
    "keyPoints": [
      "Identifier",
      "analyser",
      "traiter tout type de risque",
      "Approche systématique et globale du risk management"
    ],
    "applicableTo": {
      "sectors": [
        "Tous secteurs (international)"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen",
    "sanctions": [
      "Pas de sanctions légales directes"
    ]
  },
  {
    "id": "isoiec62443",
    "name": "ISO/IEC 62443",
    "description": "Normes pour la sécurité des systèmes de contrôle industriel (ICS/SCADA)",
    "keyPoints": [
      "Protéger les infrastructures industrielles et critiques",
      "Segmentation réseau",
      "gestion des accès",
      "surveillance continue"
    ],
    "applicableTo": {
      "sectors": [
        "Industrie",
        "énergie",
        "transport",
        "OIV"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "eleve",
    "sanctions": [
      "Non spécifié légalement",
      "souvent requis par contrats"
    ]
  },
  {
    "id": "cobit2019isaca",
    "name": "COBIT 2019 (ISACA)",
    "description": "Cadre de gouvernance IT et de management des risques",
    "keyPoints": [
      "Aligner IT et objectifs métier",
      "optimiser la gouvernance",
      "Processus IT",
      "pilotage",
      "indicateurs et audits"
    ],
    "applicableTo": {
      "sectors": [
        "Tous secteurs (international)"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen",
    "sanctions": [
      "Aucune sanction légale directe"
    ]
  },
  {
    "id": "nistsp80053usa",
    "name": "NIST SP 800-53 (USA)",
    "description": "Contrôles de sécurité obligatoires pour les SI fédéraux US",
    "keyPoints": [
      "Catalogue de contrôles pour se conformer au FISMA",
      "Contrôles d’accès",
      "traçabilité",
      "gestion des vulnérabilités"
    ],
    "applicableTo": {
      "sectors": [
        "Secteur public US",
        "sous-traitants"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "eleve",
    "sanctions": [
      "Retrait ou non-renouvellement de contrats gouvernementaux"
    ]
  },
  {
    "id": "nistsp80037usa",
    "name": "NIST SP 800-37 (USA)",
    "description": "Cadre de gestion des risques (Risk Management Framework)",
    "keyPoints": [
      "Autorisation à opérer (ATO)",
      "gestion continue des risques",
      "Catégorisation",
      "sélection de contrôles",
      "évaluation",
      "suivi"
    ],
    "applicableTo": {
      "sectors": [
        "Secteur public US",
        "sous-traitants"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen",
    "sanctions": [
      "Perte d’autorisation",
      "sanctions contractuelles"
    ]
  },
  {
    "id": "nistcybersecurityframework",
    "name": "NIST Cybersecurity Framework",
    "description": "Cadre volontaire adopté globalement, initialement pour infrastructures critiques US",
    "keyPoints": [
      "Identifier",
      "protéger",
      "détecter",
      "répondre",
      "récupérer",
      "Évaluation des risques",
      "plan de réponse",
      "surveillance"
    ],
    "applicableTo": {
      "sectors": [
        "Tous secteurs (international)"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen",
    "sanctions": [
      "Pas de sanctions légales directes"
    ]
  },
  {
    "id": "pcidss",
    "name": "PCI DSS",
    "description": "Norme de sécurité pour l’industrie des cartes de paiement",
    "keyPoints": [
      "Sécuriser les données de cartes bancaires",
      "Chiffrement",
      "segmentation réseau",
      "contrôles d’accès",
      "audits réguliers"
    ],
    "applicableTo": {
      "sectors": [
        "Commerçants",
        "banques",
        "e-commerce"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "eleve",
    "sanctions": [
      "Amendes",
      "retrait de l’agrément de paiement"
    ]
  },
  {
    "id": "rgpdgdpr",
    "name": "RGPD (GDPR)",
    "description": "Règlement européen sur la protection des données personnelles",
    "keyPoints": [
      "Respect de la vie privée",
      "droits des personnes",
      "Consentement",
      "droits d’accès",
      "notification en cas de violation"
    ],
    "applicableTo": {
      "sectors": [
        "Toutes entreprises manipulant des données UE"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen",
    "sanctions": [
      "Amendes jusqu’à 20 M€ ou 4 % du CA mondial"
    ]
  },
  {
    "id": "doraeu",
    "name": "DORA (EU)",
    "description": "Résilience opérationnelle numérique pour les institutions financières",
    "keyPoints": [
      "Continuité d’activité",
      "gestion des risques numériques",
      "Tests de résilience",
      "gestion des tiers",
      "obligations de reporting"
    ],
    "applicableTo": {
      "sectors": [
        "Secteur financier dans l’UE"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "eleve",
    "sanctions": [
      "Sanctions financières",
      "restrictions d’activité"
    ]
  },
  {
    "id": "nis2",
    "name": "NIS2",
    "description": "Directive européenne sur la sécurité des réseaux et de l’information (v2)",
    "keyPoints": [
      "Renforcer la cybersécurité des services essentiels et OSE",
      "Mesures techniques",
      "audits",
      "signalement d’incidents"
    ],
    "applicableTo": {
      "sectors": [
        "Infrastructures critiques",
        "opérateurs de services essentiels"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen",
    "sanctions": [
      "Sanctions administratives et financières"
    ]
  },
  {
    "id": "eidas",
    "name": "eIDAS",
    "description": "Règlement européen sur l’identification électronique et services de confiance",
    "keyPoints": [
      "Reconnaissance mutuelle des identités électroniques",
      "signatures",
      "etc.",
      "Authentification forte",
      "signature électronique qualifiée",
      "horodatage"
    ],
    "applicableTo": {
      "sectors": [
        "Secteur public",
        "prestataires de services de confiance"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen",
    "sanctions": [
      "Amendes administratives",
      "invalidation de signatures"
    ]
  },
  {
    "id": "eprivacydirective",
    "name": "ePrivacy Directive",
    "description": "Directive UE protégeant la confidentialité des communications électroniques",
    "keyPoints": [
      "Encadrement des cookies",
      "e-mail marketing",
      "métadonnées",
      "Consentement préalable",
      "protection de la vie privée en ligne"
    ],
    "applicableTo": {
      "sectors": [
        "Fournisseurs de services en ligne",
        "opérateurs télécom"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "faible",
    "sanctions": [
      "Amendes administratives (souvent associées au RGPD)"
    ]
  },
  {
    "id": "ebaguidelinesictsecurity",
    "name": "EBA Guidelines (ICT & Security)",
    "description": "Lignes directrices de l’Autorité Bancaire Européenne",
    "keyPoints": [
      "Sécuriser l’IT et la gestion des risques cyber dans le secteur bancaire",
      "Politiques de sécurité",
      "audits",
      "rapports",
      "plan de continuité"
    ],
    "applicableTo": {
      "sectors": [
        "Établissements financiers dans l’UE"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "eleve",
    "sanctions": [
      "Sanctions financières via les régulateurs bancaires"
    ]
  },
  {
    "id": "lpmfrance",
    "name": "LPM (France)",
    "description": "Loi imposant des mesures de cybersécurité aux OIV (Opérateurs d’Importance Vitale)",
    "keyPoints": [
      "Protéger les infrastructures critiques françaises",
      "Mesures techniques",
      "audits",
      "signalement des incidents",
      "plan de sécurité"
    ],
    "applicableTo": {
      "sectors": [
        "Infrastructures critiques (énergie",
        "santé",
        "transport)"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen",
    "sanctions": [
      "Sanctions administratives",
      "voire pénales"
    ]
  },
  {
    "id": "loipourunerpubliquenumrique",
    "name": "Loi pour une République Numérique",
    "description": "Loi française orientée vers la transparence, l’ouverture des données et la protection",
    "keyPoints": [
      "Ouverture des données publiques",
      "droits numériques",
      "portabilité",
      "Démarches d’ouverture de données",
      "portabilité",
      "transparence"
    ],
    "applicableTo": {
      "sectors": [
        "Secteur public",
        "entreprises manipulant des données FR"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "faible",
    "sanctions": [
      "Amendes et sanctions administratives"
    ]
  },
  {
    "id": "cnilfrance",
    "name": "CNIL (France)",
    "description": "Règles et recommandations (délibérations, référentiels)",
    "keyPoints": [
      "Garantie de la conformité RGPD",
      "respect de la vie privée en France",
      "Consentement",
      "registres de traitement",
      "DPO",
      "formalités déclaratives"
    ],
    "applicableTo": {
      "sectors": [
        "Toutes entreprises gérant des données persos en France"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen",
    "sanctions": [
      "Amendes financières pouvant atteindre 20 M€ ou 4 % du CA"
    ]
  },
  {
    "id": "projetdeloirsiliencefrance",
    "name": "Projet de Loi Résilience (France)",
    "description": "Proposition législative pour la résilience numérique",
    "keyPoints": [
      "Continuité de service",
      "plans de résilience",
      "coordination en cas de crise",
      "Exigences de redondance",
      "organisation de crise",
      "reporting"
    ],
    "applicableTo": {
      "sectors": [
        "Services critiques",
        "opérateurs de services numériques"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen",
    "sanctions": [
      "Non défini (en cours d’élaboration)"
    ]
  },
  {
    "id": "cjissecuritypolicyusa",
    "name": "CJIS Security Policy (USA)",
    "description": "Politique de sécurité du FBI pour la protection des données de justice et de police",
    "keyPoints": [
      "Confidentialité",
      "intégrité",
      "traçabilité des données policières",
      "Contrôles d’accès",
      "cryptographie",
      "journalisation",
      "authentification"
    ],
    "applicableTo": {
      "sectors": [
        "Justice",
        "police",
        "sous-traitants gouvernementaux US"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "eleve",
    "sanctions": [
      "Perte de certification",
      "actions légales"
    ]
  },
  {
    "id": "cmmcusa",
    "name": "CMMC (USA)",
    "description": "Cybersecurity Maturity Model Certification pour les sous-traitants du DoD",
    "keyPoints": [
      "Vérifier la maturité cyber des prestataires de la défense",
      "Audits",
      "contrôles basés sur NIST",
      "certification progressive (Niveaux 1 à 5)"
    ],
    "applicableTo": {
      "sectors": [
        "Sous-traitants du Département de la Défense US"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "eleve",
    "sanctions": [
      "Impossibilité d’obtenir des contrats DoD sans certification"
    ]
  },
  {
    "id": "fismausa",
    "name": "FISMA (USA)",
    "description": "Federal Information Security Management Act",
    "keyPoints": [
      "Sécuriser et protéger les systèmes d’information fédéraux",
      "Gouvernance",
      "plans de sécurité",
      "évaluations annuelles"
    ],
    "applicableTo": {
      "sectors": [
        "Agences fédérales US",
        "sous-traitants"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "eleve",
    "sanctions": [
      "Perte de financement",
      "enquêtes légales"
    ]
  },
  {
    "id": "fedrampusa",
    "name": "FedRAMP (USA)",
    "description": "Programme d’autorisation pour les services cloud du gouvernement fédéral US",
    "keyPoints": [
      "Uniformiser l’évaluation et la surveillance continue de la sécurité cloud",
      "Audit indépendant (3PAO)",
      "autorisation (ATO)",
      "revue continue"
    ],
    "applicableTo": {
      "sectors": [
        "Fournisseurs cloud du gouvernement US"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "eleve",
    "sanctions": [
      "Retrait de l’autorisation FedRAMP et perte de contrats"
    ]
  },
  {
    "id": "hipaausa",
    "name": "HIPAA (USA)",
    "description": "Health Insurance Portability and Accountability Act",
    "keyPoints": [
      "Protection des données de santé (PHI)",
      "Politiques de confidentialité",
      "cryptage",
      "audit logs"
    ],
    "applicableTo": {
      "sectors": [
        "Secteur santé US (hôpitaux",
        "assurances",
        "etc.)"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "eleve",
    "sanctions": [
      "Amendes pouvant aller jusqu’à plusieurs millions de dollars"
    ]
  },
  {
    "id": "hitechusa",
    "name": "HITECH (USA)",
    "description": "Renforcement de HIPAA, impose des notifications en cas de violations",
    "keyPoints": [
      "Transparence accrue",
      "notification rapide aux patients",
      "Notification de faille",
      "sanctions aggravées"
    ],
    "applicableTo": {
      "sectors": [
        "Secteur santé US (mêmes acteurs qu’HIPAA)"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "eleve",
    "sanctions": [
      "Amendes sévères",
      "sanctions civiques et pénales"
    ]
  },
  {
    "id": "sarbanesoxleyactsection404",
    "name": "Sarbanes-Oxley Act Section 404",
    "description": "Loi US sur la gouvernance d’entreprise et la transparence financière",
    "keyPoints": [
      "Fiabiliser l’information financière",
      "contrôles internes IT",
      "Audit indépendant",
      "reporting financier",
      "traçabilité"
    ],
    "applicableTo": {
      "sectors": [
        "Entreprises cotées aux États-Unis"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "eleve",
    "sanctions": [
      "Amendes financières",
      "voire peines pénales"
    ]
  },
  {
    "id": "baseliiiscuritit",
    "name": "Basel III (Sécurité IT)",
    "description": "Cadre bancaire international intégrant la gestion des risques (dont risques IT)",
    "keyPoints": [
      "Assurer la stabilité financière",
      "dont la résilience cyber",
      "Stress tests",
      "fonds propres",
      "gestion des risques IT"
    ],
    "applicableTo": {
      "sectors": [
        "Banques et institutions financières internationales"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "eleve",
    "sanctions": [
      "Sanctions réglementaires",
      "pénalités financières"
    ]
  },
  {
    "id": "psd2ue",
    "name": "PSD2 (UE)",
    "description": "Directive européenne sur les services de paiement",
    "keyPoints": [
      "Sécuriser les paiements en ligne",
      "authentification forte (SCA)",
      "API ouvertes",
      "gestion des risques",
      "cryptographie",
      "Strong Customer Authentication"
    ],
    "applicableTo": {
      "sectors": [
        "Établissements de paiement",
        "FinTech dans l’UE"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "eleve",
    "sanctions": [
      "Amendes en cas de non-conformité"
    ]
  },
  {
    "id": "bdsgallemagne",
    "name": "BDSG (Allemagne)",
    "description": "Loi allemande de protection des données, complément au RGPD",
    "keyPoints": [
      "Protection renforcée des données et obligations spécifiques",
      "Consentement",
      "transferts limités",
      "DPO",
      "obligations d’information"
    ],
    "applicableTo": {
      "sectors": [
        "Entreprises opérant en Allemagne"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen",
    "sanctions": [
      "Amendes administratives alignées RGPD"
    ]
  },
  {
    "id": "ukdataprotectionact2018",
    "name": "UK Data Protection Act 2018",
    "description": "Loi britannique post-RGPD, intégrant les principes du RGPD au Royaume-Uni",
    "keyPoints": [
      "Maintenir des standards élevés de protection des données",
      "Droits individuels",
      "consentement",
      "DPO",
      "sanctions en cas de fuite"
    ],
    "applicableTo": {
      "sectors": [
        "Toute entreprise manipulant des données au Royaume-Uni"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen",
    "sanctions": [
      "Amendes financières (jusqu’à 17",
      "5 M£ ou 4 % CA)"
    ]
  },
  {
    "id": "lgpdbrsil",
    "name": "LGPD (Brésil)",
    "description": "Lei Geral de Proteção de Dados, équivalent brésilien du RGPD",
    "keyPoints": [
      "Protéger la vie privée des résidents brésiliens",
      "Consentement",
      "portabilité",
      "notification",
      "DPO",
      "sanctions"
    ],
    "applicableTo": {
      "sectors": [
        "Toutes entreprises manipulant des données au Brésil"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen",
    "sanctions": [
      "Amendes jusqu’à 2 % CA brésilien ou 50 M R$"
    ]
  },
  {
    "id": "piplchine",
    "name": "PIPL (Chine)",
    "description": "Personal Information Protection Law, loi chinoise sur la protection des données perso",
    "keyPoints": [
      "Réguler la collecte",
      "l’utilisation et la protection des données personnelles",
      "Consentement éclairé",
      "transferts transfrontaliers restreints",
      "audits"
    ],
    "applicableTo": {
      "sectors": [
        "Entreprises manipulant des données de résidents chinois"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "eleve",
    "sanctions": [
      "Amendes allant jusqu’à 5 % du CA annuel"
    ]
  },
  {
    "id": "cybersecuritylawofchina",
    "name": "Cybersecurity Law of China",
    "description": "Loi encadrant la sécurité des réseaux et la localisation des données en Chine",
    "keyPoints": [
      "Contrôler les infrastructures critiques et la gestion des données",
      "Stockage local",
      "audits fréquents",
      "certification obligatoire"
    ],
    "applicableTo": {
      "sectors": [
        "Infrastructures critiques",
        "entreprises en Chine"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "eleve",
    "sanctions": [
      "Amendes",
      "suspension d’activité",
      "blocage"
    ]
  },
  {
    "id": "pdpasingapour",
    "name": "PDPA (Singapour)",
    "description": "Personal Data Protection Act : Cadre de protection des données à Singapour",
    "keyPoints": [
      "Réguler collecte",
      "usage et divulgation des données",
      "Consentement",
      "notification des fuites",
      "mesures de sécurité"
    ],
    "applicableTo": {
      "sectors": [
        "Toutes entreprises manipulant des données à Singapour"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen",
    "sanctions": [
      "Amendes jusqu’à 1 M SGD"
    ]
  },
  {
    "id": "popiaafriquedusud",
    "name": "POPIA (Afrique du Sud)",
    "description": "Protection of Personal Information Act, loi de protection des données",
    "keyPoints": [
      "Principes de licéité",
      "consentement",
      "sécurité et notification des fuites",
      "DPO",
      "transparence",
      "obligations de sécurité"
    ],
    "applicableTo": {
      "sectors": [
        "Toutes entreprises manipulant des données en Afrique du Sud"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen",
    "sanctions": [
      "Amendes jusqu’à 10 M ZAR ou peine d’emprisonnement"
    ]
  },
  {
    "id": "anssirfrentielsfrance",
    "name": "ANSSI Référentiels (France)",
    "description": "Guides et labels de l’ANSSI pour la sécurité des SI, qualification de prestataires",
    "keyPoints": [
      "Définir un haut niveau de sécurité pour l’État et les opérateurs critiques",
      "Audit",
      "homologation",
      "PDIS",
      "PRIS",
      "PASSI",
      "qualifications officielles"
    ],
    "applicableTo": {
      "sectors": [
        "Secteur public",
        "OIV",
        "prestataires d’infogérance",
        "etc."
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen",
    "sanctions": [
      "Perte de qualification",
      "sanctions administratives"
    ]
  },
  {
    "id": "enisacybersecurityactue",
    "name": "ENISA Cybersecurity Act (UE)",
    "description": "Donne un mandat renforcé à l’ENISA et crée un cadre de certification cyber à l’UE",
    "keyPoints": [
      "Établir des schémas de certification européens",
      "Label européen de cybersécurité",
      "exigences techniques et organisationnelles"
    ],
    "applicableTo": {
      "sectors": [
        "Secteur IT",
        "fabricants",
        "opérateurs cloud",
        "produits et services TIC"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "eleve",
    "sanctions": [
      "Amendes administratives",
      "retraits de certification"
    ]
  },
  {
    "id": "eprivacyregulationueprojet",
    "name": "ePrivacy Regulation (UE, projet)",
    "description": "Réglementation remplaçant la directive ePrivacy, à venir",
    "keyPoints": [
      "Confidentialité des communications électroniques",
      "usage des cookies",
      "Consentement pour cookies",
      "protection des métadonnées",
      "obligations renforcées"
    ],
    "applicableTo": {
      "sectors": [
        "Fournisseurs de services en ligne",
        "telco",
        "entreprises UE"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen",
    "sanctions": [
      "Amendes administratives (proches RGPD)"
    ]
  },
  {
    "id": "icscertguidelinesusa",
    "name": "ICS-CERT Guidelines (USA)",
    "description": "Recommandations de l’ICS-CERT pour la sécurité des systèmes industriels",
    "keyPoints": [
      "Protéger les infrastructures ICS contre les cybermenaces",
      "Segmentation",
      "correctifs",
      "plans d’incident",
      "durcissement"
    ],
    "applicableTo": {
      "sectors": [
        "Secteurs industriels et infrastructures critiques US"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "eleve",
    "sanctions": [
      "Non spécifié légalement",
      "pertes de contrats possibles"
    ]
  },
  {
    "id": "fips1403usa",
    "name": "FIPS 140-3 (USA)",
    "description": "Norme fédérale pour la validation de modules cryptographiques",
    "keyPoints": [
      "Définir des niveaux de sécurité (1 à 4) et exiger une validation formelle",
      "Certification cryptographique par des labos agréés (CMVP)"
    ],
    "applicableTo": {
      "sectors": [
        "Gouvernement US",
        "fournisseurs de solutions cryptographiques"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen",
    "sanctions": [
      "Non-conformité = impossibilité de fournir au gouvernement"
    ]
  },
  {
    "id": "isae3402",
    "name": "ISAE 3402",
    "description": "Norme internationale d’audit sur les contrôles internes des fournisseurs de services",
    "keyPoints": [
      "Produire un rapport d’assurance sur l’efficacité des contrôles",
      "Audit indépendant",
      "rapport type I ou II",
      "transparence vis-à-vis des clients"
    ],
    "applicableTo": {
      "sectors": [
        "Fournisseurs de services d’externalisation",
        "BPO",
        "data centers",
        "etc."
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "eleve",
    "sanctions": [
      "Pas de sanctions légales directes",
      "impact business (perte de clients)"
    ]
  },
  {
    "id": "soc2aicpa",
    "name": "SOC 2 (AICPA)",
    "description": "Audit axé sur la sécurité, la disponibilité, l’intégrité, la confidentialité, la vie privée",
    "keyPoints": [
      "Donner confiance sur les contrôles internes des prestataires cloud / SaaS",
      "Audit indépendant",
      "rapport d’attestation",
      "évaluation des contrôles"
    ],
    "applicableTo": {
      "sectors": [
        "Prestataires de services cloud",
        "hébergeurs",
        "SaaS"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "eleve",
    "sanctions": [
      "Pas de sanctions directes",
      "mais nécessaire pour la crédibilité auprès des clients"
    ]
  },
  {
    "id": "tisaxallemagne",
    "name": "TISAX (Allemagne)",
    "description": "Standard de sécurité pour l’industrie automobile (Trusted Information Security Assessment Exchange)",
    "keyPoints": [
      "Mutualiser l’évaluation de la sécurité entre constructeurs/fournisseurs",
      "Audits",
      "classification des informations",
      "gestion des accès",
      "plan de remédiation"
    ],
    "applicableTo": {
      "sectors": [
        "Constructeurs auto",
        "sous-traitants (VDA",
        "OEM)"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen",
    "sanctions": [
      "Retrait du label TISAX",
      "perte de partenariats OEM"
    ]
  },
  {
    "id": "wlascs",
    "name": "WLA-SCS",
    "description": "World Lottery Association Security Control Standard",
    "keyPoints": [
      "Sécuriser la gestion des loteries et jeux d’argent",
      "Contrôles organisationnels",
      "traçabilité",
      "audits indépendants"
    ],
    "applicableTo": {
      "sectors": [
        "Opérateurs de loteries et jeux d’argent mondiaux"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen",
    "sanctions": [
      "Retrait de la certification WLA",
      "impact réputationnel"
    ]
  },
  {
    "id": "ccpacpracalifornieusa",
    "name": "CCPA/CPRA (Californie, USA)",
    "description": "Lois californiennes de protection de la vie privée",
    "keyPoints": [
      "Transparence",
      "opt-out",
      "droits d’accès",
      "suppression",
      "Notification de la collecte",
      "possibilité de refuser la vente de données"
    ],
    "applicableTo": {
      "sectors": [
        "Entreprises manipulant des données de résidents californiens"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "eleve",
    "sanctions": [
      "Amendes jusqu’à 7 500 $ par violation intentionnelle",
      "class actions"
    ]
  },
  {
    "id": "descriptionsdesnormesrglementations",
    "name": "# Descriptions des normes / réglementations :",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "isoiec27001",
    "name": "ISO/IEC 27001",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "isoiec27002",
    "name": "ISO/IEC 27002",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "isoiec27005",
    "name": "ISO/IEC 27005",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "isoiec27017",
    "name": "ISO/IEC 27017",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "isoiec27018",
    "name": "ISO/IEC 27018",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "isoiec27701",
    "name": "ISO/IEC 27701",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "isoiec22301",
    "name": "ISO/IEC 22301",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "isoiec31000",
    "name": "ISO/IEC 31000",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "isoiec62443",
    "name": "ISO/IEC 62443",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "cobit2019",
    "name": "COBIT 2019",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "nistsp80053",
    "name": "NIST SP 800-53",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "nistsp80037",
    "name": "NIST SP 800-37",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "nistcybersecurityframework",
    "name": "NIST Cybersecurity Framework",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "pcidss",
    "name": "PCI DSS",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "rgpdgdpr",
    "name": "RGPD (GDPR)",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "dora",
    "name": "DORA",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "nis2",
    "name": "NIS2",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "eidas",
    "name": "eIDAS",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "eprivacydirective",
    "name": "ePrivacy Directive",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "ebaguidelinesictsecurity",
    "name": "EBA Guidelines (ICT & Security)",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "lpmfrance",
    "name": "LPM (France)",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "loipourunerpubliquenumriquefrance",
    "name": "Loi pour une République Numérique (France)",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "cnilfrance",
    "name": "CNIL (France)",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "projetdeloirsiliencefrance",
    "name": "Projet de Loi Résilience (France)",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "cjissecuritypolicyusa",
    "name": "CJIS Security Policy (USA)",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "cmmcusa",
    "name": "CMMC (USA)",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "fismausa",
    "name": "FISMA (USA)",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "fedrampusa",
    "name": "FedRAMP (USA)",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "hipaausa",
    "name": "HIPAA (USA)",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "hitechusa",
    "name": "HITECH (USA)",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "sarbanesoxleyactsection404",
    "name": "Sarbanes-Oxley Act Section 404",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "baseliiiscuritit",
    "name": "Basel III (Sécurité IT)",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "psd2ue",
    "name": "PSD2 (UE)",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "bdsgallemagne",
    "name": "BDSG (Allemagne)",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "ukdataprotectionact2018",
    "name": "UK Data Protection Act 2018",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "lgpdbrsil",
    "name": "LGPD (Brésil)",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "piplchine",
    "name": "PIPL (Chine)",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "cybersecuritylawofchina",
    "name": "Cybersecurity Law of China",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "pdpasingapour",
    "name": "PDPA (Singapour)",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "popiaafriquedusud",
    "name": "POPIA (Afrique du Sud)",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "anssirfrentielsfrance",
    "name": "ANSSI Référentiels (France)",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "enisacybersecurityactue",
    "name": "ENISA Cybersecurity Act (UE)",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "eprivacyregulationueprojet",
    "name": "ePrivacy Regulation (UE, projet)",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "icscertguidelinesusa",
    "name": "ICS-CERT Guidelines (USA)",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "fips1403usa",
    "name": "FIPS 140-3 (USA)",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "isae3402",
    "name": "ISAE 3402",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "soc2aicpa",
    "name": "SOC 2 (AICPA)",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "tisaxallemagne",
    "name": "TISAX (Allemagne)",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "wlascs",
    "name": "WLA-SCS",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  },
  {
    "id": "ccpacpracalifornieusa",
    "name": "CCPA/CPRA (Californie, USA)",
    "description": "",
    "keyPoints": [],
    "applicableTo": {
      "sectors": [
        "tous"
      ],
      "size": [
        "petite",
        "moyenne",
        "grande"
      ],
      "criticalLevel": [
        "normal"
      ]
    },
    "complianceLevel": "obligatoire",
    "estimatedCost": "moyen"
  }
];