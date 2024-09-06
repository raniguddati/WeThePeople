import React, { useEffect, useState } from 'react';
import axios from 'axios';

const FundingProgressPage = ({ projectId }) => {
  const [funding, setFunding] = useState({
    amountRaised: 0,
    fundingGoal: 0
  });

  useEffect(() => {
    const fetchFunding = async () => {
      try {
        const response = await axios.get(`/api/projects/${projectId}/funding`);
        setFunding(response.data);
      } catch (error) {
        console.error('Error fetching funding progress', error);
      }
    };

    fetchFunding();
  }, [projectId]);

  const percentageRaised = (funding.amountRaised / funding.fundingGoal) * 100;

  return (
    <div>
      <h1>Funding Progress</h1>
      <p>Amount Raised: ${funding.amountRaised}</p>
      <p>Funding Goal: ${funding.fundingGoal}</p>
      <p>Percentage of Goal Achieved: {percentageRaised.toFixed(2)}%</p>
    </div>
  );
};

export default FundingProgressPage;
