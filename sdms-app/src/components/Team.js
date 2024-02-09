import React, { useState, useEffect } from 'react';

const TeamList = () => {
  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetch('http://127.0.0.1:5000/api/v1/teams')
      .then(response => response.json())
      .then(data => {
        console.log(data); 
        setTeams(data);
      })
      .catch(error => console.error('Error fetching teams:', error));
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-3xl font-semibold text-gray-800 mb-8">Our Teams</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {teams.map(team => (
          <div key={team.team_id} className="bg-white shadow-lg rounded-lg overflow-hidden">
            <img src={team.image} alt={team.name} className="w-full h-56 object-cover" />
            <div className="p-6">
              <h3 className="text-xl font-semibold text-gray-800 mb-2">{team.name}</h3>
              <p className="text-sm text-gray-600 mb-4">Coach: {team.coach}</p>
              <ul>
                {team.players.map(player => (
                  <li key={player.player_id} className="text-sm text-gray-800">{player.name}</li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default TeamList;

