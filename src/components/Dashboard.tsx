import React, { useState } from 'react';
import SearchBar from './SearchBar';
import GuidedQuestionnaire from './GuidedQuestionnaire';
import ComplianceStats from './ComplianceStats';
import SaveResults from './SaveResults';
import UpdateNotifications from './UpdateNotifications';
import { Regulation } from '../data/regulations';

interface DashboardProps {
  onSearchResults: (results: Regulation[]) => void;
  onQuestionnaireComplete: (results: { sector: string; size: string; criticalLevel: string }) => void;
  regulations: Regulation[];
  companyProfile: {
    sector: string;
    size: string;
    criticalLevel: string;
  };
}

const Dashboard: React.FC<DashboardProps> = ({
  onSearchResults,
  onQuestionnaireComplete,
  regulations,
  companyProfile
}) => {
  const [activeTab, setActiveTab] = useState<'search' | 'questionnaire' | 'stats' | 'saved'>('search');

  return (
    <div className="fr-container fr-my-4w">
      <div className="fr-tabs">
        <ul className="fr-tabs__list" role="tablist" aria-label="Onglets">
          <li role="presentation">
            <button
              className="fr-tabs__tab"
              tabIndex={activeTab === 'search' ? 0 : -1}
              role="tab"
              aria-selected={activeTab === 'search'}
              aria-controls="panel-search"
              id="tabpanel-search"
              onClick={() => setActiveTab('search')}
            >
              Recherche
            </button>
          </li>
          <li role="presentation">
            <button
              className="fr-tabs__tab"
              tabIndex={activeTab === 'questionnaire' ? 0 : -1}
              role="tab"
              aria-selected={activeTab === 'questionnaire'}
              aria-controls="panel-questionnaire"
              id="tabpanel-questionnaire"
              onClick={() => setActiveTab('questionnaire')}
            >
              Questionnaire guidé
            </button>
          </li>
          <li role="presentation">
            <button
              className="fr-tabs__tab"
              tabIndex={activeTab === 'stats' ? 0 : -1}
              role="tab"
              aria-selected={activeTab === 'stats'}
              aria-controls="panel-stats"
              id="tabpanel-stats"
              onClick={() => setActiveTab('stats')}
            >
              Statistiques
            </button>
          </li>
          <li role="presentation">
            <button
              className="fr-tabs__tab"
              tabIndex={activeTab === 'saved' ? 0 : -1}
              role="tab"
              aria-selected={activeTab === 'saved'}
              aria-controls="panel-saved"
              id="tabpanel-saved"
              onClick={() => setActiveTab('saved')}
            >
              Évaluations sauvegardées
            </button>
          </li>
        </ul>

        <div id="panel-search" className="fr-tabs__panel fr-tabs__panel--selected" role="tabpanel" aria-labelledby="tabpanel-search" tabIndex={0} style={{ display: activeTab === 'search' ? 'block' : 'none' }}>
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12">
              <div className="fr-card fr-card--grey fr-p-3w">
                <h4 className="fr-h4">Recherche de réglementations</h4>
                <SearchBar onSearchResults={onSearchResults} />
              </div>
            </div>
          </div>
        </div>

        <div id="panel-questionnaire" className="fr-tabs__panel" role="tabpanel" aria-labelledby="tabpanel-questionnaire" tabIndex={0} style={{ display: activeTab === 'questionnaire' ? 'block' : 'none' }}>
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12">
              <div className="fr-card fr-card--grey fr-p-3w">
                <h4 className="fr-h4">Questionnaire guidé</h4>
                <GuidedQuestionnaire onQuestionnaireComplete={onQuestionnaireComplete} />
              </div>
            </div>
          </div>
        </div>

        <div id="panel-stats" className="fr-tabs__panel" role="tabpanel" aria-labelledby="tabpanel-stats" tabIndex={0} style={{ display: activeTab === 'stats' ? 'block' : 'none' }}>
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12">
              <div className="fr-card fr-card--grey fr-p-3w">
                <h4 className="fr-h4">Statistiques de conformité</h4>
                <ComplianceStats regulations={regulations} />
              </div>
            </div>
          </div>
        </div>

        <div id="panel-saved" className="fr-tabs__panel" role="tabpanel" aria-labelledby="tabpanel-saved" tabIndex={0} style={{ display: activeTab === 'saved' ? 'block' : 'none' }}>
          <div className="fr-grid-row fr-grid-row--gutters">
            <div className="fr-col-12">
              <div className="fr-card fr-card--grey fr-p-3w">
                <h4 className="fr-h4">Évaluations sauvegardées</h4>
                <SaveResults regulations={regulations} companyProfile={companyProfile} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
