import React, { useState, useEffect } from 'react';

const PlayerList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    
    fetch('http://localhost:5000/api/v1/players')
      .then(response => response.json())
      .then(data => setPlayers(data))
      .catch(error => console.error('Error fetching players:', error));
  }, []);

  return (
    <div>
      <h2>Player List</h2>
      
      <table className='p-8 border border-solid'>
        <thead className=''>
          <tr>
            <th className='border border-solid'>Name</th>
            <th className='border border-solid'>Gender</th>
            <th className='border border-solid'>Weight</th>
            <th>Age</th>
          </tr>
        </thead>
        <tbody className='border border-solid p-4'>
          {players.map(player => (
            <tr key={player.id} className='border border-solid'>
              <td className='border border-solid'>{player.name}</td>
              <th className='border border-solid'>{player.is_male ? "Male" : "Female"}</th>
              <td className='border border-solid'>{player.Weight}</td>
              <td>{player.age}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default PlayerList;
