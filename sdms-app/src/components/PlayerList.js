import React, { useState, useEffect } from 'react';
import customFetcher from '../utils/fetchInstance';
import {
    Card,
    CardHeader,
    Typography,
    CardBody
  } from "@material-tailwind/react";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);

  useEffect(() => {
    
    customFetcher('http://localhost:5000/api/v1/players')
      .then(({ data })=> setPlayers(data))
      .catch(error => console.error('Error fetching players:', error));
  }, []);

  return (
    <Card className="flex flex-col min-h-screen bg-gray-800 text-white" style={{ width: '100%' }}>
  <CardHeader floated={false} shadow={false} className="rounded-none bg-gray-800 text-white">
    <div className="mb-8 flex items-center justify-between gap-8 ml-0">
      <div>
        <Typography variant="h5" color="blue-gray">
          Player List
        </Typography>
        <Typography color="white" className="mt-1 font-normal">
          Players and their Details
        </Typography>
      </div>
    </div>
  </CardHeader>
  <CardBody className="overflow-hidden px-0 mx-40">
    <table className="mt-4 w-full min-w-max table-auto text-left shadow-md">
      <thead>
        <tr>
          <th
            className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
          >
            <Typography
              variant="small"
              color="blue-gray"
              className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
            >
              Name
            </Typography>
          </th>
          <th
            className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
          >
            <Typography
              variant="small"
              color="blue-gray"
              className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
            >
              Gender
            </Typography>
          </th>
          <th
            className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
          >
            <Typography
              variant="small"
              color="blue-gray"
              className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
            >
              Weight
            </Typography>
          </th>
          <th
            className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
          >
            <Typography
              variant="small"
              color="blue-gray"
              className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
            >
              Age
            </Typography>
          </th>
        </tr>
      </thead>
      <tbody className="shadow-md">
        {players.map(({ name, is_male, Weight, age, id }, index) => {
          const isLast = index === players.length - 1;
          const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

          return (
            <tr key={name}>
              <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {name}
                </Typography>
              </td>
              <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {is_male ? "Male" : "Female"}
                </Typography>
              </td>
              <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {Weight}
                </Typography>
              </td>
              <td className={classes}>
                <Typography variant="small" color="blue-gray" className="font-normal">
                  {age}
                </Typography>
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  </CardBody>
</Card>



  );
};

export default PlayerList;