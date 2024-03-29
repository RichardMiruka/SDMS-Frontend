import { useEffect, useState } from "react";
import React from 'react';
import customFetcher from "../utils/fetchInstance";

const CoachList = () => {
  const [coaches, setCoaches] = useState([]);

  const defaultImageUrl = 'https://images.unsplash.com/photo-1605509603173-ab689807e860?q=80&w=2069&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D';

  useEffect(() => {
    customFetcher('http://54.236.44.210:5000/api/v1/coaches')
      .then(({data}) => setCoaches(data))
      .catch(error => console.error('Error fetching coaches:', error));
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-gray-800 text-white">
    <h2 className="text-2xl font-semibold text-gray-800 mb-4">Coaches</h2>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-20">
      {coaches.map(coach => (
        <div key={coach.coach_id} className="bg-blue-gray-50/50 border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-blue-gray-50 dark:hover:bg-gray-600 shadow-md rounded-md overflow-hidden p-4">
          <div className="flex justify-center">
            <img src={coach.imageUrl || defaultImageUrl} alt={coach.name} className="w-40 h-40 sm:w-32 sm:h-32 md:w-40 md:h-40 object-cover rounded-full" />
          </div>
          <div className="text-center mt-4">
            <h3 className="text-lg font-semibold text-blue-gray-900">{coach.name}</h3>
            <p className="text-sm text-gray-600">{coach.specialization}</p>
          </div>
        </div>
      ))}
    </div>
  </div>
  
  );
};

export default CoachList;