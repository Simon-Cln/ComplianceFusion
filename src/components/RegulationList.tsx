import React, { useState } from 'react';
import { Regulation } from '../data/regulations';
import Modal from './Modal';
import Pagination from './Pagination';

interface RegulationListProps {
  regulations: Regulation[];
}

const ITEMS_PER_PAGE = 20; // Afficher 20 éléments par page

const RegulationCard = ({ regulation }: { regulation: Regulation }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getSeverityColor = (cost: string) => {
    switch (cost.toLowerCase()) {
      case 'eleve':
        return 'fr-tag--error';
      case 'moyen':
        return 'fr-tag--warning';
      case 'faible':
        return 'fr-tag--success';
      default:
        return 'fr-tag--info';
    }
  };

  return (
    <>
      <div className="fr-card fr-card--shadow fr-mb-3w" style={{ 
        borderRadius: '12px', 
        overflow: 'hidden',
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        backgroundColor: '#1e1e1e',
        border: '1px solid #2d2d2d',
        transition: 'all 0.2s ease-in-out',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)'
        }
      }}>
        <div className="fr-card__body fr-p-2w" style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
          <div className="fr-card__content" style={{ flex: 1 }}>
            {/* En-tête avec titre et coût */}
            <div className="fr-mb-2w">
              <div style={{ 
                display: 'flex', 
                alignItems: 'center',
                gap: '0.75rem',
                marginBottom: '0.75rem'
              }}>
                <div style={{
                  backgroundColor: '#2d2d2d',
                  padding: '0.5rem',
                  borderRadius: '8px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                  <span className="fr-icon-shield-fill" aria-hidden="true" style={{ 
                    color: '#4f7bff', 
                    fontSize: '1.4rem'
                  }}></span>
                </div>
                <h3 className="fr-card__title" style={{ 
                  fontSize: '1.1rem', 
                  fontWeight: '700',
                  color: '#ffffff',
                  margin: 0,
                  flex: 1
                }}>
                  {regulation.name}
                </h3>
              </div>
              <div className="fr-tags-group" style={{ gap: '0.5rem', display: 'flex', flexWrap: 'wrap' }}>
                <span className={`fr-tag ${getSeverityColor(regulation.estimatedCost)}`} style={{ 
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.25rem'
                }}>
                  <span className="fr-icon-money-euro-circle-fill fr-mr-1w" aria-hidden="true"></span>
                  {regulation.estimatedCost}
                </span>
                <span className="fr-tag fr-tag--info" style={{ 
                  fontSize: '0.875rem',
                  fontWeight: '600',
                  padding: '0.35rem 0.75rem',
                  borderRadius: '6px',
                  backgroundColor: '#4f7bff'
                }}>
                  {regulation.complianceLevel}
                </span>
              </div>
            </div>

            {/* Description courte */}
            <p className="fr-text--sm" style={{ 
              color: '#e0e0e0', 
              marginBottom: '1rem',
              display: '-webkit-box',
              WebkitLineClamp: '2',
              WebkitBoxOrient: 'vertical',
              overflow: 'hidden',
              lineHeight: '1.5',
              fontWeight: '400',
              fontSize: '0.9rem'
            }}>
              {regulation.description}
            </p>

            {/* Points clés */}
            <div className="fr-mb-2w">
              <div className="fr-tags-group" style={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: '0.4rem'
              }}>
                {regulation.keyPoints.slice(0, 2).map((point, index) => (
                  <span key={index} className="fr-tag fr-tag--sm" style={{ 
                    background: 'linear-gradient(145deg, #2d2d2d, #252525)',
                    color: '#ffffff',
                    fontSize: '0.875rem',
                    padding: '0.35rem 0.75rem',
                    border: '1px solid #3d3d3d',
                    fontWeight: '500',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <span className="fr-icon-checkbox-circle-fill fr-mr-1w" aria-hidden="true" style={{ color: '#4f7bff', fontSize: '0.875rem' }}></span>
                    {point}
                  </span>
                ))}
                {regulation.keyPoints.length > 2 && (
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="fr-tag fr-tag--sm fr-tag--info" 
                    style={{ 
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      backgroundColor: '#4f7bff',
                      color: '#ffffff',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: '#3d69ff'
                      }
                    }}
                  >
                    <span className="fr-icon-add-circle-fill fr-mr-1w" aria-hidden="true"></span>
                    {regulation.keyPoints.length - 2} points
                  </button>
                )}
              </div>
            </div>

            {/* Secteurs (limité à 2) */}
            <div style={{ marginTop: 'auto' }}>
              <div className="fr-tags-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                {regulation.applicableTo.sectors.slice(0, 2).map((sector, index) => (
                  <span key={index} className="fr-tag fr-tag--sm" style={{ 
                    fontSize: '0.875rem',
                    padding: '0.35rem 0.75rem',
                    background: 'linear-gradient(145deg, #2d2d2d, #252525)',
                    border: '1px solid #3d3d3d',
                    color: '#ffffff',
                    fontWeight: '500',
                    borderRadius: '6px',
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem'
                  }}>
                    <span className="fr-icon-building-line fr-mr-1w" aria-hidden="true" style={{ color: '#4f7bff' }}></span>
                    {sector}
                  </span>
                ))}
                {regulation.applicableTo.sectors.length > 2 && (
                  <button
                    onClick={() => setIsModalOpen(true)}
                    className="fr-tag fr-tag--sm"
                    style={{ 
                      fontSize: '0.875rem',
                      fontWeight: '600',
                      backgroundColor: '#4f7bff',
                      color: '#ffffff',
                      padding: '0.35rem 0.75rem',
                      borderRadius: '6px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '0.25rem',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease-in-out',
                      '&:hover': {
                        backgroundColor: '#3d69ff'
                      }
                    }}
                  >
                    <span className="fr-icon-add-circle-fill fr-mr-1w" aria-hidden="true"></span>
                    {regulation.applicableTo.sectors.length - 2} secteurs
                  </button>
                )}
              </div>
            </div>

            {/* Bouton voir plus */}
            <div className="fr-mt-2w" style={{ textAlign: 'right' }}>
              <button
                className="fr-btn fr-btn--tertiary fr-btn--sm fr-btn--icon-right"
                onClick={() => setIsModalOpen(true)}
                style={{ 
                  padding: '0.35rem 0.75rem',
                  fontSize: '0.875rem',
                  borderRadius: '6px',
                  backgroundColor: '#4f7bff',
                  color: '#ffffff',
                  border: 'none',
                  fontWeight: '600',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  transition: 'all 0.2s ease-in-out',
                  '&:hover': {
                    backgroundColor: '#3d69ff',
                    transform: 'translateY(-1px)'
                  }
                }}
              >
                Détails
                <span className="fr-icon-arrow-right-line" aria-hidden="true"></span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal avec les détails */}
      <Modal
        isOpen={isModalOpen}
        hide={() => setIsModalOpen(false)}
        title={regulation.name}
        size="lg"
      >
        <div className="fr-container fr-container--fluid fr-p-3w">
          <div className="fr-grid-row fr-grid-row--gutters fr-mb-3w">
            <div className="fr-col-12">
              <div className="fr-tags-group fr-mb-2w">
                <span className={`fr-tag ${getSeverityColor(regulation.estimatedCost)}`}>
                  Coût estimé: {regulation.estimatedCost}
                </span>
                <span className="fr-tag fr-tag--info">
                  {regulation.complianceLevel}
                </span>
              </div>
              <p className="fr-text--lg">{regulation.description}</p>
            </div>
          </div>

          <div className="fr-grid-row fr-grid-row--gutters">
            {/* Points clés */}
            <div className="fr-col-12 fr-mb-3w">
              <h4 className="fr-h5 fr-mb-2w">
                <span className="fr-icon-list-fill fr-mr-1w" aria-hidden="true"></span>
                Points clés
              </h4>
              <div className="fr-tags-group" style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {regulation.keyPoints.map((point, index) => (
                  <span key={index} className="fr-tag">
                    {point}
                  </span>
                ))}
              </div>
            </div>

            {/* Secteurs et tailles */}
            <div className="fr-col-12 fr-col-md-6 fr-mb-3w">
              <h4 className="fr-h5 fr-mb-2w">
                <span className="fr-icon-building-fill fr-mr-1w" aria-hidden="true"></span>
                Secteurs concernés
              </h4>
              <div className="fr-tags-group">
                {regulation.applicableTo.sectors.map((sector, index) => (
                  <span key={index} className="fr-tag">
                    {sector}
                  </span>
                ))}
              </div>
            </div>

            <div className="fr-col-12 fr-col-md-6 fr-mb-3w">
              <h4 className="fr-h5 fr-mb-2w">
                <span className="fr-icon-user-fill fr-mr-1w" aria-hidden="true"></span>
                Tailles d'entreprise
              </h4>
              <div className="fr-tags-group">
                {regulation.applicableTo.size.map((size, index) => (
                  <span key={index} className="fr-tag">
                    {size}
                  </span>
                ))}
              </div>
            </div>

            {/* Sanctions */}
            {regulation.sanctions && regulation.sanctions.length > 0 && (
              <div className="fr-col-12">
                <h4 className="fr-h5 fr-mb-2w">
                  <span className="fr-icon-warning-fill fr-mr-1w" aria-hidden="true"></span>
                  Sanctions
                </h4>
                <div className="fr-alert fr-alert--warning fr-mb-3w">
                  <ul className="fr-list">
                    {regulation.sanctions.map((sanction, index) => (
                      <li key={index}>{sanction}</li>
                    ))}
                  </ul>
                </div>
              </div>
            )}
          </div>
        </div>
      </Modal>
    </>
  );
};

const RegulationList: React.FC<RegulationListProps> = ({ regulations }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(regulations.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const currentRegulations = regulations.slice(startIndex, endIndex);

  return (
    <div className="fr-container">
      <div className="fr-grid-row fr-grid-row--center">
        <div className="fr-col-12">
          <p className="fr-text--sm fr-mb-3w">
            {regulations.length} réglementation(s) trouvée(s)
          </p>
          <div className="fr-grid-row fr-grid-row--gutters">
            {currentRegulations.map((regulation, index) => (
              <div key={index} className="fr-col-12 fr-col-md-4" style={{ marginBottom: '1.5rem' }}>
                <RegulationCard regulation={regulation} />
              </div>
            ))}
          </div>
          {totalPages > 1 && (
            <div className="fr-mt-4w fr-mb-4w" style={{ display: 'flex', justifyContent: 'center' }}>
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={setCurrentPage}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegulationList;
