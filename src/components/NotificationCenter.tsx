import React from 'react';

interface Notification {
  id: number;
  type: string;
  title: string;
  message: string;
  timestamp: string;
  read: boolean;
}

interface NotificationCenterProps {
  notifications: Notification[];
  onNotificationRead: (id: number) => void;
}

export default function NotificationCenter({ 
  notifications,
  onNotificationRead 
}: NotificationCenterProps) {
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return new Intl.DateTimeFormat('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date);
  };

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'status_update':
        return 'fr-icon-refresh-line';
      case 'deadline':
        return 'fr-icon-time-line';
      case 'alert':
        return 'fr-icon-alert-line';
      default:
        return 'fr-icon-notification-line';
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'status_update':
        return 'fr-background-action-high-blue-france';
      case 'deadline':
        return 'fr-background-warning-yellow-tournesol';
      case 'alert':
        return 'fr-background-error-red-marianne';
      default:
        return 'fr-background-default-grey';
    }
  };

  return (
    <div className="fr-card fr-card--no-border">
      <div className="fr-card__body">
        <div className="fr-card__content">
          <h3 className="fr-card__title">
            <span className="fr-icon-notification-line fr-icon--lg fr-mr-1w"></span>
            Notifications
            {notifications.filter(n => !n.read).length > 0 && (
              <span className="fr-badge fr-badge--sm fr-badge--error fr-ml-1w">
                {notifications.filter(n => !n.read).length}
              </span>
            )}
          </h3>

          <div className="fr-notifications-group">
            {notifications.length === 0 ? (
              <div className="fr-alert fr-alert--info">
                <p>Aucune notification pour le moment.</p>
              </div>
            ) : (
              notifications.map((notification) => (
                <div
                  key={notification.id}
                  className={`fr-alert fr-mb-2w ${
                    notification.read ? 'fr-alert--info' : 'fr-alert--warning'
                  }`}
                  role="alert"
                >
                  <div className="fr-grid-row fr-grid-row--middle">
                    <div className="fr-col-auto">
                      <span 
                        className={`fr-icon-md ${getNotificationIcon(notification.type)} ${
                          getNotificationColor(notification.type)
                        }`}
                      ></span>
                    </div>
                    <div className="fr-col">
                      <h6 className="fr-alert__title">{notification.title}</h6>
                      <p className="fr-text--sm fr-mb-0">{notification.message}</p>
                      <p className="fr-text--xs fr-mb-0 fr-mt-1v">
                        {formatDate(notification.timestamp)}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="fr-col-auto">
                        <button
                          className="fr-btn fr-btn--tertiary fr-btn--sm fr-btn--icon-left fr-icon-checkbox-circle-line"
                          onClick={() => onNotificationRead(notification.id)}
                          title="Marquer comme lu"
                        >
                          Lu
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))
            )}
          </div>

          {notifications.length > 0 && (
            <div className="fr-grid-row fr-grid-row--center fr-mt-2w">
              <div className="fr-col-auto">
                <button
                  className="fr-btn fr-btn--tertiary fr-btn--sm"
                  onClick={() => notifications
                    .filter(n => !n.read)
                    .forEach(n => onNotificationRead(n.id))
                  }
                >
                  Tout marquer comme lu
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
