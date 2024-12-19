import React, { useState } from 'react';

const Header = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    document.documentElement.classList.toggle('fr-theme-dark');
  };

  return (
    <header role="banner" className="fr-header">
      <div className="fr-header__body">
        <div className="fr-container">
          <div className="fr-header__body-row">
            <div className="fr-header__brand fr-enlarge-link">
              <div className="fr-header__service">
                <p className="fr-header__service-title">
                  Cyber Réglementation
                </p>
                <p className="fr-header__service-tagline">Guide des normes et réglementations cybersécurité</p>
              </div>
            </div>
            <div className="fr-header__tools">
              <div className="fr-header__tools-links">
                <ul className="fr-links-group">
                  <li>
                    <a className="fr-link fr-fi-arrow-right-line fr-link--icon-right" href="#dashboard">
                      Tableau de bord
                    </a>
                  </li>
                  <li>
                    <a className="fr-link fr-fi-search-line fr-link--icon-right" href="#search">
                      Recherche
                    </a>
                  </li>
                  <li>
                    <a className="fr-link fr-fi-questionnaire-line fr-link--icon-right" href="#questionnaire">
                      Questionnaire
                    </a>
                  </li>
                  <li>
                    <button 
                      className={`fr-btn fr-btn--tertiary fr-fi-theme-fill fr-btn--icon-right ${isDarkMode ? 'fr-btn--active' : ''}`}
                      onClick={toggleTheme}
                      aria-label={isDarkMode ? 'Activer le mode clair' : 'Activer le mode sombre'}
                    >
                      {isDarkMode ? 'Mode clair' : 'Mode sombre'}
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
