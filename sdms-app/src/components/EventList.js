import React, { useState, useEffect } from 'react';
import customFetcher from '../utils/fetchInstance';
import { Link } from 'react-router-dom';
import { UserPlusIcon } from '@heroicons/react/24/solid';
import { Button } from "@material-tailwind/react";
import CreateEventModal from "./createEventModal";

const EventList = () => {
  const [events, setEvents] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);


  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleCreateEvent = (formData) => {
    // Add logic to send formData to your API and handle the response
    // For now, let's assume the response includes the newly created event
    const newEvent = {
      id: formData.id, // Replace with the actual ID from the response
      name: formData.name,
      created_at: new Date().toISOString(), // You might need to adjust this based on your API response
    };

    // Update the events state with the new event
    setEvents((prevEvents) => [newEvent, ...prevEvents]);

    closeModal();
  };

  useEffect(() => {
    customFetcher('http://localhost:5000/api/v1/events')
      .then(({ data }) => setEvents(data))
      .catch(error => console.error('Error fetching events:', error));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-white">
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg w-full p-4">
        <Button className="flex items-center gap-3 ml-auto bg-blue-500 hover:bg-blue-600" size="sm" onClick={openModal}>
          <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Create Event
        </Button>
        <CreateEventModal isOpen={isModalOpen} onClose={closeModal} onSubmit={handleCreateEvent} />
        <table className="mx-auto w-3/4 w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-6 py-3">
                Event Name
              </th>
              <th scope="col" className="px-6 py-3">
                Created At
              </th>
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {events && events?.map(event => (
              <tr key={event.id} className="bg-blue-gray-50/50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-gray-50 dark:hover:bg-gray-600">
                <td className="px-6 py-4 font-medium text-blue-gray-900 whitespace-nowrap dark:text-white">
                  <Link to={`/tournament/eventplayers`} state={{ event_id: event.id }}>
                    <div>{event.name}</div>
                  </Link>
                </td>
                <td className="px-6 py-4">
                  <Link to={`/tournament/eventplayers`} state={{ event_id: event.id }}>
                    <div>{event.created_at}</div>
                  </Link>
                </td>
                {/* <td className="px-6 py-4 text-right">
                            <a href="#" className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Edit</a>
                        </td> */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>


  );
};

export default EventList;
