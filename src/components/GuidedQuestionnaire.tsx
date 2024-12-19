import React, { useState, useEffect, useCallback } from 'react';
import { regulations } from '../data/regulations';
import '../styles/questionnaire.css';

interface QuestionCardProps {
  title: string;
  icon: string;
  value: string;
  onChange: (value: string) => void;
  options: { value: string; label: string; description?: string }[];
  step: number;
  description?: string;
  isActive: boolean;
}

export const GuidedQuestionnaire: React.FC<{
  onFilterChange: (filtered: typeof regulations) => void;
}> = ({ onFilterChange }) => {
  const [companySize, setCompanySize] = useState('');
  const [itDependency, setItDependency] = useState('');
  const [budget, setBudget] = useState('');
  const [matchingCount, setMatchingCount] = useState(regulations.length);
  const [activeStep, setActiveStep] = useState(1);
  const [showProgressBar, setShowProgressBar] = useState(false);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [loadingStep, setLoadingStep] = useState<number | null>(null);

  // Effet de ripple
  const createRipple = useCallback((event: React.MouseEvent<HTMLButtonElement>) => {
    const button = event.currentTarget;
    const ripple = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    const rect = button.getBoundingClientRect();
    ripple.style.width = ripple.style.height = `${diameter}px`;
    ripple.style.left = `${event.clientX - rect.left - radius}px`;
    ripple.style.top = `${event.clientY - rect.top - radius}px`;
    ripple.className = 'ripple';

    const existingRipple = button.getElementsByClassName('ripple')[0];
    if (existingRipple) {
      existingRipple.remove();
    }

    button.appendChild(ripple);

    setTimeout(() => {
      ripple.remove();
    }, 600);
  }, []);

  useEffect(() => {
    setShowProgressBar(true);
    const timer = setTimeout(() => {
      document.querySelectorAll('.question-card').forEach((card, index) => {
        setTimeout(() => {
          card.classList.add('show');
        }, index * 200);
      });
    }, 300);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    const completed = [];
    if (companySize) completed.push(1);
    if (itDependency) completed.push(2);
    if (budget) completed.push(3);
    setCompletedSteps(completed);

    // Ne filtrer que si toutes les questions sont répondues
    if (completed.length === 3) {
      const filtered = filterRegulations(companySize, itDependency, budget);
      setMatchingCount(filtered.length);
      onFilterChange(filtered);
    } else {
      // Réinitialiser les résultats si le questionnaire n'est pas complet
      onFilterChange([]);
    }
  }, [companySize, itDependency, budget]);

  const handleOptionSelect = async (step: number, value: string) => {
    setLoadingStep(step);
    
    // Simuler un délai pour l'effet de chargement
    await new Promise(resolve => setTimeout(resolve, 300));

    switch (step) {
      case 1:
        setCompanySize(value);
        setActiveStep(2);
        break;
      case 2:
        setItDependency(value);
        setActiveStep(3);
        break;
      case 3:
        setBudget(value);
        break;
    }

    setLoadingStep(null);
  };

  const getProgressWidth = () => {
    return `${(completedSteps.length / 3) * 100}%`;
  };

  const filterRegulations = (size: string, dependency: string, budgetLevel: string) => {
    return regulations.filter(reg => {
      const sizeMatch = !size || 
        reg.applicableTo.size.includes(size) ||
        reg.applicableTo.size.includes('toutes') ||
        (size === 'petite' && reg.applicableTo.size.includes('moyenne')) ||
        (size === 'moyenne' && (reg.applicableTo.size.includes('petite') || reg.applicableTo.size.includes('grande')));

      const dependencyMatch = !dependency ||
        reg.applicableTo.criticalLevel.includes(dependency) ||
        reg.applicableTo.criticalLevel.includes('tous') ||
        (dependency === 'normal' && reg.applicableTo.criticalLevel.some(level => ['faible', 'basique'].includes(level))) ||
        (dependency === 'critique' && reg.applicableTo.criticalLevel.some(level => ['important', 'elevé'].includes(level)));

      const budgetMatch = !budgetLevel ||
        reg.estimatedCost.toLowerCase() === budgetLevel.toLowerCase() ||
        (budgetLevel === 'eleve' && ['moyen', 'faible'].includes(reg.estimatedCost.toLowerCase())) ||
        (budgetLevel === 'moyen' && reg.estimatedCost.toLowerCase() === 'faible');

      return sizeMatch && dependencyMatch && budgetMatch;
    });
  };

  const QuestionCard: React.FC<QuestionCardProps> = ({ 
    title, 
    icon, 
    value, 
    onChange, 
    options, 
    step, 
    description,
    isActive 
  }) => (
    <div 
      className={`question-card ${isActive ? 'active' : ''} ${loadingStep === step ? 'loading-shimmer' : ''}`}
      onClick={() => setActiveStep(step)}
    >
      <div className="completion-indicator" style={{ width: value ? '100%' : '0%' }} />

      <div style={{ 
        display: 'flex', 
        alignItems: 'center', 
        gap: '0.75rem' 
      }}>
        <div className={`icon-container ${isActive ? 'active' : ''}`}>
          <span className={icon} aria-hidden="true"></span>
        </div>
        <div style={{ flex: 1 }}>
          <div style={{ 
            color: '#a0a0a0',
            fontSize: '0.875rem',
            marginBottom: '0.25rem'
          }}>
            Étape {step}/3
          </div>
          <h3 style={{ 
            margin: 0,
            color: '#ffffff',
            fontSize: '1.1rem',
            fontWeight: '600'
          }}>
            {title}
          </h3>
          {description && (
            <p className="description-text">
              {description}
            </p>
          )}
        </div>
        {completedSteps.includes(step) && (
          <div className="completion-check">✓</div>
        )}
      </div>

      <div style={{
        maxHeight: isActive ? '500px' : '0',
        opacity: isActive ? 1 : 0,
        overflow: 'hidden',
        transition: 'all 0.3s ease-in-out'
      }}>
        <div style={{
          display: 'grid',
          gap: '0.75rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          marginTop: '1rem'
        }}>
          {options.map((option) => (
            <button
              key={option.value}
              onClick={(e) => {
                e.stopPropagation();
                createRipple(e);
                handleOptionSelect(step, option.value);
              }}
              className={`option-button ${value === option.value ? 'selected' : ''}`}
              disabled={loadingStep === step}
            >
              <span style={{ 
                fontSize: '1rem',
                fontWeight: '500',
                display: 'block'
              }}>
                {option.label}
              </span>
              {option.description && (
                <span style={{ 
                  fontSize: '0.875rem',
                  opacity: 0.8,
                  display: 'block',
                  marginTop: '0.25rem'
                }}>
                  {option.description}
                </span>
              )}
            </button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <div className="questionnaire-container">
      <div className="progress-track">
        <div className="progress-bar" style={{ width: showProgressBar ? getProgressWidth() : '0%' }} />
      </div>

      <div className="header-card">
        <div className="header-pattern" />
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
          position: 'relative'
        }}>
          <span className="fr-icon-search-fill" aria-hidden="true"></span>
          <div>
            <h2 style={{ 
              margin: '0 0 0.25rem 0', 
              fontSize: '1.2rem', 
              fontWeight: '600'
            }}>
              Trouvez vos réglementations
            </h2>
            <div style={{ 
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem'
            }}>
              <span className="count-badge">
                {matchingCount}
              </span>
              <span>
                réglementation{matchingCount !== 1 ? 's' : ''} correspond{matchingCount !== 1 ? 'ent' : ''} à vos critères
              </span>
            </div>
          </div>
        </div>
      </div>

      <QuestionCard
        step={1}
        title="Taille de l'entreprise"
        description="Sélectionnez la taille qui correspond le mieux à votre entreprise"
        icon="fr-icon-user-fill"
        value={companySize}
        onChange={(val) => handleOptionSelect(1, val)}
        isActive={activeStep === 1}
        options={[
          { 
            value: "petite", 
            label: "Petite entreprise", 
            description: "Moins de 50 employés"
          },
          { 
            value: "moyenne", 
            label: "Moyenne entreprise",
            description: "Entre 50 et 250 employés"
          },
          { 
            value: "grande", 
            label: "Grande entreprise",
            description: "Plus de 250 employés"
          }
        ]}
      />

      <QuestionCard
        step={2}
        title="Niveau de dépendance IT"
        description="À quel point votre activité dépend-elle des systèmes informatiques ?"
        icon="fr-icon-computer-fill"
        value={itDependency}
        onChange={(val) => handleOptionSelect(2, val)}
        isActive={activeStep === 2}
        options={[
          { 
            value: "normal", 
            label: "Usage standard",
            description: "Principalement bureautique et email"
          },
          { 
            value: "critique", 
            label: "Usage important",
            description: "Processus métier dépendants de l'IT"
          },
          { 
            value: "essentiel", 
            label: "Usage critique",
            description: "Impossible de fonctionner sans IT"
          }
        ]}
      />

      <QuestionCard
        step={3}
        title="Budget disponible"
        description="Budget annuel envisageable pour la cybersécurité"
        icon="fr-icon-money-euro-circle-fill"
        value={budget}
        onChange={(val) => handleOptionSelect(3, val)}
        isActive={activeStep === 3}
        options={[
          { 
            value: "faible", 
            label: "Budget limité",
            description: "Moins de 10k€ par an"
          },
          { 
            value: "moyen", 
            label: "Budget modéré",
            description: "Entre 10k€ et 50k€ par an"
          },
          { 
            value: "eleve", 
            label: "Budget conséquent",
            description: "Plus de 50k€ par an"
          }
        ]}
      />
    </div>
  );
};
