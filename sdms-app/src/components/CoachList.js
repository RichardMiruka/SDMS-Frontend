import React, { useState, useEffect } from 'react';

const CoachList = () => {
  const [coaches, setCoaches] = useState([]);

  useEffect(() => {
    fetch('/api/coaches')  // to replace with the actual endpoint for fetching coaches from our backend API
      .then(response => response.json())
      .then(data => setCoaches(data))
      .catch(error => console.error('Error fetching coaches:', error));
  }, []);

  return (
    <div>
      <h2>Coach List</h2>
      <ul>
        {coaches.map(coach => (
          <li key={coach.coach_id}>
            <strong>{coach.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default CoachList;
