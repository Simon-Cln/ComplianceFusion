export interface Question {
  id: string;
  text: string;
  type: 'radio' | 'checkbox' | 'text';
  options?: { value: string; label: string }[];
  nextQuestion?: string;
}

export const questions: Question[] = [
  {
    id: 'q1',
    text: 'Combien d\'employés compte votre entreprise ?',
    type: 'radio',
    options: [
      { value: 'moins de 50', label: 'Moins de 50 employés' },
      { value: 'plus de 50', label: 'Plus de 50 employés' },
      { value: 'toutes tailles', label: 'Non spécifié' }
    ],
    nextQuestion: 'q2'
  },
  {
    id: 'q2',
    text: 'Votre activité dépend-elle fortement des systèmes d\'information ?',
    type: 'radio',
    options: [
      { value: 'arrete', label: 'Oui, notre activité s\'arrête sans SI' },
      { value: 'impact important', label: 'Impact important mais pas critique' },
      { value: 'impact limite', label: 'Impact limité' }
    ],
    nextQuestion: 'q3'
  },
  {
    id: 'q3',
    text: 'Quel budget pouvez-vous allouer à la mise en conformité ?',
    type: 'radio',
    options: [
      { value: 'faible', label: 'Faible' },
      { value: 'modere', label: 'Modéré' },
      { value: 'eleve', label: 'Élevé' }
    ]
  }
];
