const express = require('express');
const router = express.Router();
const { check, validationResult } = require('express-validator');
const auth = require('../middleware/auth');
const Project = require('../models/Project');

// Create a Project
router.post(
  '/',
  [
    auth,
    [
      check('name', 'Name is required').not().isEmpty(),
      check('description', 'Description is required').not().isEmpty(),
      check('fundingGoal', 'Funding goal is required').isNumeric(),
      check('duration', 'Duration is required').isNumeric(),
    ],
  ],
  async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, description, fundingGoal, duration, backerTiers } = req.body;

    try {
      const newProject = new Project({
        user: req.user.id,
        name,
        description,
        fundingGoal,
        duration,
        backerTiers,
      });

      const project = await newProject.save();
      res.json(project);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  }
);

// Get All Projects
router.get('/', async (req, res) => {
  try {
    const projects = await Project.find().populate('user', ['name']);
    res.json(projects);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
});

// Get Project by ID
router.get('/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id).populate('user', ['name']);
    if (!project) return res.status(404).json({ msg: 'Project not found' });
    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Project not found' });
    res.status(500).send('Server error');
  }
});

// Update a Project
router.put('/:id', auth, async (req, res) => {
  const { name, description, fundingGoal, duration, backerTiers } = req.body;

  // Build project object
  const projectFields = {};
  if (name) projectFields.name = name;
  if (description) projectFields.description = description;
  if (fundingGoal) projectFields.fundingGoal = fundingGoal;
  if (duration) projectFields.duration = duration;
  if (backerTiers) projectFields.backerTiers = backerTiers;

  try {
    let project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    // Ensure user owns project
    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    project = await Project.findByIdAndUpdate(
      req.params.id,
      { $set: projectFields },
      { new: true }
    );

    res.json(project);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Project not found' });
    res.status(500).send('Server error');
  }
});

// Delete a Project
router.delete('/:id', auth, async (req, res) => {
  try {
    const project = await Project.findById(req.params.id);
    if (!project) return res.status(404).json({ msg: 'Project not found' });

    // Ensure user owns project
    if (project.user.toString() !== req.user.id) {
      return res.status(401).json({ msg: 'User not authorized' });
    }

    await project.remove();

    res.json({ msg: 'Project removed' });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') return res.status(404).json({ msg: 'Project not found' });
    res.status(500).send('Server error');
  }
});

module.exports = router;
