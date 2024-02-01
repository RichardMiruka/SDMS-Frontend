import React, { useState, useEffect } from 'react';

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
    <div>
      <h2>Elimination Tournament</h2>
      {tournamentData.map((round, roundIndex) => (
        <div key={roundIndex} className="round">
          <h3>Round {roundIndex + 1}</h3>
          {round.map((matchup, matchIndex) => (
            <div key={matchIndex} className="matchup">
              <span>{matchup.player1}</span>
              <span>vs</span>
              <span>{matchup.player2}</span>
              <button
                onClick={() => handleMatchResult(roundIndex, matchIndex, 'player1')}
                disabled={!matchup.player1 || !matchup.player2}
              >
                {matchup.player1} wins
              </button>
              <button
                onClick={() => handleMatchResult(roundIndex, matchIndex, 'player2')}
                disabled={!matchup.player1 || !matchup.player2}
              >
                {matchup.player2} wins
              </button>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default SingleEliminationTournament;
