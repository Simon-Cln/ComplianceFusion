import React, { useState, useEffect } from 'react';

interface Update {
  id: string;
  title: string;
  description: string;
  date: string;
  type: 'new' | 'update' | 'deadline';
  regulationId?: string;
}

// Simulated updates data
const mockUpdates: Update[] = [
  {
    id: '1',
    title: 'Nouvelle échéance NIS 2',
    description: 'La date limite de mise en conformité avec la directive NIS 2 approche (17 octobre 2024).',
    date: '2024-01-15',
    type: 'deadline',
    regulationId: 'nis2'
  },
  {
    id: '2',
    title: 'Mise à jour RGPD',
    description: 'Nouvelles recommandations de la CNIL concernant les transferts de données hors UE.',
    date: '2024-01-10',
    type: 'update',
    regulationId: 'rgpd'
  },
  {
    id: '3',
    title: 'Nouvelle certification cybersécurité',
    description: 'Une nouvelle certification française de cybersécurité sera disponible en 2024.',
    date: '2024-01-05',
    type: 'new'
  }
];

const UpdateNotifications: React.FC = () => {
  const [updates, setUpdates] = useState<Update[]>([]);
  const [showNotifications, setShowNotifications] = useState(false);
  const [unreadCount, setUnreadCount] = useState(0);

  useEffect(() => {
    // Simuler la récupération des mises à jour
    setUpdates(mockUpdates);
    const readUpdates = JSON.parse(localStorage.getItem('readUpdates') || '[]');
    setUnreadCount(mockUpdates.length - readUpdates.length);
  }, []);

  const markAsRead = (updateId: string) => {
    const readUpdates = JSON.parse(localStorage.getItem('readUpdates') || '[]');
    if (!readUpdates.includes(updateId)) {
      const newReadUpdates = [...readUpdates, updateId];
      localStorage.setItem('readUpdates', JSON.stringify(newReadUpdates));
      setUnreadCount(prev => Math.max(0, prev - 1));
    }
  };

  const getUpdateIcon = (type: Update['type']) => {
    switch (type) {
      case 'new':
        return 'fr-icon-add-line';
      case 'update':
        return 'fr-icon-refresh-line';
      case 'deadline':
        return 'fr-icon-timer-line';
      default:
        return 'fr-icon-notification-line';
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
  };

  return (
    <div className="fr-notifications" style={{ position: 'fixed', top: '1rem', right: '1rem', zIndex: 1000 }}>
      <button
        className="fr-btn fr-btn--tertiary fr-btn--icon-left fr-icon-notification-line"
        onClick={() => setShowNotifications(!showNotifications)}
        aria-controls="notifications-panel"
        aria-expanded={showNotifications}
      >
        Notifications
        {unreadCount > 0 && (
          <span className="fr-badge fr-badge--error fr-ml-1w">
            {unreadCount}
          </span>
        )}
      </button>

      {showNotifications && (
        <div
          className="fr-collapse fr-background-default--grey fr-p-2w"
          id="notifications-panel"
          style={{
            position: 'absolute',
            right: 0,
            top: '100%',
            width: '400px',
            maxHeight: '500px',
            overflowY: 'auto',
            boxShadow: '0 4px 12px rgba(0,0,0,.1)'
          }}
        >
          <h6 className="fr-h6">Mises à jour réglementaires</h6>
          
          {updates.length === 0 ? (
            <p className="fr-text--sm fr-mb-0">Aucune nouvelle mise à jour</p>
          ) : (
            <ul className="fr-list fr-list--unstyled">
              {updates.map(update => (
                <li 
                  key={update.id}
                  className="fr-p-2w fr-mb-1w fr-background-default"
                  style={{ borderRadius: '4px' }}
                >
                  <div className="fr-grid-row fr-grid-row--gutters fr-grid-row--middle">
                    <div className="fr-col-1">
                      <span className={getUpdateIcon(update.type)} aria-hidden="true"></span>
                    </div>
                    <div className="fr-col">
                      <h6 className="fr-h6 fr-mb-0">{update.title}</h6>
                      <p className="fr-text--sm fr-mb-1w">{update.description}</p>
                      <p className="fr-text--xs fr-mb-0">
                        {formatDate(update.date)}
                      </p>
                    </div>
                    <div className="fr-col-auto">
                      <button
                        className="fr-btn fr-btn--sm fr-btn--tertiary"
                        onClick={() => markAsRead(update.id)}
                      >
                        Marquer comme lu
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default UpdateNotifications;
