import React, { useState, useEffect } from 'react';

const TeamList = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch('/api/teams')  // To replace with our actual endpoint for fetching teams from backend API
      .then(response => response.json())
      .then(data => setTeams(data))
      .catch(error => console.error('Error fetching teams:', error));
  }, []);

  return (
    <div>
      <h2>Team List</h2>
      <ul>
        {teams.map(team => (
          <li key={team.team_id}>
            <strong>{team.name}</strong>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TeamList;
