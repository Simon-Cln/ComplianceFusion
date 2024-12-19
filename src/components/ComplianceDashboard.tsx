import React, { useState, useEffect } from 'react';
import ComplianceTracker from './ComplianceTrackerWithPagination';
import ComplianceCharts from './ComplianceCharts';
import { Regulation } from '../data/regulations';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

interface ComplianceDashboardProps {
  regulations: Regulation[];
}

export default function ComplianceDashboard({ regulations }: ComplianceDashboardProps) {
  const [complianceStatus, setComplianceStatus] = useState<Record<string, any>>({});

  useEffect(() => {
    const savedStatus = localStorage.getItem('complianceStatus');
    if (savedStatus) {
      setComplianceStatus(JSON.parse(savedStatus));
    }
  }, []);

  const handleStatusUpdate = (regulationId: string, status: string, notes: string) => {
    console.log('ComplianceDashboard - handleStatusUpdate appelé avec:', {
      regulationId,
      status,
      notes
    });
    
    const newStatus = {
      ...complianceStatus,
      [regulationId]: {
        status,
        notes,
        lastUpdate: new Date().toISOString(),
      },
    };
    console.log('Nouveau statut à sauvegarder:', newStatus);
    setComplianceStatus(newStatus);
    localStorage.setItem('complianceStatus', JSON.stringify(newStatus));
  };

  const handleExportPDF = () => {
    const doc = new jsPDF();
    const today = new Date().toLocaleDateString('fr-FR');
    
    // Titre et en-tête
    doc.setFontSize(20);
    doc.text('Rapport de Conformité', 105, 20, { align: 'center' });
    doc.setFontSize(12);
    doc.text(`Généré le ${today}`, 105, 30, { align: 'center' });

    // Statistiques globales
    const stats = {
      total: regulations.length,
      compliant: regulations.filter(r => complianceStatus[r.id]?.status === 'CONFORME').length,
      inProgress: regulations.filter(r => complianceStatus[r.id]?.status === 'EN_COURS').length,
      nonCompliant: regulations.filter(r => complianceStatus[r.id]?.status === 'NON_CONFORME').length,
      notStarted: regulations.filter(r => !complianceStatus[r.id]?.status || complianceStatus[r.id]?.status === 'NON_COMMENCE').length,
    };

    doc.setFontSize(14);
    doc.text('Résumé de la conformité', 20, 45);
    doc.setFontSize(12);
    doc.text([
      `Total des réglementations: ${stats.total}`,
      `Conformes: ${stats.compliant} (${Math.round((stats.compliant / stats.total) * 100)}%)`,
      `En cours: ${stats.inProgress} (${Math.round((stats.inProgress / stats.total) * 100)}%)`,
      `Non conformes: ${stats.nonCompliant} (${Math.round((stats.nonCompliant / stats.total) * 100)}%)`,
      `Non commencées: ${stats.notStarted} (${Math.round((stats.notStarted / stats.total) * 100)}%)`,
    ], 20, 55);

    // Tableau détaillé
    const tableData = regulations.map(reg => [
      reg.name,
      reg.description.substring(0, 50) + '...',
      complianceStatus[reg.id]?.status ? getStatusLabel(complianceStatus[reg.id].status) : 'Non commencé',
      complianceStatus[reg.id]?.lastUpdate ? new Date(complianceStatus[reg.id].lastUpdate).toLocaleDateString('fr-FR') : '-',
      complianceStatus[reg.id]?.notes || '-'
    ]);

    (doc as any).autoTable({
      startY: 90,
      head: [['Réglementation', 'Description', 'Statut', 'Dernière mise à jour', 'Notes']],
      body: tableData,
      theme: 'grid',
      headStyles: { fillColor: [41, 128, 185], textColor: 255 },
      styles: { fontSize: 10, cellPadding: 5 },
      columnStyles: {
        0: { cellWidth: 40 },
        1: { cellWidth: 50 },
        2: { cellWidth: 30 },
        3: { cellWidth: 30 },
        4: { cellWidth: 40 }
      }
    });

    doc.save('rapport-conformite.pdf');
  };

  const getStatusLabel = (status: string) => {
    switch (status) {
      case 'CONFORME':
        return 'Conforme';
      case 'EN_COURS':
        return 'En cours';
      case 'NON_CONFORME':
        return 'Non conforme';
      case 'NON_COMMENCE':
      default:
        return 'Non commencé';
    }
  };

  return (
    <div className="fr-container">
      <div className="fr-grid-row fr-grid-row--gutters">
        <div className="fr-col-12">
          <h2 className="fr-h2">Tableau de bord de conformité</h2>
          <button 
            className="fr-btn fr-btn--secondary fr-mb-2w"
            onClick={handleExportPDF}
          >
            <i className="ri-file-pdf-line fr-mr-1w" />
            Exporter le rapport en PDF
          </button>
        </div>
        <div className="fr-col-12 fr-col-md-8">
          <ComplianceTracker
            regulations={regulations}
            complianceStatus={complianceStatus}
            onStatusUpdate={handleStatusUpdate}
          />
        </div>
        <div className="fr-col-12 fr-col-md-4">
          <ComplianceCharts
            regulations={regulations}
            complianceStatus={complianceStatus}
          />
        </div>
      </div>
    </div>
  );
}
