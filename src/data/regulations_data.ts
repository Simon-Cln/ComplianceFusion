import { Regulation } from '../types/regulations';

export const regulations: Regulation[] = [
    {
        card: {
            name: "NIST SP 800-53 (USA)",
            sector: "Secteur public US, sous-traitants",
            complexity: "Élevée",
            cost: "Élevé",
            mainObjective: "Catalogue de contrôles pour se conformer au FISMA"
        },
        details: {
            context: "Contrôles de sécurité obligatoires pour les SI fédéraux US",
            keyRequirements: [
                "Contrôles d'accès",
                "traçabilité",
                "gestion des vulnérabilités"
            ],
            penalties: "Retrait ou non-renouvellement de contrats gouvernementaux"
        }
    },
    {
        card: {
            name: "ISO/IEC 27701",
            sector: "Tous secteurs traitant des données personnelles",
            complexity: "Élevée",
            cost: "Élevé",
            mainObjective: "Extension de l'ISO 27001 pour la gestion de la vie privée"
        },
        details: {
            context: "Extension de l'ISO 27001 pour la gestion de la vie privée",
            keyRequirements: [
                "Conformité RGPD",
                "protection de la privacy",
                "SMSI intégré",
                "rôles et responsabilités",
                "PIA (Privacy Impact Assessment)"
            ],
            penalties: "Pas de sanctions directes mais facilite la conformité RGPD"
        }
    }
];
