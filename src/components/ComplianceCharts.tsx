import React from 'react';
import { Regulation } from '../data/regulations';

interface ComplianceChartsProps {
  regulations: Regulation[];
  complianceStatus: Record<string, any>;
}

export default function ComplianceCharts({ regulations, complianceStatus }: ComplianceChartsProps) {
  const getComplianceStats = () => {
    const stats = {
      total: regulations.length,
      compliant: 0,
      in_progress: 0,
      non_compliant: 0,
      not_started: 0,
      deadlines: {
        overdue: 0,
        upcoming: 0,
        future: 0
      }
    };

    regulations.forEach(reg => {
      // Statut de conformité
      const status = complianceStatus[reg.id]?.status || 'NON COMMENCE';
      switch (status) {
        case 'CONFORME':
          stats.compliant++;
          break;
        case 'EN_COURS':
          stats.in_progress++;
          break;
        case 'NON_CONFORME':
          stats.non_compliant++;
          break;
        default:
          stats.not_started++;
      }
      
      // Analyse des échéances
      if (reg.deadline) {
        const deadline = new Date(reg.deadline);
        const today = new Date();
        const diffTime = deadline.getTime() - today.getTime();
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

        if (diffDays < 0) {
          stats.deadlines.overdue++;
        } else if (diffDays <= 30) {
          stats.deadlines.upcoming++;
        } else {
          stats.deadlines.future++;
        }
      }
    });

    return stats;
  };

  const stats = getComplianceStats();
  const compliancePercentage = Math.round((stats.compliant / stats.total) * 100) || 0;

  return (
    <div className="fr-grid-row fr-grid-row--gutters">
      {/* Vue d'ensemble */}
      <div className="fr-col-12">
        <div className="fr-card fr-card--no-border">
          <div className="fr-card__body">
            <div className="fr-card__content">
              <h3 className="fr-card__title">
                <span className="fr-icon-line-chart-line fr-icon--lg fr-mr-1w"></span>
                Vue d'ensemble
              </h3>
              
              <div className="fr-grid-row fr-grid-row--gutters fr-mt-2w">
                <div className="fr-col-3">
                  <div className="fr-tile fr-tile--horizontal fr-p-3w fr-tile--grey">
                    <div className="fr-tile__body">
                      <h4 className="fr-tile__title fr-mb-0">
                        <span className="fr-h1 fr-mb-0 fr-text--bold fr-text--success">
                          {Math.round((stats.compliant / stats.total) * 100)}%
                        </span>
                      </h4>
                      <p className="fr-text--sm fr-mb-0">Taux de conformité</p>
                    </div>
                  </div>
                </div>

                <div className="fr-col-3">
                  <div className="fr-tile fr-tile--horizontal fr-p-3w fr-tile--grey">
                    <div className="fr-tile__body">
                      <h4 className="fr-tile__title fr-mb-0">
                        <span className="fr-h1 fr-mb-0 fr-text--bold fr-text--warning">
                          {stats.deadlines.upcoming}
                        </span>
                      </h4>
                      <p className="fr-text--sm fr-mb-0">Échéances à venir (30j)</p>
                    </div>
                  </div>
                </div>

                <div className="fr-col-3">
                  <div className="fr-tile fr-tile--horizontal fr-p-3w fr-tile--grey">
                    <div className="fr-tile__body">
                      <h4 className="fr-tile__title fr-mb-0">
                        <span className="fr-h1 fr-mb-0 fr-text--bold fr-text--error">
                          {stats.deadlines.overdue}
                        </span>
                      </h4>
                      <p className="fr-text--sm fr-mb-0">Échéances dépassées</p>
                    </div>
                  </div>
                </div>

                <div className="fr-col-3">
                  <div className="fr-tile fr-tile--horizontal fr-p-3w fr-tile--grey">
                    <div className="fr-tile__body">
                      <h4 className="fr-tile__title fr-mb-0">
                        <span className="fr-h1 fr-mb-0 fr-text--bold">
                          {stats.total}
                        </span>
                      </h4>
                      <p className="fr-text--sm fr-mb-0">Total réglementations</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tableau récapitulatif */}
              <div className="fr-grid-row fr-grid-row--gutters fr-mt-3w">
                <div className="fr-col-12">
                  <div className="fr-table" style={{ width: '100%', maxWidth: 'none' }}>
                    <table style={{ width: '100%', tableLayout: 'fixed' }}>
                      <thead>
                        <tr>
                          <th scope="col">Statut</th>
                          <th scope="col">Nombre</th>
                          <th scope="col">Pourcentage</th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>
                            <span className="fr-badge fr-badge--success">Conforme</span>
                          </td>
                          <td>{stats.compliant}</td>
                          <td>{Math.round((stats.compliant / stats.total) * 100)}%</td>
                        </tr>
                        <tr>
                          <td>
                            <span className="fr-badge fr-badge--warning">En cours</span>
                          </td>
                          <td>{stats.in_progress}</td>
                          <td>{Math.round((stats.in_progress / stats.total) * 100)}%</td>
                        </tr>
                        <tr>
                          <td>
                            <span className="fr-badge fr-badge--error">Non conforme</span>
                          </td>
                          <td>{stats.non_compliant}</td>
                          <td>{Math.round((stats.non_compliant / stats.total) * 100)}%</td>
                        </tr>
                        <tr>
                          <td>
                            <span className="fr-badge fr-badge--info">Non commencé</span>
                          </td>
                          <td>{stats.not_started}</td>
                          <td>{Math.round((stats.not_started / stats.total) * 100)}%</td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
