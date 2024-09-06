const mongoose = require('mongoose');

const ContributionSchema = new mongoose.Schema({
  project: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Project',
  },
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  tier: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tier',
  },
  amount: {
    type: Number,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Contribution', ContributionSchema);
