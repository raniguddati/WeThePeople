import React, { useState } from 'react';
import axios from 'axios';

const CreateProjectPage = () => {
  const [project, setProject] = useState({
    name: '',
    description: '',
    fundingGoal: '',
    duration: '',
    backerTiers: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProject({
      ...project,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('/api/projects', project);
      console.log('Project created:', response.data);
      // Redirect or update UI
    } catch (error) {
      console.error('Error creating project', error);
    }
  };

  return (
    <div>
      <h1>Create New Project</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={project.name}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Funding Goal:</label>
          <input
            type="number"
            name="fundingGoal"
            value={project.fundingGoal}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Duration (days):</label>
          <input
            type="number"
            name="duration"
            value={project.duration}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Backer Tiers (comma separated):</label>
          <input
            type="text"
            name="backerTiers"
            value={project.backerTiers}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Create Project</button>
      </form>
    </div>
  );
};

export default CreateProjectPage;
