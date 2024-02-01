import React, { useState, useEffect } from 'react';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    
    fetch('/api/players')  //I will have to replace with the actual endpoint(api) for fetching players
      .then(response => response.json())
      .then(data => setPlayers(data))
      .catch(error => console.error('Error fetching players:', error));
  }, []);

  return (
    <div>
      <h2>Player List</h2>
      <ul>
        {players.map(player => (
          <li key={player.player_id}>
            <strong>{player.name}</strong> - {player.position}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PlayerList;
