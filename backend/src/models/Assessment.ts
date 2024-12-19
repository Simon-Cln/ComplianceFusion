import mongoose from 'mongoose';

const assessmentSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  regulation: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Regulation',
    required: true
  },
  complianceStatus: {
    type: String,
    enum: ['Non évalué', 'Non conforme', 'Partiellement conforme', 'Conforme'],
    default: 'Non évalué'
  },
  notes: {
    type: String
  },
  nextReviewDate: {
    type: Date
  },
  history: [{
    status: {
      type: String,
      enum: ['Non évalué', 'Non conforme', 'Partiellement conforme', 'Conforme']
    },
    date: {
      type: Date,
      default: Date.now
    },
    notes: String
  }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

export const Assessment = mongoose.model('Assessment', assessmentSchema);
