import React from 'react';
import { sectors, sizes, criticalLevels } from '../data/regulations';

interface CompanyFormProps {
  selectedSector: string;
  selectedSize: string;
  selectedCriticalLevel: string;
  onSectorChange: (value: string) => void;
  onSizeChange: (value: string) => void;
  onCriticalLevelChange: (value: string) => void;
}

const CompanyForm: React.FC<CompanyFormProps> = ({
  selectedSector,
  selectedSize,
  selectedCriticalLevel,
  onSectorChange,
  onSizeChange,
  onCriticalLevelChange,
}) => {
  return (
    <div className="fr-container fr-background-alt--grey fr-p-4w fr-my-4w">
      <form>
        <div className="fr-grid-row fr-grid-row--gutters">
          <div className="fr-col-12 fr-col-md-4">
            <div className="fr-select-group">
              <label className="fr-label" htmlFor="sector-select">
                Secteur d'activité
                <span className="fr-hint-text">Sélectionnez votre domaine principal</span>
              </label>
              <select
                className="fr-select"
                id="sector-select"
                name="sector-select"
                value={selectedSector}
                onChange={(e) => onSectorChange(e.target.value)}
              >
                <option value="">Sélectionnez un secteur</option>
                {sectors.map(sector => (
                  <option key={sector.value} value={sector.value}>{sector.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="fr-col-12 fr-col-md-4">
            <div className="fr-select-group">
              <label className="fr-label" htmlFor="size-select">
                Taille de l'entreprise
                <span className="fr-hint-text">Basé sur le nombre d'employés</span>
              </label>
              <select
                className="fr-select"
                id="size-select"
                name="size-select"
                value={selectedSize}
                onChange={(e) => onSizeChange(e.target.value)}
              >
                <option value="">Sélectionnez une taille</option>
                {sizes.map(size => (
                  <option key={size.value} value={size.value}>{size.label}</option>
                ))}
              </select>
            </div>
          </div>

          <div className="fr-col-12 fr-col-md-4">
            <div className="fr-select-group">
              <label className="fr-label" htmlFor="critical-select">
                Niveau critique
                <span className="fr-hint-text">Importance de vos systèmes d'information</span>
              </label>
              <select
                className="fr-select"
                id="critical-select"
                name="critical-select"
                value={selectedCriticalLevel}
                onChange={(e) => onCriticalLevelChange(e.target.value)}
              >
                <option value="">Sélectionnez un niveau</option>
                {criticalLevels.map(level => (
                  <option key={level.value} value={level.value}>{level.label}</option>
                ))}
              </select>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default CompanyForm;
