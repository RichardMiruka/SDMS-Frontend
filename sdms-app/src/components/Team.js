import React, { useState, useEffect } from 'react';

const TournamentTeams = ({ tournamentId }) => {
  const fetchTeams = async () => {
    try {
      const response = await fetch(`/teams?tournamentId=${tournamentId}`);
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching teams from API:', error);
      return [];
    }
  };

  const [teams, setTeams] = useState([]);

  useEffect(() => {
    fetchTeams()
      .then(data => setTeams(data))
      .catch(error => console.error('Error fetching teams:', error));
  }, [tournamentId]);

  return (
    <div>
      <h2>Teams for Tournament {tournamentId}</h2>
      <ul>
        {teams.map(team => (
          <li key={team.id}>{team.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default TournamentTeams;

// // TeamList.js
// import React, { useState, useEffect } from 'react';

// const TeamList = () => {
//   const [teams, setTeams] = useState([]);

//   useEffect(() => {
//     // dummyTeams using useState
//     const dummyTeams = [
//       { team_id: 1, name: 'Team A' },
//       { team_id: 2, name: 'Team B' },
//       { team_id: 3, name: 'Team C' },
//       { team_id: 4, name: 'Team D' },
//       { team_id: 5, name: 'Team E' },
//       { team_id: 6, name: 'Team F' },
//       { team_id: 7, name: 'Team G' },
//       { team_id: 8, name: 'Team H' },
//     ];

//     // Fetch teams from the backend API (replace with your actual API endpoint)
//     fetch('/api/teams')
//       .then(response => response.json())
//       .then(data => setTeams(data))  // Set the actual teams fetched from the API
//       .catch(error => {
//         console.error('Error fetching teams:', error);
        
//         // If there's an error, use the dummyTeams as fallback
//         setTeams(dummyTeams);
//       });
//   }, []); // The empty dependency array ensures that this effect runs only once when the component mounts

//   return (
//     <div>
//       <h2>Team List</h2>
//       <ul>
//         {teams.map(team => (
//           <li key={team.team_id}>
//             <strong>{team.name}</strong>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default TeamList;
