import React from 'react';
import TournamentComponent from '../components/brackets';

const Home = () => {
  return (
    <div>
      <h2>Welcome to the Tournament Site</h2>
      <p>Explore tournaments, view match results, and enjoy the competition.</p>
      <TournamentComponent />
    </div>
  );
};

export default Home;
