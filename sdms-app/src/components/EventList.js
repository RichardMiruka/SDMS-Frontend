import React, { useState, useEffect } from 'react';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    console.log(token)
    const header = {
      'Authorization': `Bearer ${token}`
    }
    fetch('http://localhost:5000/api/v1/events', header)  // I will replace  with the actual endpoint for fetching events from backend api
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <div>
      <h2>Event List</h2>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Sint, at dolor. Minima voluptate eos molestias fuga perspiciatis vel tenetur mollitia ab quam, fugit qui quo rem adipisci aliquam ipsam reiciendis.</p>
      <ul>
         {events.map(event => (
          <li key={event.event_id}>
            <strong>{event.name}</strong>
          </li>
        ))} 
      </ul>
    </div>
  );
};

export default EventList;
