import React, { useState, useEffect } from 'react';

const EventList = () => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    const header = {
      'Authorization': `Bearer ${token}`
    };
    fetch('http://localhost:5000/api/v1/events', { headers: header })
      .then(response => response.json())
      .then(data => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <div className="container mx-auto px-4">
      <h2 className="text-2xl font-semibold text-gray-800 mb-4">Event List</h2>
      <p className="text-gray-600 mb-4">
      Explore and join the excitement of upcoming tournaments in various sports disciplines. From thrilling football matches to intense tennis competitions and fierce karate tournaments, there's something for every sports enthusiast.
      </p>
      <ul>
        {events.map(event => (
          <li key={event.event_id} className="bg-white shadow-md rounded-md overflow-hidden mb-4 p-4">
            <strong className="block text-lg font-semibold text-gray-800">{event.name}</strong>
            <p className="text-sm text-gray-600 mt-2">Date: {event.date}</p>
            <p className="text-sm text-gray-600 mt-2">Location: {event.location}</p>
            <p className="text-sm text-gray-600 mt-2">Organizer: {event.organizer}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default EventList;

