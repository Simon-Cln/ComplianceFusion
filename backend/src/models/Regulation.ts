import mongoose from 'mongoose';

const regulationSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true
  },
  description: {
    type: String,
    required: true
  },
  keyPoints: [{
    type: String
  }],
  applicableTo: {
    sectors: [{
      type: String
    }],
    size: [{
      type: String
    }],
    criticalLevel: [{
      type: String
    }]
  },
  complianceLevel: {
    type: String,
    enum: ['Obligatoire', 'Recommandé'],
    required: true
  },
  estimatedCost: {
    type: String,
    enum: ['Faible', 'Moyen', 'Élevé'],
    required: true
  },
  deadline: {
    type: Date
  },
  sanctions: {
    type: String
  },
  lastUpdated: {
    type: Date,
    default: Date.now
  }
});

export const Regulation = mongoose.model('Regulation', regulationSchema);
