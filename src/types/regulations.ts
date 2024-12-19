export interface RegulationCard {
    name: string;
    sector: string;
    complexity: string;
    cost: string;
    mainObjective: string;
}

export interface RegulationDetails {
    context: string;
    keyRequirements: string[];
    penalties: string;
    employeeSize?: string;
    itDependency?: string;
}

export interface Regulation {
    card: RegulationCard;
    details: RegulationDetails;
}
