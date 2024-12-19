import React from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange }) => {
  const getPageNumbers = () => {
    const pages = [];
    const showEllipsis = totalPages > 7;
    
    if (!showEllipsis) {
      for (let i = 1; i <= totalPages; i++) {
        pages.push(i);
      }
    } else {
      if (currentPage <= 4) {
        for (let i = 1; i <= 5; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      } else if (currentPage >= totalPages - 3) {
        pages.push(1);
        pages.push('...');
        for (let i = totalPages - 4; i <= totalPages; i++) {
          pages.push(i);
        }
      } else {
        pages.push(1);
        pages.push('...');
        for (let i = currentPage - 1; i <= currentPage + 1; i++) {
          pages.push(i);
        }
        pages.push('...');
        pages.push(totalPages);
      }
    }
    
    return pages;
  };

  return (
    <nav 
      className="fr-pagination" 
      role="navigation" 
      aria-label="Pagination"
      style={{ 
        display: 'inline-flex',
        backgroundColor: '#1e1e1e',
        padding: '0.5rem',
        borderRadius: '8px',
        boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
      }}
    >
      <ul className="fr-pagination__list" style={{ gap: '0.5rem', display: 'flex', alignItems: 'center' }}>
        <li>
          <button
            className="fr-pagination__link fr-pagination__link--first"
            onClick={() => onPageChange(1)}
            disabled={currentPage === 1}
            aria-disabled={currentPage === 1}
            style={{
              opacity: currentPage === 1 ? 0.5 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            <span className="fr-pagination__label">Premier</span>
          </button>
        </li>
        <li>
          <button
            className="fr-pagination__link fr-pagination__link--prev"
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            aria-disabled={currentPage === 1}
            style={{
              opacity: currentPage === 1 ? 0.5 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            <span className="fr-pagination__label">Précédent</span>
          </button>
        </li>
        
        {getPageNumbers().map((page, index) => (
          <li key={index}>
            {page === '...' ? (
              <span className="fr-pagination__link">...</span>
            ) : (
              <button
                className={`fr-pagination__link ${currentPage === page ? 'fr-pagination__link--active' : ''}`}
                onClick={() => typeof page === 'number' && onPageChange(page)}
                aria-current={currentPage === page ? 'page' : undefined}
                style={{
                  backgroundColor: currentPage === page ? '#000091' : 'transparent',
                  color: currentPage === page ? '#fff' : undefined,
                  borderRadius: '4px',
                  transition: 'all 0.2s ease',
                  minWidth: '2.5rem',
                  height: '2.5rem',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {page}
              </button>
            )}
          </li>
        ))}

        <li>
          <button
            className="fr-pagination__link fr-pagination__link--next"
            onClick={() => onPageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            aria-disabled={currentPage === totalPages}
            style={{
              opacity: currentPage === totalPages ? 0.5 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            <span className="fr-pagination__label">Suivant</span>
          </button>
        </li>
        <li>
          <button
            className="fr-pagination__link fr-pagination__link--last"
            onClick={() => onPageChange(totalPages)}
            disabled={currentPage === totalPages}
            aria-disabled={currentPage === totalPages}
            style={{
              opacity: currentPage === totalPages ? 0.5 : 1,
              transition: 'all 0.2s ease'
            }}
          >
            <span className="fr-pagination__label">Dernier</span>
          </button>
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
