import React, { useState } from 'react';
import { Regulation } from '../types/regulations';

interface RegulationCardProps {
  regulation: Regulation;
}

const RegulationCard: React.FC<RegulationCardProps> = ({ regulation }) => {
  const [isExpanded, setIsExpanded] = useState(false);

  const getCostColor = (cost: string | null) => {
    switch (cost?.toLowerCase()) {
      case 'faible': return '#0d6efd';
      case 'moyen': return '#ffc107';
      case 'élevé':
      case 'eleve': return '#dc3545';
      default: return '#6c757d';
    }
  };

  const getComplexityColor = (complexity: string | null) => {
    switch (complexity?.toLowerCase()) {
      case 'faible': return '#198754';
      case 'modérée': 
      case 'moderee': return '#ffc107';
      case 'élevée':
      case 'elevee': return '#dc3545';
      default: return '#6c757d';
    }
  };

  return (
    <div className="fr-col-12 fr-col-md-6 fr-col-lg-4 fr-mb-3w">
      <div 
        className={`fr-card fr-card--shadow fr-enlarge-link ${isExpanded ? 'fr-card--expanded' : ''}`}
        style={{ 
          transition: 'all 0.3s ease',
          height: '100%',
          position: 'relative',
          overflow: 'hidden'
        }}
      >
        <div className="fr-card__header fr-p-3w" style={{ backgroundColor: '#f6f6f6' }}>
          <h3 className="fr-card__title fr-text--lg fr-mb-0">
            <button 
              className={`fr-link--card fr-text--bold ${isExpanded ? 'fr-icon-arrow-up-s-line fr-link--icon-right' : 'fr-icon-arrow-down-s-line fr-link--icon-right'}`}
              onClick={() => setIsExpanded(!isExpanded)}
              aria-expanded={isExpanded}
              aria-controls={`regulation-${regulation.name}`}
              style={{ color: '#000091', textAlign: 'left', width: '100%' }}
            >
              {regulation.name}
            </button>
          </h3>
        </div>

        <div className="fr-card__body fr-p-3w">
          <div className="fr-card__content">
            <div className="fr-card__desc">
              {regulation.context && (
                <p className="fr-text--sm fr-mb-2w">{regulation.context}</p>
              )}
              
              <div className="fr-grid-row fr-grid-row--gutters fr-mb-2w">
                {regulation.sector && (
                  <div className="fr-col-12 fr-col-md-6">
                    <div className="fr-text--sm fr-mb-1w">
                      <span className="fr-icon-building-line fr-mr-1w" aria-hidden="true"></span>
                      <strong>Secteur</strong>
                    </div>
                    <span className="fr-badge fr-badge--info fr-badge--no-icon">
                      {regulation.sector}
                    </span>
                  </div>
                )}
                
                {regulation.complexity && (
                  <div className="fr-col-12 fr-col-md-6">
                    <div className="fr-text--sm fr-mb-1w">
                      <span className="fr-icon-dashboard-line fr-mr-1w" aria-hidden="true"></span>
                      <strong>Complexité</strong>
                    </div>
                    <span 
                      className="fr-badge fr-badge--no-icon"
                      style={{ backgroundColor: getComplexityColor(regulation.complexity) }}
                    >
                      {regulation.complexity}
                    </span>
                  </div>
                )}
              </div>

              <div className="fr-grid-row fr-grid-row--gutters">
                {regulation.cost && (
                  <div className="fr-col-12 fr-col-md-6">
                    <div className="fr-text--sm fr-mb-1w">
                      <span className="fr-icon-money-euro-circle-line fr-mr-1w" aria-hidden="true"></span>
                      <strong>Coût</strong>
                    </div>
                    <span 
                      className="fr-badge fr-badge--no-icon"
                      style={{ backgroundColor: getCostColor(regulation.cost) }}
                    >
                      {regulation.cost}
                    </span>
                  </div>
                )}
              </div>
            </div>

            <div 
              className="fr-collapse" 
              id={`regulation-${regulation.name}`}
              style={{ 
                display: isExpanded ? 'block' : 'none',
                transition: 'all 0.3s ease',
                opacity: isExpanded ? 1 : 0,
                transform: `translateY(${isExpanded ? '0' : '-10px'})`
              }}
            >
              <div className="fr-pt-3w fr-border-top">
                {regulation.mainObjectives && (
                  <div className="fr-mb-3w">
                    <p className="fr-text--bold fr-mb-1w">
                      <span className="fr-icon-target-line fr-mr-1w" aria-hidden="true"></span>
                      Objectifs principaux
                    </p>
                    <p className="fr-text--sm">{regulation.mainObjectives}</p>
                  </div>
                )}

                {regulation.keyRequirements && (
                  <div className="fr-mb-3w">
                    <p className="fr-text--bold fr-mb-1w">
                      <span className="fr-icon-list-check-line fr-mr-1w" aria-hidden="true"></span>
                      Exigences clés
                    </p>
                    <p className="fr-text--sm">{regulation.keyRequirements}</p>
                  </div>
                )}

                {regulation.penalties && (
                  <div className="fr-mb-3w">
                    <p className="fr-text--bold fr-mb-1w">
                      <span className="fr-icon-error-warning-line fr-mr-1w" aria-hidden="true"></span>
                      Sanctions
                    </p>
                    <p className="fr-text--sm">{regulation.penalties}</p>
                  </div>
                )}

                {regulation.employeeSize && (
                  <div className="fr-mb-3w">
                    <p className="fr-text--bold fr-mb-1w">
                      <span className="fr-icon-group-line fr-mr-1w" aria-hidden="true"></span>
                      Taille d'entreprise
                    </p>
                    <p className="fr-text--sm">{regulation.employeeSize}</p>
                  </div>
                )}

                {regulation.itDependency && (
                  <div>
                    <p className="fr-text--bold fr-mb-1w">
                      <span className="fr-icon-computer-line fr-mr-1w" aria-hidden="true"></span>
                      Dépendance IT
                    </p>
                    <p className="fr-text--sm">{regulation.itDependency}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegulationCard;
