import React, { useState, useEffect } from 'react';
import { regulations, Regulation } from '../data/regulations';

interface SearchBarProps {
  onSearchResults: (results: Regulation[]) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ onSearchResults }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<Regulation[]>(regulations);

  useEffect(() => {
    const results = regulations.filter(reg => {
      // Filtre de recherche textuelle
      const searchMatch = 
        reg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        reg.keyPoints.some(point => point.toLowerCase().includes(searchTerm.toLowerCase()));

      return searchMatch;
    });

    setSearchResults(results);
    // Appeler onSearchResults seulement si les résultats ont changé
    if (JSON.stringify(results) !== JSON.stringify(searchResults)) {
      onSearchResults(results);
    }
  }, [searchTerm]);

  return (
    <div className="fr-container">
      <div className="fr-grid-row fr-grid-row--gutters fr-mb-3w">
        <div className="fr-col-12">
          <div className="fr-search-bar" role="search">
            <input
              className="fr-input"
              type="search"
              id="search-input"
              name="search-input"
              placeholder="Rechercher une réglementation..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;
