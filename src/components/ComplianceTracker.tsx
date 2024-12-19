import React, { useState } from 'react';
import { Regulation } from '../data/regulations';

interface ComplianceStatus {
  status: 'not_started' | 'in_progress' | 'compliant' | 'non_compliant';
  notes?: string;
  lastUpdated: Date;
}

interface ComplianceTrackerProps {
  regulations: Regulation[];
  complianceStatus: Record<string, ComplianceStatus>;
  onStatusUpdate: (regulationId: string, status: ComplianceStatus['status'], notes: string) => void;
}

export default function ComplianceTracker({ 
  regulations,
  complianceStatus,
  onStatusUpdate
}: ComplianceTrackerProps) {
  const [selectedRegulation, setSelectedRegulation] = useState<string | null>(null);
  const [detailRegulation, setDetailRegulation] = useState<Regulation | null>(null);
  const [notes, setNotes] = useState('');
  const [tempStatus, setTempStatus] = useState<ComplianceStatus['status']>('not_started');

  const getStatusColor = (status: ComplianceStatus['status']) => {
    switch (status) {
      case 'compliant':
        return 'fr-badge--success';
      case 'in_progress':
        return 'fr-badge--warning';
      case 'non_compliant':
        return 'fr-badge--error';
      default:
        return 'fr-badge--info';
    }
  };

  const getStatusLabel = (status: ComplianceStatus['status']) => {
    switch (status) {
      case 'compliant':
        return 'Conforme';
      case 'in_progress':
        return 'En cours';
      case 'non_compliant':
        return 'Non conforme';
      default:
        return 'Non commencé';
    }
  };

  const handleStatusUpdate = () => {
    if (selectedRegulation) {
      onStatusUpdate(selectedRegulation, tempStatus, notes);
      setSelectedRegulation(null);
      setNotes('');
    }
  };

  const formatDate = (date: string | Date) => {
    return new Date(date).toLocaleDateString('fr-FR', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  return (
    <>
      <div className="fr-table">
        <table>
          <thead>
            <tr>
              <th scope="col">Réglementation</th>
              <th scope="col">Description</th>
              <th scope="col">Statut</th>
              <th scope="col">Dernière mise à jour</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {regulations.map((regulation) => (
              <tr key={regulation.id}>
                <td>
                  <button
                    className="fr-link fr-link--md"
                    onClick={() => setDetailRegulation(regulation)}
                  >
                    {regulation.name}
                  </button>
                </td>
                <td>
                  <p className="fr-text--sm fr-mb-0">
                    {regulation.description && regulation.description.length > 100
                      ? `${regulation.description.substring(0, 100)}...`
                      : regulation.description || 'Aucune description disponible'}
                  </p>
                </td>
                <td>
                  <span className={`fr-badge ${getStatusColor(
                    complianceStatus[regulation.id]?.status || 'not_started'
                  )}`}>
                    {getStatusLabel(complianceStatus[regulation.id]?.status || 'not_started')}
                  </span>
                </td>
                <td>
                  {complianceStatus[regulation.id]?.lastUpdated
                    ? formatDate(complianceStatus[regulation.id].lastUpdated)
                    : 'Jamais'}
                </td>
                <td>
                  <button
                    className="fr-btn fr-btn--sm fr-btn--secondary"
                    onClick={() => {
                      setSelectedRegulation(regulation.id);
                      setTempStatus(complianceStatus[regulation.id]?.status || 'not_started');
                      setNotes(complianceStatus[regulation.id]?.notes || '');
                    }}
                  >
                    Mettre à jour
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {selectedRegulation && (
        <dialog open className="fr-modal" role="dialog" id="fr-modal-1" aria-labelledby="fr-modal-title-modal-1">          <div className="fr-container fr-container--fluid fr-container-md">
            <div className="fr-grid-row fr-grid-row--center">
              <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
                <div className="fr-modal__body">
                  <div className="fr-modal__header">
                    <button className="fr-link--close fr-link" onClick={() => setSelectedRegulation(null)}>Fermer</button>
                  </div>
                  <div className="fr-modal__content">
                    <h1 id="fr-modal-title-modal-1" className="fr-modal__title">
                      Mettre à jour le statut
                    </h1>
                    <div className="fr-form-group">
                      <label className="fr-label" htmlFor="select-status">
                        Statut
                      </label>
                      <select
                        className="fr-select"
                        id="select-status"
                        name="select-status"
                        value={tempStatus}
                        onChange={(e) => setTempStatus(e.target.value as ComplianceStatus['status'])}
                      >
                        <option value="not_started">Non commencé</option>
                        <option value="in_progress">En cours</option>
                        <option value="compliant">Conforme</option>
                        <option value="non_compliant">Non conforme</option>
                      </select>
                    </div>
                    <div className="fr-form-group">
                      <label className="fr-label" htmlFor="textarea-notes">
                        Notes
                      </label>
                      <textarea
                        className="fr-textarea"
                        id="textarea-notes"
                        name="textarea-notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="fr-modal__footer">
                    <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse fr-btns-group--inline-lg">
                      <li>
                        <button className="fr-btn" onClick={handleStatusUpdate}>
                          Enregistrer
                        </button>
                      </li>
                      <li>
                        <button className="fr-btn fr-btn--secondary" onClick={() => setSelectedRegulation(null)}>
                          Annuler
                        </button>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      )}

      {detailRegulation && (
        <dialog className="fr-modal" role="dialog" id="fr-modal-2" aria-labelledby="fr-modal-title-modal-2">
          <div className="fr-container fr-container--fluid fr-container-md">
            <div className="fr-grid-row fr-grid-row--center">
              <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
                <div className="fr-modal__body">
                  <div className="fr-modal__header">
                    <button className="fr-link--close fr-link" onClick={() => setDetailRegulation(null)}>Fermer</button>
                  </div>
                  <div className="fr-modal__content">
                    <h1 id="fr-modal-title-modal-2" className="fr-modal__title">
                      {detailRegulation.name}
                    </h1>
                    <div className="fr-text--sm">
                      <p>{detailRegulation.description || 'Aucune description disponible'}</p>
                      {detailRegulation.keyPoints && detailRegulation.keyPoints.length > 0 && (
                        <>
                          <h2>Points clés</h2>
                          <ul>
                            {detailRegulation.keyPoints.map((point, index) => (
                              <li key={index}>{point}</li>
                            ))}
                          </ul>
                        </>
                      )}
                      {detailRegulation.applicableTo && (
                        <>
                          <h2>Applicable à</h2>
                          <ul>
                            {detailRegulation.applicableTo.sectors.length > 0 && (
                              <li>Secteurs : {detailRegulation.applicableTo.sectors.join(', ')}</li>
                            )}
                            {detailRegulation.applicableTo.size.length > 0 && (
                              <li>Taille : {detailRegulation.applicableTo.size.join(', ')}</li>
                            )}
                            {detailRegulation.applicableTo.criticalLevel.length > 0 && (
                              <li>Niveau critique : {detailRegulation.applicableTo.criticalLevel.join(', ')}</li>
                            )}
                          </ul>
                        </>
                      )}
                      {detailRegulation.implementationDeadline && (
                        <p><strong>Date limite de mise en œuvre :</strong> {detailRegulation.implementationDeadline}</p>
                      )}
                      {detailRegulation.links && detailRegulation.links.length > 0 && (
                        <>
                          <h2>Liens utiles</h2>
                          <ul>
                            {detailRegulation.links.map((link, index) => (
                              <li key={index}>
                                <a href={link.url} target="_blank" rel="noopener noreferrer">{link.label}</a>
                              </li>
                            ))}
                          </ul>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </dialog>
      )}
    </>
  );
}
