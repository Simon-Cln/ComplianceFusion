import React, { useState } from 'react';
import { Regulation } from '../data/regulations';
import Pagination from './Pagination';

interface ComplianceStatus {
  status: 'CONFORME' | 'EN_COURS' | 'NON_CONFORME' | 'NON_COMMENCE';
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
  const [tempStatus, setTempStatus] = useState<ComplianceStatus['status']>('NON_COMMENCE');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 20;

  const totalPages = Math.ceil(regulations.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentRegulations = regulations.slice(startIndex, endIndex);

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

  const handleStatusUpdate = () => {
    if (selectedRegulation && detailRegulation) {
      onStatusUpdate(detailRegulation.id, tempStatus, notes);
      setSelectedRegulation(null);
      setDetailRegulation(null);
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
            {currentRegulations.map((regulation) => (
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
                  onClick={() => {
                    setSelectedRegulation(regulation.id);
                    setDetailRegulation(regulation);
                    setTempStatus(complianceStatus[regulation.id]?.status || 'NON_COMMENCE');
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

      {totalPages > 1 && (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '2rem' }}>
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={setCurrentPage}
          />
        </div>
      )}

      {selectedRegulation && (
        <div className="fr-modal fr-modal--opened" role="dialog" id="fr-modal-1" aria-labelledby="fr-modal-title-modal-1">
          <div className="fr-modal__overlay" onClick={() => setSelectedRegulation(null)}></div>
          <div className="fr-container fr-container--fluid fr-container-md">
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
                      <label className="fr-label" htmlFor="select-status">Statut</label>
                      <select
                        className="fr-select"
                        id="select-status"
                        name="select-status"
                        value={tempStatus}
                        onChange={(e) => setTempStatus(e.target.value)}
                      >
                        <option value="NON_COMMENCE">Non commencé</option>
                        <option value="EN_COURS">En cours</option>
                        <option value="CONFORME">Conforme</option>
                        <option value="NON_CONFORME">Non conforme</option>
                      </select>
                    </div>
                    <div className="fr-form-group">
                      <label className="fr-label" htmlFor="textarea-notes">Notes</label>
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
        </div>
      )}

    </>
  );
}
