<<<<<<< HEAD
import React, { useState } from 'react';
import TeamList, { useState} from '../components/TeamList'
=======
import React, { useState, useEffect } from 'react';
import TournamentComponent from '../components/brackets';
import Sidebar from '../components/sidebar';

>>>>>>> 39224d5f9c872b6bc0293d4ecb9b772d5dd01146

const generateInitialTournamentData = (numPlayers) => {
  const rounds = Math.ceil(Math.log2(numPlayers));
  const initialTournamentData = Array.from({ length: rounds }, (_, roundIndex) => {
    const numMatches = Math.pow(2, rounds - roundIndex - 1);
    return Array.from({ length: numMatches }, (_, matchIndex) => ({
      player1: null,
      player2: null
    }));
  });
  return initialTournamentData;
};

const SingleEliminationTournament = ({ numPlayers }) => {
  const [tournamentData, setTournamentData] = useState(generateInitialTournamentData(numPlayers));

  const handleMatchResult = (roundIndex, matchIndex, winner) => {
    const newTournamentData = [...tournamentData];

    // here is our logic to update the winner of the current match
    newTournamentData[roundIndex][matchIndex][winner === 'player1' ? 'player1' : 'player2'] = winner;

    // how to handle logic to determine next round and matchup index in the tournament
    const nextRoundIndex = roundIndex + 1;
    const nextMatchIndex = Math.floor(matchIndex / 2);

    // this is our logic to handle next match if it's not the final round, update the next matchup with the winner
    if (nextRoundIndex < newTournamentData.length) {
      const nextMatchup = newTournamentData[nextRoundIndex][nextMatchIndex];
      const nextPlayerKey = matchIndex % 2 === 0 ? 'player1' : 'player2';
      nextMatchup[nextPlayerKey] = winner;
    }

    setTournamentData(newTournamentData);
  };

  return (
    <div >
      <div className='flex'>
        <Sidebar />
          <div className='flex-grow bg-grar-200 w-full mx-auto'>
          <h2 className='text-center'>Elimination Tournament</h2>
          </div>       
      </div>
      {/* <div className='mx-10 bg-blue-200'>
        <div className=''>
           <TournamentComponent />
        </div>
      </div>   */}
    </div>
  );
};

export default SingleEliminationTournament;
