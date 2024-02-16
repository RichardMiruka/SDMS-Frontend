import React from 'react';
import TournamentComponent from '../components/brackets';
import coachList from '../components/CoachList';
import PlayerList from '../components/PlayerList';
import EventList from '../components/EventList';

const Dashboard = () => {
  return (
    <div className="container mx-auto p-8">
      <h2 className="text-3xl font-bold mb-4">Dashboard</h2>
      <p className="text-lg mb-4">
        Welcome to the dashboard! Here you can view and manage your teams, players, and events.
      </p>
      <TournamentComponent />
      <PlayerList />
      <EventList />
      <coachList />
    </div>
  );
}
export default Dashboard;
