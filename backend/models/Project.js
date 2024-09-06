const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
  },
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  fundingGoal: {
    type: Number,
    required: true,
  },
  duration: {
    type: Number,
    required: true,
  },
  backerTiers: [
    {
      name: String,
      amount: Number,
      description: String,
    },
  ],
  amountRaised: {
    type: Number,
    default: 0,
  },
  updates: [
    {
      title: String,
      content: String,
      date: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Project', ProjectSchema);
    