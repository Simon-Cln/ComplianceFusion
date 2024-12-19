import React, { useState, useRef, useEffect } from 'react';
import { Regulation } from '../data/new_regulations';

interface ComplianceStatus {
  status: 'NON_COMMENCE' | 'EN_COURS' | 'CONFORME' | 'NON_CONFORME';
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
  const modalRef = useRef<HTMLDialogElement>(null);
  const [selectedRegulation, setSelectedRegulation] = useState<string | null>(null);
  const [detailRegulation, setDetailRegulation] = useState<Regulation | null>(null);
  const [notes, setNotes] = useState('');
  const [tempStatus, setTempStatus] = useState<ComplianceStatus['status']>('NON_COMMENCE');

  useEffect(() => {
    if (selectedRegulation && modalRef.current) {
      modalRef.current.showModal();
    }
  }, [selectedRegulation]);

  const handleOpenModal = (index: string) => {
    console.log('ComplianceTracker - handleOpenModal appelé avec index:', index);
    console.log('État actuel:', complianceStatus[index]);
    setSelectedRegulation(index);
    setTempStatus(complianceStatus[index]?.status || 'NON_COMMENCE');
    setNotes(complianceStatus[index]?.notes || '');
  };
  

  const handleCloseModal = () => {
    if (modalRef.current) {
      modalRef.current.close();
    }
    setSelectedRegulation(null);
    setNotes('');
  };

  const handleStatusUpdate = () => {
    console.log('ComplianceTracker - handleStatusUpdate appelé');
    console.log('selectedRegulation:', selectedRegulation);
    console.log('tempStatus:', tempStatus);
    console.log('notes:', notes);
    if (selectedRegulation) {
      onStatusUpdate(selectedRegulation, tempStatus, notes);
      handleCloseModal();
    }
  };

  const getStatusColor = (status: ComplianceStatus['status']) => {
    switch (status) {
      case 'CONFORME':
        return 'fr-badge--success';
      case 'EN_COURS':
        return 'fr-badge--warning';
      case 'NON_CONFORME':
        return 'fr-badge--error';
      default:
        return 'fr-badge--info';
    }
  };
  
  const getStatusLabel = (status: ComplianceStatus['status']) => {
    switch (status) {
      case 'CONFORME':
        return 'Conforme';
      case 'EN_COURS':
        return 'En cours';
      case 'NON_CONFORME':
        return 'Non conforme';
      default:
        return 'Non commencé';
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
                    {regulation.context && regulation.context.length > 100
                      ? `${regulation.context.substring(0, 100)}...`
                      : regulation.context || 'Aucune description disponible'}
                  </p>
                </td>
                <td>
                  <span className={`fr-badge ${getStatusColor(
                    complianceStatus[regulation.id]?.status || 'NON_COMMENCE'
                  )}`}>
                    {getStatusLabel(complianceStatus[regulation.id]?.status || 'NON_COMMENCE')}
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
                    onClick={() => handleOpenModal(regulation.id.toString())}
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
        <dialog 
          ref={modalRef}
          className="fr-modal" 
          role="dialog" 
          id="fr-modal-1" 
          aria-labelledby="fr-modal-title-modal-1"
        >
          <div className="fr-container fr-container--fluid fr-container-md">
            <div className="fr-grid-row fr-grid-row--center">
              <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
                <div className="fr-modal__body">
                  <div className="fr-modal__header">
                    <button className="fr-link--close fr-link" onClick={handleCloseModal}>
                      Fermer
                    </button>
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
                        <option value="NON_COMMENCE">Non commencé</option>
                        <option value="EN_COURS">En cours</option>
                        <option value="CONFORME">Conforme</option>
                        <option value="NON_CONFORME">Non conforme</option>
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
                        <button className="fr-btn fr-btn--secondary" onClick={handleCloseModal}>
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
                    <button className="fr-link--close fr-link" onClick={() => setDetailRegulation(null)}>
                      Fermer
                    </button>
                  </div>
                  <div className="fr-modal__content">
                    <h1 id="fr-modal-title-modal-2" className="fr-modal__title">
                      {detailRegulation.name}
                    </h1>
                    <div className="fr-text--sm">
                      <p>{detailRegulation.context || 'Aucune description disponible'}</p>
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
