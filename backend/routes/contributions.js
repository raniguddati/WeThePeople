const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Contribution = require('../models/Contribution');
const Project = require('../models/Project');

// Create a Contribution
router.post(
  '/',
  [
    auth,
    [
      check('project', 'Project is required').not().isEmpty(),
      check('amount', 'Amount is required').isNumeric(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { project, amount, tier } = req.body;

    try {
      const newContribution = new Contribution({
        user: req.user.id,
        project,
        amount,
        tier,
      });

      const contribution = await newContribution.save();

      // Update project's amount raised
      const projectData = await Project.findById(project);
      projectData.amountRaised += amount;
      await projectData.save();

      res.json(contribution);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Get All Contributions for a Project
router.get('/project/:projectId', async (req, res) => {
  try {
    const contributions = await Contribution.find({ project: req.params.projectId }).populate('user', ['name']);
    res.json(contributions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get All Contributions by a User
router.get('/user/:userId', async (req, res) => {
  try {
    const contributions = await Contribution.find({ user: req.params.userId }).populate('project', ['name']);
    res.json(contributions);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

module.exports = router;
