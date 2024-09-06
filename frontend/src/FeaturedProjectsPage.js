import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FeaturedProjectsPage = () => {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    const fetchFeaturedProjects = async () => {
      try {
        const response = await axios.get('/api/projects/featured');
        setProjects(response.data);
      } catch (error) {
        console.error('Error fetching featured projects', error);
      }
    };

    fetchFeaturedProjects();
  }, []);

  return (
    <div>
      <h1>Featured Projects</h1>
      {projects.map((project) => (
        <div key={project.id}>
          <h2>{project.name}</h2>
          <p>{project.description}</p>
          {/* Additional project details */}
        </div>
      ))}
    </div>
  );
};

export default FeaturedProjectsPage;

