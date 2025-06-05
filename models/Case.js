const mongoose = require('mongoose');

const caseSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  category: {
    type: String,
    required: true,
    enum: ['criminal', 'civil', 'corporate', 'family', 'immigration', 'intellectual-property', 'labor', 'tax', 'real-estate', 'other']
  },
  country: {
    type: String,
    required: true
  },
  client: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  lawyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  },
  status: {
    type: String,
    enum: ['open', 'in-progress', 'closed', 'pending'],
    default: 'open'
  },
  difficultyLevel: {
    type: Number,
    min: 1,
    max: 10
  },
  aiAnalysis: {
    summary: String,
    recommendations: [String],
    counterArguments: [String],
    estimatedDuration: String,
    successProbability: Number
  },
  documents: [{
    name: String,
    type: String,
    url: String,
    uploadDate: { type: Date, default: Date.now }
  }],
  timeline: [{
    event: String,
    date: Date,
    description: String
  }]
}, {
  timestamps: true
});

module.exports = mongoose.model('Case', caseSchema);