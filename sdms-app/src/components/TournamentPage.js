import React from 'react';
import PlayerList from './PlayerList';
import CoachList from './CoachList';
import EventList from './EventList';
import TeamList from './TeamList';
import EliminationTournament from './EliminationTournament';

const TournamentPage = () => {
  return (
    <div>
      <h1>Tournament Page</h1>
      
      {/* Display Lists */}
      <div className="lists-container">
        <div className="list">
          <h2>Players</h2>
          <PlayerList />
        </div>
        <div className="list">
          <h2>Coaches</h2>
          <CoachList />
        </div>
        <div className="list">
          <h2>Events</h2>
          <EventList />
        </div>
      </div>

      {/* Display Tournament */}
      <div className="tournament-container">
        <EliminationTournament />
      </div>
    </div>
  );
};

export default TournamentPage;
