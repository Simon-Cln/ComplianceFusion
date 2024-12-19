import csv
import json
import re

def clean_string(s):
    # Nettoie une chaîne de caractères pour l'utiliser comme ID
    return re.sub(r'[^a-zA-Z0-9]', '', s.lower())

def convert_csv_to_ts():
    regulations = []
    descriptions = {}
    
    # Lecture du CSV avec chemin complet
    csv_path = 'backend/normes_reglementations.csv'
    output_path = 'src/data/new_regulations.ts'
    
    # Lecture du CSV
    with open(csv_path, 'r', encoding='utf-8') as file:
        reader = csv.DictReader(file, delimiter=';')
        for row in reader:
            # Création de l'ID à partir du nom de la norme
            reg_id = clean_string(row['Norme/Réglementation'])
            
            # Création de l'objet regulation
            regulation = {
                'id': reg_id,
                'name': row['Norme/Réglementation'],
                'context': row['Contexte'],
                'objectives': row['Objectifs Principaux'],
                'keyRequirements': row['Exigences Clés'],
                'sector': row['Secteur Concerné'],
                'complexity': row['Complexité'],
                'cost': row['Coût'],
                'penalties': row['Pénalités'],
                'employeeSize': row["Combien d'employés compte votre entreprise ?"],
                'itDependency': row["Votre activité dépend-elle fortement des SI ?"]
            }
            regulations.append(regulation)

    # Création du fichier TypeScript
    ts_content = """// Ce fichier est généré automatiquement par convert_to_ts.py
export interface Regulation {
  id: string;
  name: string;
  context: string;
  objectives: string;
  keyRequirements: string;
  sector: string;
  complexity: string;
  cost: string;
  penalties: string;
  employeeSize: string;
  itDependency: string;
  description?: string;
}

// Fonction pour convertir le coût en niveau standardisé
const getCostLevel = (cost: string): 'faible' | 'moyen' | 'eleve' => {
  if (cost.toLowerCase().includes('faible')) return 'faible';
  if (cost.toLowerCase().includes('modéré')) return 'moyen';
  return 'eleve';
};

// Fonction pour convertir la complexité en niveau de compliance
const getComplianceLevel = (complexity: string): 'obligatoire' | 'recommande' => {
  if (complexity.toLowerCase().includes('élevée')) return 'obligatoire';
  return 'recommande';
};

export const regulations: Regulation[] = """

    # Ajout des données
    ts_content += json.dumps(regulations, ensure_ascii=False, indent=2)
    ts_content += ";"

    # Écriture du fichier TypeScript
    with open(output_path, 'w', encoding='utf-8') as file:
        file.write(ts_content)

    print("Fichier TypeScript généré avec succès !")

if __name__ == "__main__":
    convert_csv_to_ts()
