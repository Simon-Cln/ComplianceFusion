import React, { useState, useEffect } from 'react';

interface RegulationFiltersProps {
  onFilter: (filters: {
    status?: string;
    search?: string;
    deadline?: string;
  }) => void;
}

export default function RegulationFilters({ onFilter }: RegulationFiltersProps) {
  const [filters, setFilters] = useState({
    status: '',
    search: '',
    deadline: ''
  });

  useEffect(() => {
    onFilter(filters);
  }, [filters, onFilter]);

  const handleFilterChange = (field: string, value: string) => {
    setFilters(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleReset = () => {
    setFilters({
      status: '',
      search: '',
      deadline: ''
    });
  };

  return (
    <div className="fr-card fr-card--no-border">
      <div className="fr-card__body">
        <div className="fr-card__content">
          <h3 className="fr-card__title">
            <span className="fr-icon-filter-line fr-icon--lg fr-mr-1w"></span>
            Filtres
          </h3>
          
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12 fr-col-md-4">
              <div className="fr-select-group">
                <label className="fr-label" htmlFor="status-select">
                  Statut de conformité
                </label>
                <select
                  className="fr-select"
                  id="status-select"
                  name="status"
                  value={filters.status}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                >
                  <option value="">Tous les statuts</option>
                  <option value="compliant">Conforme</option>
                  <option value="in_progress">En cours</option>
                  <option value="non_compliant">Non conforme</option>
                  <option value="not_started">Non commencé</option>
                </select>
              </div>
            </div>

            <div className="fr-col-12 fr-col-md-4">
              <div className="fr-select-group">
                <label className="fr-label" htmlFor="deadline-select">
                  Échéance
                </label>
                <select
                  className="fr-select"
                  id="deadline-select"
                  name="deadline"
                  value={filters.deadline}
                  onChange={(e) => handleFilterChange('deadline', e.target.value)}
                >
                  <option value="">Toutes les échéances</option>
                  <option value="overdue">En retard</option>
                  <option value="upcoming">À venir (30 jours)</option>
                  <option value="future">Future (&gt; 30 jours)</option>
                </select>
              </div>
            </div>

            <div className="fr-col-12 fr-col-md-4">
              <div className="fr-input-group">
                <label className="fr-label" htmlFor="search-input">
                  Rechercher
                </label>
                <input
                  className="fr-input"
                  type="text"
                  id="search-input"
                  name="search"
                  value={filters.search}
                  onChange={(e) => handleFilterChange('search', e.target.value)}
                  placeholder="Nom ou description..."
                />
              </div>
            </div>
          </div>

          <div className="fr-grid-row fr-grid-row--right fr-mt-2w">
            <div className="fr-col-auto">
              <button
                className="fr-btn fr-btn--secondary fr-btn--sm"
                onClick={handleReset}
              >
                Réinitialiser les filtres
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
