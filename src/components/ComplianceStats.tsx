import React, { useState } from 'react';
import { Regulation } from '../data/regulations';

interface ComplianceStatsProps {
  regulations: Regulation[];
}

interface StatCard {
  title: string;
  value: number;
  total: number;
  color: string;
  icon: string;
}

const ComplianceStats: React.FC<ComplianceStatsProps> = ({ regulations }) => {
  const [selectedView, setSelectedView] = useState<'general' | 'costs' | 'timeline'>('general');

  const totalRegulations = regulations.length;
  const mandatoryRegulations = regulations.filter(r => r.complianceLevel === 'obligatoire').length;
  const recommendedRegulations = regulations.filter(r => r.complianceLevel === 'recommande').length;

  const costBreakdown = {
    faible: regulations.filter(r => r.estimatedCost === 'faible').length,
    moyen: regulations.filter(r => r.estimatedCost === 'moyen').length,
    eleve: regulations.filter(r => r.estimatedCost === 'eleve').length,
  };

  const getPercentage = (value: number) => {
    return totalRegulations > 0 ? Math.round((value / totalRegulations) * 100) : 0;
  };

  const statCards: StatCard[] = [
    {
      title: 'Réglementations obligatoires',
      value: mandatoryRegulations,
      total: totalRegulations,
      color: '#000091',
      icon: 'fr-icon-check-line'
    },
    {
      title: 'Réglementations recommandées',
      value: recommendedRegulations,
      total: totalRegulations,
      color: '#6a6af4',
      icon: 'fr-icon-star-line'
    },
    {
      title: 'Coût de mise en conformité élevé',
      value: costBreakdown.eleve,
      total: totalRegulations,
      color: '#e1000f',
      icon: 'fr-icon-money-euro-circle-line'
    }
  ];

  const renderStatCard = (card: StatCard) => (
    <div className="fr-col-12 fr-col-md-4">
      <div className="fr-card fr-card--no-border">
        <div className="fr-card__body">
          <div className="fr-card__content">
            <div className="fr-grid-row fr-grid-row--middle">
              <div className="fr-col-auto">
                <span 
                  className={card.icon}
                  style={{ fontSize: '2rem', color: card.color }}
                  aria-hidden="true"
                ></span>
              </div>
              <div className="fr-col">
                <h4 className="fr-card__title fr-mb-0">{card.title}</h4>
                <p className="fr-text--lg fr-mb-0">
                  <span style={{ color: card.color }}>{card.value}</span>
                  <span className="fr-text--sm fr-ml-1w">sur {card.total}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="fr-container fr-my-4w">
      <div className="fr-grid-row fr-grid-row--gutters fr-mb-3w">
        {statCards.map((card, index) => (
          <React.Fragment key={index}>
            {renderStatCard(card)}
          </React.Fragment>
        ))}
      </div>

      <div className="fr-tabs">
        <ul className="fr-tabs__list" role="tablist">
          <li role="presentation">
            <button
              className={`fr-tabs__tab ${selectedView === 'general' ? 'fr-tabs__tab--active' : ''}`}
              onClick={() => setSelectedView('general')}
              role="tab"
              aria-selected={selectedView === 'general'}
            >
              Vue générale
            </button>
          </li>
          <li role="presentation">
            <button
              className={`fr-tabs__tab ${selectedView === 'costs' ? 'fr-tabs__tab--active' : ''}`}
              onClick={() => setSelectedView('costs')}
              role="tab"
              aria-selected={selectedView === 'costs'}
            >
              Coûts estimés
            </button>
          </li>
          <li role="presentation">
            <button
              className={`fr-tabs__tab ${selectedView === 'timeline' ? 'fr-tabs__tab--active' : ''}`}
              onClick={() => setSelectedView('timeline')}
              role="tab"
              aria-selected={selectedView === 'timeline'}
            >
              Échéances
            </button>
          </li>
        </ul>

        <div className="fr-tabs__panel" role="tabpanel">
          {selectedView === 'general' && (
            <div className="fr-grid-row fr-grid-row--gutters">
              <div className="fr-col-12">
                <div className="fr-card fr-card--grey fr-p-3w">
                  <h5 className="fr-h5">Répartition par niveau d'obligation</h5>
                  <div className="fr-progress-group">
                    <div className="fr-progress">
                      <div
                        className="fr-progress__bar"
                        style={{
                          width: `${getPercentage(mandatoryRegulations)}%`,
                          backgroundColor: '#000091'
                        }}
                        role="progressbar"
                        aria-valuenow={getPercentage(mandatoryRegulations)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                    <p className="fr-text--sm">
                      Obligatoires : {mandatoryRegulations} ({getPercentage(mandatoryRegulations)}%)
                    </p>

                    <div className="fr-progress">
                      <div
                        className="fr-progress__bar"
                        style={{
                          width: `${getPercentage(recommendedRegulations)}%`,
                          backgroundColor: '#6a6af4'
                        }}
                        role="progressbar"
                        aria-valuenow={getPercentage(recommendedRegulations)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                    <p className="fr-text--sm">
                      Recommandées : {recommendedRegulations} ({getPercentage(recommendedRegulations)}%)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedView === 'costs' && (
            <div className="fr-grid-row fr-grid-row--gutters">
              <div className="fr-col-12">
                <div className="fr-card fr-card--grey fr-p-3w">
                  <h5 className="fr-h5">Estimation des coûts de mise en conformité</h5>
                  <div className="fr-progress-group">
                    <div className="fr-progress">
                      <div
                        className="fr-progress__bar"
                        style={{
                          width: `${getPercentage(costBreakdown.faible)}%`,
                          backgroundColor: '#7ab51d'
                        }}
                        role="progressbar"
                        aria-valuenow={getPercentage(costBreakdown.faible)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                    <p className="fr-text--sm">
                      Coût faible : {costBreakdown.faible} ({getPercentage(costBreakdown.faible)}%)
                    </p>

                    <div className="fr-progress">
                      <div
                        className="fr-progress__bar"
                        style={{
                          width: `${getPercentage(costBreakdown.moyen)}%`,
                          backgroundColor: '#ffa436'
                        }}
                        role="progressbar"
                        aria-valuenow={getPercentage(costBreakdown.moyen)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                    <p className="fr-text--sm">
                      Coût moyen : {costBreakdown.moyen} ({getPercentage(costBreakdown.moyen)}%)
                    </p>

                    <div className="fr-progress">
                      <div
                        className="fr-progress__bar"
                        style={{
                          width: `${getPercentage(costBreakdown.eleve)}%`,
                          backgroundColor: '#e1000f'
                        }}
                        role="progressbar"
                        aria-valuenow={getPercentage(costBreakdown.eleve)}
                        aria-valuemin={0}
                        aria-valuemax={100}
                      ></div>
                    </div>
                    <p className="fr-text--sm">
                      Coût élevé : {costBreakdown.eleve} ({getPercentage(costBreakdown.eleve)}%)
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {selectedView === 'timeline' && (
            <div className="fr-grid-row fr-grid-row--gutters">
              <div className="fr-col-12">
                <div className="fr-card fr-card--grey fr-p-3w">
                  <h5 className="fr-h5">Échéances de mise en conformité</h5>
                  <div className="fr-table">
                    <table>
                      <thead>
                        <tr>
                          <th>Réglementation</th>
                          <th>Date limite</th>
                          <th>Statut</th>
                        </tr>
                      </thead>
                      <tbody>
                        {regulations
                          .filter(r => r.implementationDeadline)
                          .sort((a, b) => {
                            const dateA = a.implementationDeadline || '';
                            const dateB = b.implementationDeadline || '';
                            return dateA.localeCompare(dateB);
                          })
                          .map(regulation => {
                            const deadline = new Date(regulation.implementationDeadline || '');
                            const today = new Date();
                            const daysRemaining = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
                            
                            let status = 'À venir';
                            let statusClass = 'fr-badge--info';
                            
                            if (daysRemaining < 0) {
                              status = 'Dépassé';
                              statusClass = 'fr-badge--error';
                            } else if (daysRemaining < 30) {
                              status = 'Urgent';
                              statusClass = 'fr-badge--warning';
                            }

                            return (
                              <tr key={regulation.id}>
                                <td>{regulation.name}</td>
                                <td>{new Date(regulation.implementationDeadline || '').toLocaleDateString('fr-FR')}</td>
                                <td>
                                  <span className={`fr-badge ${statusClass}`}>
                                    {status}
                                  </span>
                                </td>
                              </tr>
                            );
                          })}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplianceStats;
