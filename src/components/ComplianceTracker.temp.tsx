import React, { useState } from 'react';
import { Regulation } from '../data/regulations';

interface ComplianceStatus {
  status: 'not_started' | 'in_progress' | 'compliant' | 'non_compliant';
  notes?: string;
  lastUpdated: Date;
}

interface ComplianceTrackerProps {
  regulations: Regulation[];
  complianceStatus: Record<string, any>;
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
            {regulations.map(regulation => (
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
                    {regulation.description.length > 100
                      ? `${regulation.description.substring(0, 100)}...`
                      : regulation.description}
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
                  {complianceStatus[regulation.id]?.lastUpdate
                    ? formatDate(complianceStatus[regulation.id].lastUpdate)
                    : '-'}
                </td>
                <td>
                  <button
                    className="fr-btn fr-btn--sm fr-btn--tertiary fr-btn--icon-left fr-icon-edit-line"
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

      {/* Modal de mise à jour */}
      {selectedRegulation && (
        <dialog className="fr-modal" role="dialog" id="update-status-modal" open>
          <div className="fr-container fr-container--fluid fr-container-md">
            <div className="fr-grid-row fr-grid-row--center">
              <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
                <div className="fr-modal__body">
                  <div className="fr-modal__header">
                    <button className="fr-btn fr-btn--close" onClick={() => setSelectedRegulation(null)}>
                      Fermer
                    </button>
                  </div>
                  <div className="fr-modal__content">
                    <h1 className="fr-modal__title">
                      <span className="fr-icon-edit-line fr-icon--lg" aria-hidden="true"></span>
                      Mise à jour du statut
                    </h1>
                    <div className="fr-form-group">
                      <fieldset className="fr-fieldset">
                        <legend className="fr-fieldset__legend">Statut de conformité</legend>
                        <div className="fr-fieldset__content">
                          <div className="fr-radio-group fr-radio-rich">
                            {(['not_started', 'in_progress', 'compliant', 'non_compliant'] as const).map(status => (
                              <div key={status} className="fr-radio-rich__container">
                                <input
                                  type="radio"
                                  id={status}
                                  name="status"
                                  value={status}
                                  checked={tempStatus === status}
                                  onChange={(e) => setTempStatus(e.target.value as ComplianceStatus['status'])}
                                />
                                <label className="fr-label" htmlFor={status}>
                                  {getStatusLabel(status)}
                                  <span className="fr-hint-text">
                                    {status === 'compliant' && 'La réglementation est entièrement respectée'}
                                    {status === 'in_progress' && 'Des actions sont en cours pour se conformer'}
                                    {status === 'non_compliant' && 'Des actions correctives sont nécessaires'}
                                    {status === 'not_started' && 'L\'évaluation n\'a pas encore commencé'}
                                  </span>
                                </label>
                              </div>
                            ))}
                          </div>
                        </div>
                      </fieldset>
                    </div>
                    <div className="fr-form-group">
                      <label className="fr-label" htmlFor="notes">
                        Notes et commentaires
                        <span className="fr-hint-text">Ajoutez des détails sur l'état de conformité</span>
                      </label>
                      <textarea
                        className="fr-input"
                        id="notes"
                        name="notes"
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="fr-modal__footer">
                    <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse">
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

      {/* Modal de détail */}
      {detailRegulation && (
        <dialog className="fr-modal" role="dialog" id="regulation-detail-modal" open>
          <div className="fr-container fr-container--fluid fr-container-md">
            <div className="fr-grid-row fr-grid-row--center">
              <div className="fr-col-12 fr-col-md-10 fr-col-lg-8">
                <div className="fr-modal__body">
                  <div className="fr-modal__header">
                    <button className="fr-btn fr-btn--close" onClick={() => setDetailRegulation(null)}>
                      Fermer
                    </button>
                  </div>
                  <div className="fr-modal__content">
                    <h1 className="fr-modal__title">
                      <span className="fr-icon-article-line fr-icon--lg" aria-hidden="true"></span>
                      {detailRegulation.name}
                    </h1>

                    <div className="fr-grid-row fr-grid-row--gutters">
                      <div className="fr-col-12">
                        <div className="fr-card fr-card--grey fr-card--no-border">
                          <div className="fr-card__body">
                            <div className="fr-card__content">
                              <h3>Description</h3>
                              <p>{detailRegulation.description}</p>
                              
                              <h3>Points clés</h3>
                              <ul className="fr-list">
                                {detailRegulation.keyPoints?.map((point, index) => (
                                  <li key={index}>{point}</li>
                                ))}
                              </ul>

                              <h3>Applicabilité</h3>
                              <p>{detailRegulation.applicability}</p>

                              <h3>Statut actuel</h3>
                              <div className="fr-highlight">
                                <p>
                                  <span className={`fr-badge ${getStatusColor(
                                    complianceStatus[detailRegulation.id]?.status || 'not_started'
                                  )}`}>
                                    {getStatusLabel(complianceStatus[detailRegulation.id]?.status || 'not_started')}
                                  </span>
                                  {complianceStatus[detailRegulation.id]?.lastUpdate && (
                                    <span className="fr-ml-2w">
                                      Dernière mise à jour : {formatDate(complianceStatus[detailRegulation.id].lastUpdate)}
                                    </span>
                                  )}
                                </p>
                                {complianceStatus[detailRegulation.id]?.notes && (
                                  <div className="fr-text--sm fr-mt-2w">
                                    <strong>Notes :</strong>
                                    <p>{complianceStatus[detailRegulation.id].notes}</p>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="fr-modal__footer">
                    <ul className="fr-btns-group fr-btns-group--right fr-btns-group--inline-reverse">
                      <li>
                        <button
                          className="fr-btn"
                          onClick={() => {
                            setDetailRegulation(null);
                            setSelectedRegulation(detailRegulation.id);
                            setTempStatus(complianceStatus[detailRegulation.id]?.status || 'not_started');
                            setNotes(complianceStatus[detailRegulation.id]?.notes || '');
                          }}
                        >
                          Mettre à jour le statut
                        </button>
                      </li>
                      <li>
                        <button className="fr-btn fr-btn--secondary" onClick={() => setDetailRegulation(null)}>
                          Fermer
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
    </>
  );
}
