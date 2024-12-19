import json
import re

def parse_ts_file(file_path):
    with open(file_path, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Extraire le tableau de réglementations
    match = re.search(r'export const regulations: Regulation\[\] = (\[[\s\S]*?\]);', content)
    if not match:
        raise ValueError("Impossible de trouver le tableau de réglementations")
    
    # Convertir en JSON valide
    json_str = match.group(1).replace("'", '"')
    return json.loads(json_str)

def convert_regulation(old_reg):
    # Extraire le nom de base sans les détails après ":"
    base_name = old_reg["name"].split(" : ")[0].strip()
    
    # Déterminer la taille d'entreprise
    size = []
    if old_reg.get("employeeSize"):
        if "petite" in old_reg["employeeSize"].lower():
            size.append("petite")
        if "moyenne" in old_reg["employeeSize"].lower():
            size.append("moyenne")
        if "grande" in old_reg["employeeSize"].lower():
            size.append("grande")
    if not size:
        size = ["petite", "moyenne", "grande"]  # Par défaut toutes les tailles
    
    # Déterminer le niveau critique
    critical_level = []
    if old_reg.get("itDependency"):
        if "critique" in old_reg["itDependency"].lower():
            critical_level.append("critique")
        if "important" in old_reg["itDependency"].lower():
            critical_level.append("important")
        if "normal" in old_reg["itDependency"].lower():
            critical_level.append("normal")
    if not critical_level:
        critical_level = ["normal"]  # Par défaut niveau normal
    
    # Déterminer le coût estimé
    cost = "moyen"  # Par défaut
    if old_reg.get("cost"):
        if "faible" in old_reg["cost"].lower():
            cost = "faible"
        elif "élevé" in old_reg["cost"].lower() or "eleve" in old_reg["cost"].lower():
            cost = "eleve"
    
    # Déterminer les secteurs
    sectors = ["tous"]  # Par défaut tous les secteurs
    if old_reg.get("sector"):
        sectors = [s.strip() for s in old_reg["sector"].split(",")]
    
    # Créer la nouvelle réglementation
    new_reg = {
        "id": re.sub(r'[^a-z0-9]', '', base_name.lower()),
        "name": base_name,
        "description": old_reg.get("context") or "",
        "keyPoints": [
            p.strip() for p in (old_reg.get("mainObjectives", "") or "").split(",")
            if p.strip()
        ] + [
            p.strip() for p in (old_reg.get("keyRequirements", "") or "").split(",")
            if p.strip()
        ],
        "applicableTo": {
            "sectors": sectors,
            "size": size,
            "criticalLevel": critical_level
        },
        "complianceLevel": "obligatoire",
        "estimatedCost": cost,
    }
    
    # Ajouter les sanctions si présentes
    if old_reg.get("penalties"):
        new_reg["sanctions"] = [p.strip() for p in old_reg["penalties"].split(",") if p.strip()]
    
    return new_reg

def main():
    # Charger les anciennes réglementations
    old_regs = parse_ts_file("src/data/new_regulations.ts")
    
    # Convertir chaque réglementation
    new_regs = [convert_regulation(reg) for reg in old_regs]
    
    # Générer le nouveau fichier TypeScript
    output = """export interface Link {
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

export const regulations: Regulation[] = """ + json.dumps(new_regs, indent=2, ensure_ascii=False) + ";"
    
    # Sauvegarder le nouveau fichier
    with open("src/data/regulations.ts", "w", encoding="utf-8") as f:
        f.write(output)

if __name__ == "__main__":
    main()
