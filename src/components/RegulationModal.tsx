import React, { useEffect, useRef } from 'react';
import { Regulation } from '../data/regulations';
import '../styles/modal.css';

interface RegulationModalProps {
  regulation: Regulation | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function RegulationModal({ regulation, isOpen, onClose }: RegulationModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen && !dialog.open) {
      dialog.showModal();
    } else if (!isOpen && dialog.open) {
      dialog.close();
    }
  }, [isOpen]);

  if (!isOpen || !regulation) return null;

  return (
    <dialog ref={dialogRef} className="fr-modal" onClose={onClose}>
      <div className="fr-modal__body">
        <div className="fr-modal__header">
          <button
            className="fr-btn fr-btn--close"
            onClick={onClose}
            title="Fermer"
          >
            Fermer
          </button>
        </div>

        <div className="fr-modal__content">
          <h1 className="fr-modal__title">{regulation.name}</h1>

          <div className="fr-mb-3w">
            <h2 className="fr-h4">Description</h2>
            <p>{regulation.description}</p>
          </div>

          <div className="fr-mb-3w">
            <h2 className="fr-h4">Informations clés</h2>
            <ul className="fr-tags-group">
              <li>
                <p className={`fr-tag ${
                  regulation.complianceLevel === 'obligatoire' 
                    ? 'fr-tag--error' 
                    : 'fr-tag--info'
                }`}>
                  {regulation.complianceLevel === 'obligatoire' ? 'Obligatoire' : 'Recommandé'}
                </p>
              </li>
              <li>
                <p className={`fr-tag ${
                  regulation.estimatedCost === 'faible'
                    ? 'fr-tag--success'
                    : regulation.estimatedCost === 'moyen'
                    ? 'fr-tag--warning'
                    : 'fr-tag--error'
                }`}>
                  Coût {regulation.estimatedCost}
                </p>
              </li>
              {regulation.deadline && (
                <li>
                  <p className="fr-tag fr-tag--info">
                    Échéance : {new Date(regulation.deadline).toLocaleDateString()}
                  </p>
                </li>
              )}
            </ul>
          </div>

          {regulation.keyPoints && regulation.keyPoints.length > 0 && (
            <div className="fr-mb-3w">
              <h2 className="fr-h4">Points clés</h2>
              <ul className="fr-list">
                {regulation.keyPoints.map((point, index) => (
                  <li key={index}>{point}</li>
                ))}
              </ul>
            </div>
          )}

          {regulation.resources && regulation.resources.length > 0 && (
            <div className="fr-mb-3w">
              <h2 className="fr-h4">Ressources utiles</h2>
              <ul className="fr-list">
                {regulation.resources.map((resource, index) => (
                  <li key={index}>
                    <a
                      href={resource.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="fr-link"
                    >
                      {resource.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          )}

          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12 fr-col-md-6">
              <div className="fr-mb-3w">
                <h2 className="fr-h4">Secteurs concernés</h2>
                <ul className="fr-tags-group">
                  {regulation.applicableTo.sectors.map((sector, index) => (
                    <li key={index}>
                      <p className="fr-tag fr-tag--sm">{sector}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="fr-col-12 fr-col-md-6">
              <div className="fr-mb-3w">
                <h2 className="fr-h4">Tailles d'entreprise concernées</h2>
                <ul className="fr-tags-group">
                  {regulation.applicableTo.size.map((size, index) => (
                    <li key={index}>
                      <p className="fr-tag fr-tag--sm">{size}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="fr-modal__footer">
          <button className="fr-btn" onClick={onClose}>
            Fermer
          </button>
        </div>
      </div>
    </dialog>
  );
}
