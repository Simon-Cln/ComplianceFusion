import csv
import json
import os

def clean_string(s):
    if not s:
        return None
    s = s.strip()
    return s if s else None

def convert_csv_to_ts():
    regulations = []
    
    with open('normes_reglementations.csv', 'r', encoding='utf-8') as file:
        csv_reader = csv.DictReader(file, delimiter=';')
        
        for row in csv_reader:
            regulation = {
                'name': clean_string(row['Norme/Réglementation']),
                'context': clean_string(row['Contexte']),
                'mainObjectives': clean_string(row['Objectifs Principaux']),
                'keyRequirements': clean_string(row['Exigences Clés']),
                'sector': clean_string(row['Secteur Concerné']),
                'complexity': clean_string(row['Complexité']),
                'cost': clean_string(row.get('Coût', '')),
                'penalties': clean_string(row.get('Pénalités', '')),
                'employeeSize': clean_string(row.get('Combien d\'employés compte votre entreprise ?', '')),
                'itDependency': clean_string(row.get('Votre activité dépend-elle fortement des SI ?', ''))
            }
            if regulation['name']:
                regulations.append(regulation)
    
    ts_content = """
// Types pour les réglementations
export interface Regulation {
    name: string;
    context: string | null;
    mainObjectives: string | null;
    keyRequirements: string | null;
    sector: string | null;
    complexity: string | null;
    cost: string | null;
    penalties: string | null;
    employeeSize: string | null;
    itDependency: string | null;
}

// Liste des réglementations
export const regulations: Regulation[] = """ + json.dumps(regulations, ensure_ascii=False, indent=2) + ";"
    
    with open('../src/data/new_regulations.ts', 'w', encoding='utf-8') as ts_file:
        ts_file.write(ts_content)

if __name__ == '__main__':
    convert_csv_to_ts()
