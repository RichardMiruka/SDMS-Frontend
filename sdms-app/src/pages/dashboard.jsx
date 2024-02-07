import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { faHourglass1 } from '@fortawesome/free-solid-svg-icons';
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
  } from "@heroicons/react/24/outline";
  import { PencilIcon, UserPlusIcon } from "@heroicons/react/24/solid";
  import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip,
  } from "@material-tailwind/react";



const Dashboard = () => {
  const [tournaments, setTournaments] = useState([]);
  const [draws, setDraws] = useState([]);



  useEffect(() => {
    // Fetch tournament data from the backend API
    fetch('/events')
      .then(response => response.json())
      .then(data => setTournaments(data))
      .catch(error => {
        console.error('Error fetching tournaments from API:', error);
        // dummy tournament data in case of fetch failure
        setTournaments(dummyTournaments);
      });
	  fetch('/draws')
      .then(response => response.json())
      .then(data => setDraws(data))
      .catch(error => {
        console.error('Error fetching draws from API:', error);
        // Use dummy draw data in case of fetch failure
        setDraws(dummyDraws);
      });
  }, []);
	


  // Dummy tournament data
  const dummyTournaments = [
    { id: 1, name: 'Tournament 1', date: '2022-03-01' },
    { id: 2, name: 'Tournament 2', date: '2022-04-15' },
    { id: 5, name: 'Tournament 3', date: '2022-05-20' },
    { id: 6, name: 'Tournament 4', date: '2022-05-20' },
    { id: 7, name: 'Tournament 5', date: '2022-05-20' },
    { id: 8, name: 'Tournament 6', date: '2022-05-20' },
    { id: 9, name: 'Tournament 7', date: '2022-05-20' },
    { id: 10, name: 'Tournament 8', date: '2022-05-20' },
    { id: 11, name: 'Tournament 9', date: '2022-05-20' },
    { id: 12, name: 'Tournament 10', date: '2022-05-20' },
    { id: 13, name: 'Tournament 11', date: '2022-05-20' },
    { id: 14, name: 'Tournament 12', date: '2022-05-20' }
  ];

  const dummyDraws = [
    { id: 1, match: 'AFC Leopards vs Gor Mahia' },
    { id: 2, match: 'Kariobangi Sharks vs Tusker' },
    { id: 3, match: 'Kenya Police vs Bandari FC' },
    { id: 4, match: 'Ulinzi Stars vs Shabana FC' },
  ];
    
  const last8Tournaments = tournaments.slice(-8);
  const last5Draws = draws.slice(-5)
  return (
    <div>
    <div className="min-h-screen flex flex-col gap-4 items-stretch justify-center ">
		<div className='flex items-center p-4'>
			<div className='w-1/2 p-4 border-r min-h-screen flex items-start'>
				{/* <h2 className="object-left-top text-2xl font-bold mb-6">Dashboard</h2> */}
        		<div className="mb-4 bg-blue-500 p-6 rounded shadow-md w-full max-w-lg">
          			<h3 className="text-lg font-bold text-center mb-2 bg-gray-100 p-6 rounded shadow-md w-full max-w-lg">Tournaments</h3>
          			<ul className="list-disc pl-6">
            			{last8Tournaments.map(tournament => (
             	 		<li className='flex text-center bg-white/50 rounded shadow-md mb-3'>
							<span className='text-base' key={tournament.id}>{tournament.name}</span>
              <button className="ml-2 bg-blue-500 px-2 py-1 text-white rounded p-4 m-1 ml-auto">
                <Link to="/Teams">View Teams </Link>
              </button>
						</li>
            			))}
          			</ul>
        		</div>
			</div>
		<div>
      
		<div className='flex items-center p-4'>
			<div className='p-4 min-h-screen items-start'>
				<div className="mb-4 bg-blue-500 p-6 rounded shadow-md w-full max-w-lg">
					<h3 className="text-lg font-bold text-center mb-2 bg-gray-100 p-6 rounded shadow-md w-full max-w-lg ">Recent Draws</h3>
            		<ul className="list-disc pl-6">
              			{last5Draws.map(draw => (
                			<li className='flex text-center bg-white/50 rounded shadow-md mb-3' key={draw.id}>
                  				<span className='text-base'>{draw.match}</span>
                			</li>
              			))}
            		</ul>
        		</div>
			</div>
		</div>

		
            	
	</div>

	</div>
  
        
    </div>
      

    </div>
  );
};

export default Dashboard;
