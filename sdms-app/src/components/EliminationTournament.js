import React, { useState } from 'react';

const EliminationTournament = () => {
  const initialTournamentData = [
    [{ player1: 'Player A', player2: 'Player B' }],
    [{ player1: null, player2: null }], // Placeholder for round 2
    // We will add more rounds as needed to implement our logic
  ];

  const [tournamentData, setTournamentData] = useState(initialTournamentData);

  const handleMatchResult = (roundIndex, matchIndex, winner) => {
    const newTournamentData = [...tournamentData];

    // To Update the winner of the current match
    newTournamentData[roundIndex][matchIndex][winner === 'player1' ? 'player1' : 'player2'] = winner;

    // To Determine the next round and matchup index
    const nextRoundIndex = roundIndex + 1;
    const nextMatchIndex = Math.floor(matchIndex / 2);

    // If it's not the final round, update the next matchup with the winner
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
