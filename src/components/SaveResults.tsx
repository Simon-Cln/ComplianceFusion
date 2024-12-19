import React, { useState } from 'react';
import { Regulation } from '../data/regulations';

interface SaveResultsProps {
  regulations: Regulation[];
  companyProfile: {
    sector: string;
    size: string;
    criticalLevel: string;
  };
}

interface SavedAssessment {
  id: string;
  date: string;
  companyProfile: {
    sector: string;
    size: string;
    criticalLevel: string;
  };
  regulations: Regulation[];
}

const SaveResults: React.FC<SaveResultsProps> = ({ regulations, companyProfile }) => {
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [assessmentName, setAssessmentName] = useState('');
  const [savedAssessments, setSavedAssessments] = useState<SavedAssessment[]>(() => {
    const saved = localStorage.getItem('savedAssessments');
    return saved ? JSON.parse(saved) : [];
  });

  const handleSave = () => {
    if (!assessmentName.trim()) return;

    const newAssessment: SavedAssessment = {
      id: Date.now().toString(),
      date: new Date().toISOString(),
      companyProfile,
      regulations
    };

    const updatedAssessments = [...savedAssessments, newAssessment];
    setSavedAssessments(updatedAssessments);
    localStorage.setItem('savedAssessments', JSON.stringify(updatedAssessments));
    setShowSaveModal(false);
    setAssessmentName('');
  };

  const handleDelete = (id: string) => {
    const updatedAssessments = savedAssessments.filter(a => a.id !== id);
    setSavedAssessments(updatedAssessments);
    localStorage.setItem('savedAssessments', JSON.stringify(updatedAssessments));
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="fr-container fr-my-4w">
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12">
          <div className="fr-btns-group fr-btns-group--inline">
            <button
              className="fr-btn fr-btn--secondary"
              onClick={() => setShowSaveModal(true)}
            >
              Sauvegarder l'évaluation
            </button>
          </div>
        </div>

        {showSaveModal && (
          <dialog className="fr-modal" role="dialog" id="save-modal" aria-labelledby="save-modal-title">
            <div className="fr-container fr-container--fluid fr-container-md">
              <div className="fr-grid-row fr-grid-row--center">
                <div className="fr-col-12 fr-col-md-8 fr-col-lg-6">
                  <div className="fr-modal__body">
                    <div className="fr-modal__header">
                      <button
                        className="fr-btn fr-btn--close"
                        onClick={() => setShowSaveModal(false)}
                      >
                        Fermer
                      </button>
                    </div>
                    <div className="fr-modal__content">
                      <h1 id="save-modal-title" className="fr-modal__title">
                        Sauvegarder l'évaluation
                      </h1>
                      <div className="fr-input-group">
                        <label className="fr-label" htmlFor="assessment-name">
                          Nom de l'évaluation
                        </label>
                        <input
                          className="fr-input"
                          type="text"
                          id="assessment-name"
                          name="assessment-name"
                          value={assessmentName}
                          onChange={(e) => setAssessmentName(e.target.value)}
                        />
                      </div>
                      <div className="fr-btns-group fr-btns-group--inline fr-mt-2w">
                        <button
                          className="fr-btn"
                          onClick={handleSave}
                        >
                          Sauvegarder
                        </button>
                        <button
                          className="fr-btn fr-btn--secondary"
                          onClick={() => setShowSaveModal(false)}
                        >
                          Annuler
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </dialog>
        )}

        {savedAssessments.length > 0 && (
          <div className="fr-col-12">
            <h4 className="fr-h4">Évaluations sauvegardées</h4>
            <div className="fr-table">
              <table>
                <thead>
                  <tr>
                    <th>Nom</th>
                    <th>Date</th>
                    <th>Secteur</th>
                    <th>Taille</th>
                    <th>Réglementations</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {savedAssessments.map(assessment => (
                    <tr key={assessment.id}>
                      <td>{assessment.id}</td>
                      <td>{formatDate(assessment.date)}</td>
                      <td>{assessment.companyProfile.sector}</td>
                      <td>{assessment.companyProfile.size}</td>
                      <td>{assessment.regulations.length}</td>
                      <td>
                        <button
                          className="fr-btn fr-btn--tertiary fr-btn--sm"
                          onClick={() => handleDelete(assessment.id)}
                        >
                          Supprimer
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SaveResults;
