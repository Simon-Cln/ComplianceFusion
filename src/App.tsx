import { useState } from 'react';
import { regulations, Regulation } from './data/regulations';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import { GuidedQuestionnaire } from './components/GuidedQuestionnaire';
import RegulationDetails from './components/RegulationDetails';
import ComplianceDashboard from './components/ComplianceDashboard';
import RegulationList from './components/RegulationList';
import './App.css';
import './styles/modal.css';
import Dashboard from './components/Dashboard';

interface AccordionSectionProps {
  id: string;
  title: string;
  content: JSX.Element;
  expanded: boolean;
  onToggle: (id: string) => void;
}

function AccordionSection({ id, title, content, expanded, onToggle }: AccordionSectionProps) {
  return (
    <section className="fr-accordion">
      <h3 className="fr-accordion__title">
        <button
          className="fr-accordion__btn"
          onClick={() => onToggle(id)}
          aria-expanded={expanded}
          aria-controls={`panel-${id}`}
        >
          {title}
        </button>
      </h3>
      <div
        id={`panel-${id}`}
        className={`fr-collapse ${expanded ? 'fr-collapse--expanded' : ''}`}
        aria-hidden={!expanded}
      >
        <div className="fr-card fr-card--grey fr-p-3w">
          <div className="fr-card__body">
            <div className="fr-card__content">
              {content}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function HomeAccordion() {
  const [expandedAccordion, setExpandedAccordion] = useState<string | null>(null);

  const sections = [
    {
      id: 'search',
      title: 'Recherche rapide',
      content: (
        <>
          <h4 className="fr-card__title">Notre moteur de recherche intelligent</h4>
          <p className="fr-card__desc fr-text--lg fr-mb-2w">
            Trouvez rapidement les réglementations qui vous concernent :
          </p>
          <ul className="fr-list fr-list--bullet fr-mb-2w">
            <li>Rechercher par mots-clés spécifiques</li>
            <li>Filtrer par secteur d'activité</li>
            <li>Accéder aux détails complets de chaque réglementation</li>
            <li>Trouver rapidement les réglementations pertinentes</li>
          </ul>
          <p className="fr-card__detail fr-text--sm">
            Idéal pour les utilisateurs sachant déjà ce qu'ils recherchent.
          </p>
        </>
      )
    },
    {
      id: 'questionnaire',
      title: 'Questionnaire guidé',
      content: (
        <>
          <h4 className="fr-card__title">Questionnaire personnalisé</h4>
          <p className="fr-card__desc fr-text--lg fr-mb-2w">
            Déterminez précisément les réglementations applicables à votre organisation :
          </p>
          <ul className="fr-list fr-list--bullet fr-mb-2w">
            <li>Répondez à quelques questions simples sur votre structure</li>
            <li>Spécifiez votre secteur d'activité et votre taille</li>
            <li>Indiquez votre dépendance aux systèmes d'information</li>
            <li>Obtenez une liste personnalisée des normes pertinentes</li>
          </ul>
          <p className="fr-card__detail fr-text--sm">
            Recommandé pour les nouveaux utilisateurs.
          </p>
        </>
      )
    },
    {
      id: 'dashboard',
      title: 'Tableau de bord',
      content: (
        <>
          <h4 className="fr-card__title">Centre de contrôle</h4>
          <p className="fr-card__desc fr-text--lg fr-mb-2w">
            Pilotez efficacement votre conformité réglementaire :
          </p>
          <ul className="fr-list fr-list--bullet fr-mb-2w">
            <li>Visualisez votre niveau global de conformité</li>
            <li>Suivez l'avancement de chaque réglementation</li>
            <li>Identifiez les actions prioritaires</li>
            <li>Consultez des statistiques et rapports</li>
            <li>Planifiez vos prochaines étapes de mise en conformité</li>
          </ul>
          <p className="fr-card__detail fr-text--sm">
            Idéal pour un suivi continu de votre conformité.
          </p>
        </>
      )
    }
  ];

  const handleToggle = (id: string) => {
    setExpandedAccordion(expandedAccordion === id ? null : id);
  };

  return (
    <div className="fr-accordions-group">
      {sections.map((section) => (
        <AccordionSection
          key={section.id}
          id={section.id}
          title={section.title}
          content={section.content}
          expanded={expandedAccordion === section.id}
          onToggle={handleToggle}
        />
      ))}
    </div>
  );
}

function App() {
  const [selectedRegulation, setSelectedRegulation] = useState<Regulation | null>(null);
  const [applicableRegulations, setApplicableRegulations] = useState<Regulation[]>(regulations);
  const [filteredRegulations, setFilteredRegulations] = useState<Regulation[]>([]);
  const [activeTab, setActiveTab] = useState<'home' | 'search' | 'questionnaire' | 'dashboard'>('home');

  // Statistiques pour la page d'accueil
  const stats = {
    totalRegulations: regulations.length,
    sectorsCount: new Set(regulations.flatMap(r => r.applicableTo.sector)).size,
    updatedThisMonth: regulations.filter(r => {
      const lastUpdate = new Date(r.lastUpdate);
      const now = new Date();
      return lastUpdate.getMonth() === now.getMonth() && lastUpdate.getFullYear() === now.getFullYear();
    }).length
  };

  const handleSearchResults = (results: Regulation[]) => {
    setApplicableRegulations(results);
  };

  const handleQuestionnaireComplete = (results: { employeeSize: string; itDependency: string; budget: string }) => {
    const filtered = regulations.filter(reg => {
      const sizeMatch = !results.employeeSize ||
        reg.applicableTo.size.some(size => size.toLowerCase().includes(results.employeeSize.toLowerCase()));
      const criticalMatch = !results.itDependency ||
        reg.applicableTo.criticalLevel.some(level => level.toLowerCase().includes(results.itDependency.toLowerCase()));
      const budgetMatch = !results.budget ||
        reg.estimatedCost.toLowerCase().includes(results.budget.toLowerCase());
      return sizeMatch && criticalMatch && budgetMatch;
    });
    setApplicableRegulations(filtered);
  };

  const handleRegulationClick = (regulation: Regulation) => {
    setSelectedRegulation(regulation);
  };

  const renderHomePage = () => (
    <div className="fr-container fr-py-4w">
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12">
          <div className="fr-card fr-card--horizontal fr-card--grey fr-card--no-border">
            <div className="fr-card__body">
              <h2 className="fr-card__title">Bienvenue sur Cyber Réglementation</h2>
              <p className="fr-card__desc">
                Votre guide complet pour comprendre et appliquer les normes de cybersécurité.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="fr-grid-row fr-grid-row--gutters fr-mt-4w">
        <div className="fr-col-md-4">
          <div className="fr-card fr-card--grey">
            <div className="fr-card__body">
              <h3 className="fr-card__title fr-h5">{stats.totalRegulations}</h3>
              <p className="fr-card__desc">Réglementations disponibles</p>
            </div>
          </div>
        </div>
        <div className="fr-col-md-4">
          <div className="fr-card fr-card--grey">
            <div className="fr-card__body">
              <h3 className="fr-card__title fr-h5">{stats.sectorsCount}</h3>
              <p className="fr-card__desc">Secteurs d'activité couverts</p>
            </div>
          </div>
        </div>
        <div className="fr-col-md-4">
          <div className="fr-card fr-card--grey">
            <div className="fr-card__body">
              <h3 className="fr-card__title fr-h5">{stats.updatedThisMonth}</h3>
              <p className="fr-card__desc">Mises à jour ce mois</p>
            </div>
          </div>
        </div>
      </div>

      <div className="fr-grid-row fr-grid-row--gutters fr-mt-4w">
        <div className="fr-col-12">
          <h2 className="fr-h4 fr-mb-4w">Comment utiliser cette plateforme ?</h2>
          <HomeAccordion />
        </div>
      </div>
    </div>
  );

  const renderActiveTab = () => {
    switch (activeTab) {
      case 'home':
        return renderHomePage();
      case 'search':
        return <SearchBar onSearchResults={handleSearchResults} />;
      case 'questionnaire':
        return (
          <div className="fr-container fr-mb-5w">
            <div className="fr-grid-row fr-grid-row--gutters">
              <div className="fr-col-12">
                <GuidedQuestionnaire
                  regulations={regulations}
                  onFilterChange={(filtered) => setFilteredRegulations(filtered)}
                />
                {filteredRegulations.length > 0 && (
                  <div className="fr-mt-4w">
                    <RegulationList
                      regulations={filteredRegulations}
                      onRegulationClick={handleRegulationClick}
                    />
                  </div>
                )}
              </div>
            </div>
          </div>
        );
      case 'dashboard':
        return <ComplianceDashboard regulations={regulations} />;
      default:
        return null;
    }
  };

  return (
    <div className="fr-background-default--grey">
      <Header />
      <main role="main" id="content">
        <nav className="fr-tabs" role="navigation" aria-label="Navigation par onglets">
          <ul className="fr-tabs__list" role="tablist">
            <li role="presentation">
              <button
                className={`fr-tabs__tab ${activeTab === 'home' ? 'fr-tabs__tab--active' : ''}`}
                onClick={() => setActiveTab('home')}
                role="tab"
                aria-selected={activeTab === 'home'}
              >
                Accueil
              </button>
            </li>
            <li role="presentation">
              <button
                className={`fr-tabs__tab ${activeTab === 'search' ? 'fr-tabs__tab--active' : ''}`}
                onClick={() => setActiveTab('search')}
                role="tab"
                aria-selected={activeTab === 'search'}
              >
                Recherche
              </button>
            </li>
            <li role="presentation">
              <button
                className={`fr-tabs__tab ${activeTab === 'questionnaire' ? 'fr-tabs__tab--active' : ''}`}
                onClick={() => setActiveTab('questionnaire')}
                role="tab"
                aria-selected={activeTab === 'questionnaire'}
              >
                Questionnaire guidé
              </button>
            </li>
            <li role="presentation">
              <button
                className={`fr-tabs__tab ${activeTab === 'dashboard' ? 'fr-tabs__tab--active' : ''}`}
                onClick={() => setActiveTab('dashboard')}
                role="tab"
                aria-selected={activeTab === 'dashboard'}
              >
                Tableau de bord
              </button>
            </li>
          </ul>
        </nav>

        {renderActiveTab()}

        {selectedRegulation && (
          <RegulationDetails
            regulation={selectedRegulation}
            onClose={() => setSelectedRegulation(null)}
          />
        )}

        {activeTab !== 'home' && activeTab !== 'questionnaire' &&  activeTab !== 'dashboard' && (
          <div className="fr-container fr-mb-4w">
            <RegulationList
              regulations={applicableRegulations}
              onRegulationClick={handleRegulationClick}
            />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
