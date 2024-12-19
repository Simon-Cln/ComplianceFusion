import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  companyName: {
    type: String,
    required: true
  },
  sector: {
    type: String,
    required: true
  },
  size: {
    type: String,
    required: true
  },
  criticalLevel: {
    type: String,
    required: true
  },
  savedRegulations: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Regulation'
  }],
  assessments: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Assessment'
  }],
  createdAt: {
    type: Date,
    default: Date.now
  }
});

export const User = mongoose.model('User', userSchema);
