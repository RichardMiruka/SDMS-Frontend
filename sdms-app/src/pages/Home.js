import React from 'react';
import { Link } from 'react-router-dom';
import EventList from '../components/EventList';

const Home = () => {
  return (
    <div className="jumbotron">
      <h1 classname="display-4"><b>Welcome to the Tournament Site</b></h1>
      <br/>
      <p className="lead">This is a simple tournament site that allows you to explore tournaments, view match results, and enjoy the competition.</p>
      {/* <hr className="my-4" /> */}
      <p classname='lead'>This platform allows Event Organizers to create, update and manage tournament fixtures</p><br/>
      <p classname="lead">
        <Link className="btn btn-primary btn-lg" to="/tournaments" role="button">View Tournaments</Link>
      </p>
      <EventList />


    </div>
  );
};

export default Home;
