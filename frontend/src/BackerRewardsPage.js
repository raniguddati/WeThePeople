import React, { useState } from 'react';
import axios from 'axios';

const BackerRewardsPage = ({ projectId }) => {
  const [rewards, setRewards] = useState({
    tierName: '',
    description: '',
    amount: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setRewards({
      ...rewards,
      [name]: value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post(`/api/projects/${projectId}/reward-tiers`, rewards);
      // Update UI or redirect
    } catch (error) {
      console.error('Error setting up reward tier', error);
    }
  };

  return (
    <div>
      <h1>Set Up Backer Rewards</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Tier Name:</label>
          <input
            type="text"
            name="tierName"
            value={rewards.tierName}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Description:</label>
          <textarea
            name="description"
            value={rewards.description}
            onChange={handleChange}
          />
        </div>
        <div>
          <label>Amount:</label>
          <input
            type="number"
            name="amount"
            value={rewards.amount}
            onChange={handleChange}
          />
        </div>
        <button type="submit">Set Up Reward Tier</button>
      </form>
    </div>
  );
};

export default BackerRewardsPage;
