import React, { useState, useEffect } from 'react';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    fetch('/api/events')  // I will replace  with the actual endpoint for fetching events from backend api
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <div>
      <h2>Event List</h2>
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
