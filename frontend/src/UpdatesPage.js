import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UpdatesPage = ({ projectId }) => {
  const [updates, setUpdates] = useState([]);

  useEffect(() => {
    const fetchUpdates = async () => {
      try {
        const response = await axios.get(`/api/projects/${projectId}/updates`);
        setUpdates(response.data);
      } catch (error) {
        console.error('Error fetching project updates', error);
      }
    };

    fetchUpdates();
  }, [projectId]);

  return (
    <div>
      <h1>Project Updates</h1>
      {updates.map((update) => (
        <div key={update.id}>
          <h2>{update.title}</h2>
          <p>{update.content}</p>
          <p>{new Date(update.date).toLocaleDateString()}</p>
        </div>
      ))}
    </div>
  );
};

export default UpdatesPage;
