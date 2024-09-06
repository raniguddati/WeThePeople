import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ContributionPage = ({ projectId }) => {
  const [rewardTiers, setRewardTiers] = useState([]);
  const [selectedTier, setSelectedTier] = useState('');
  const [amount, setAmount] = useState('');

  useEffect(() => {
    const fetchRewardTiers = async () => {
      try {
        const response = await axios.get(`/api/projects/${projectId}/reward-tiers`);
        setRewardTiers(response.data);
      } catch (error) {
        console.error('Error fetching reward tiers', error);
      }
    };

    fetchRewardTiers();
  }, [projectId]);

  const handleContribution = async () => {
    try {
      await axios.post(`/api/projects/${projectId}/contribute`, {
        tier: selectedTier,
        amount
      });
      // Update UI or redirect
    } catch (error) {
      console.error('Error making contribution', error);
    }
  };

  return (
    <div>
      <h1>Contribute to Project</h1>
      <div>
        <label>Reward Tier:</label>
        <select onChange={(e) => setSelectedTier(e.target.value)} value={selectedTier}>
          {rewardTiers.map((tier) => (
            <option key={tier.id} value={tier.id}>{tier.name}</option>
          ))}
        </select>
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button onClick={handleContribution}>Contribute</button>
    </div>
  );
};

export default ContributionPage;
