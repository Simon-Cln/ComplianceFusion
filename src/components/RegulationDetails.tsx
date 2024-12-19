import React from 'react';
import { Regulation } from '../data/regulations';

interface RegulationDetailsProps {
  regulation: Regulation;
  onClose: () => void;
}

export default function RegulationDetails({ regulation, onClose }: RegulationDetailsProps) {
  return (
    <dialog className="fr-modal" role="dialog" id="fr-modal-details" aria-labelledby="fr-modal-title">
      <div className="fr-container fr-container--fluid fr-container-md">
        <div className="fr-grid-row fr-grid-row--center">
          <div className="fr-col-12 fr-col-md-10 fr-col-lg-8">
            <div className="fr-modal__body">
              <div className="fr-modal__header">
                <button className="fr-btn--close fr-btn" title="Fermer" onClick={onClose}>
                  Fermer
                </button>
              </div>
              <div className="fr-modal__content">
                <h1 id="fr-modal-title" className="fr-modal__title">
                  <span className="fr-icon-arrow-right-line fr-icon--lg" aria-hidden="true"></span>
                  {regulation.name}
                </h1>

                <div className="fr-grid-row fr-grid-row--gutters">
                  {/* Description */}
                  <div className="fr-col-12">
                    <div className="fr-card fr-card--no-border fr-p-2w fr-mb-2w">
                      <p className="fr-text--lg">{regulation.description}</p>
                    </div>
                  </div>

                  {/* Points clés */}
                  <div className="fr-col-12">
                    <div className="fr-card fr-card--grey fr-p-3w fr-mb-3w">
                      <h2 className="fr-card__title">
                        <span className="fr-icon-checkbox-circle-line fr-icon--lg fr-mr-1w" aria-hidden="true"></span>
                        Points clés
                      </h2>
                      <ul className="fr-tags-group fr-mt-2w">
                        {regulation.keyPoints.map((point, index) => (
                          <li key={index}>
                            <p className="fr-tag fr-tag--sm">{point}</p>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>

                  {/* Applicabilité */}
                  <div className="fr-col-12 fr-col-md-6">
                    <div className="fr-card fr-card--grey fr-p-3w fr-mb-3w">
                      <h2 className="fr-card__title">
                        <span className="fr-icon-building-line fr-icon--lg fr-mr-1w" aria-hidden="true"></span>
                        Applicabilité
                      </h2>
                      <div className="fr-mt-2w">
                        <h3 className="fr-text--sm fr-mb-1w">Secteurs concernés</h3>
                        <ul className="fr-tags-group">
                          {regulation.applicableTo.sectors.map((sector, index) => (
                            <li key={index}>
                              <p className="fr-tag fr-tag--sm fr-tag--blue-cumulus">{sector}</p>
                            </li>
                          ))}
                        </ul>

                        <h3 className="fr-text--sm fr-mb-1w fr-mt-2w">Taille d'entreprise</h3>
                        <ul className="fr-tags-group">
                          {regulation.applicableTo.size.map((size, index) => (
                            <li key={index}>
                              <p className="fr-tag fr-tag--sm fr-tag--green-emeraude">{size}</p>
                            </li>
                          ))}
                        </ul>

                        <h3 className="fr-text--sm fr-mb-1w fr-mt-2w">Niveau critique</h3>
                        <ul className="fr-tags-group">
                          {regulation.applicableTo.criticalLevel.map((level, index) => (
                            <li key={index}>
                              <p className="fr-tag fr-tag--sm fr-tag--purple-glycine">{level}</p>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </div>

                  {/* Informations complémentaires */}
                  <div className="fr-col-12 fr-col-md-6">
                    <div className="fr-card fr-card--grey fr-p-3w fr-mb-3w">
                      <h2 className="fr-card__title">
                        <span className="fr-icon-information-line fr-icon--lg fr-mr-1w" aria-hidden="true"></span>
                        Informations complémentaires
                      </h2>
                      <div className="fr-mt-2w">
                        <p>
                          <strong>Niveau de conformité :</strong>{' '}
                          <span className={`fr-badge fr-badge--${regulation.complianceLevel === 'obligatoire' ? 'error' : 'info'}`}>
                            {regulation.complianceLevel}
                          </span>
                        </p>
                        
                        <p>
                          <strong>Coût estimé :</strong>{' '}
                          <span className={`fr-badge fr-badge--${
                            regulation.estimatedCost === 'eleve' ? 'error' : 
                            regulation.estimatedCost === 'moyen' ? 'warning' : 'success'
                          }`}>
                            {regulation.estimatedCost}
                          </span>
                        </p>

                        {regulation.implementationDeadline && (
                          <p>
                            <strong>Date limite de mise en œuvre :</strong>{' '}
                            <span className="fr-badge fr-badge--info">
                              {regulation.implementationDeadline}
                            </span>
                          </p>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Sanctions */}
                  {regulation.sanctions && regulation.sanctions.length > 0 && (
                    <div className="fr-col-12">
                      <div className="fr-card fr-card--grey fr-card--warning fr-p-3w">
                        <h2 className="fr-card__title">
                          <span className="fr-icon-warning-line fr-icon--lg fr-mr-1w" aria-hidden="true"></span>
                          Sanctions possibles
                        </h2>
                        <ul className="fr-mt-2w">
                          {regulation.sanctions.map((sanction, index) => (
                            <li key={index} className="fr-mb-1w">{sanction}</li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}

                  {/* Liens utiles */}
                  {regulation.links && regulation.links.length > 0 && (
                    <div className="fr-col-12">
                      <div className="fr-card fr-card--grey fr-p-3w">
                        <h2 className="fr-card__title">
                          <span className="fr-icon-links-line fr-icon--lg fr-mr-1w" aria-hidden="true"></span>
                          Liens utiles
                        </h2>
                        <ul className="fr-mt-2w fr-links-group">
                          {regulation.links.map((link, index) => (
                            <li key={index}>
                              <a href={link.url} className="fr-link" target="_blank" rel="noopener noreferrer">
                                {link.label}
                              </a>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </dialog>
  );
}
