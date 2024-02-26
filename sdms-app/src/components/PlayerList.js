import React, { useState, useEffect } from 'react';
import customFetcher from '../utils/fetchInstance';
import {
  Card,
  CardHeader,
  Typography,
  CardBody,
  Button,
  Input,
  IconButton,
  Tooltip,
} from "@material-tailwind/react";

const PlayerList = () => {
  const [players, setPlayers] = useState([]);
  const [newPlayer, setNewPlayer] = useState({
    name: "",
    is_male: true,
    weight: "",
    age: "",
  });
  const [modalOpen, setModalOpen] = useState(false);

  useEffect(() => {
    customFetcher('http://54.236.44.210:5000/api/v1/players')
      .then(({ data }) => setPlayers(data))
      .catch(error => console.error('Error fetching players:', error));
  }, []);

  const handleAddPlayer = () => {
    // API call to create a new player with newPlayer data
    customFetcher('http://54.236.44.210:5000/api/v1/players', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(newPlayer),
    })
      .then(() => {
        setNewPlayer({
          name: "",
          is_male: true,
          weight: "",
          age: "",
        });
        updatePlayers();
      })
      .catch(error => console.error('Error adding player:', error));
  };

  const handleDeletePlayer = (playerId) => {
    // API call to delete player by playerId
    customFetcher(`http://54.236.44.210:5000/api/v1/players/${playerId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => updatePlayers())
      .catch(error => console.error('Error deleting player:', error));
  };

  const updatePlayers = () => {
    customFetcher('http://54.236.44.210:5000/api/v1/players')
      .then(({ data }) => setPlayers(data))
      .catch(error => console.error('Error fetching players:', error));
  };

  const handleUpdatePlayer = (playerId, updatedPlayer) => {
    // API call to update player details by playerId with updatedPlayer data
    customFetcher(`http://54.236.44.210:5000/api/v1/players/${playerId}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updatedPlayer),
    })
      .then(() => updatePlayers())
      .catch(error => console.error('Error updating player:', error));
  };

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
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row mr-40">
            <Button
              className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600"
              size="sm"
              onClick={() => setModalOpen(true)}
            >
              Add Player
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardBody className="overflow-hidden px-0 mx-40">
        <table className="mt-4 w-full min-w-max table-auto text-left shadow-md">
          <thead>
            <tr>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <Typography variant="small" color="blue-gray" className="flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                  Name
                </Typography>
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <Typography variant="small" color="blue-gray" className="flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                  Gender
                </Typography>
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <Typography variant="small" color="blue-gray" className="flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                  Weight
                </Typography>
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <Typography variant="small" color="blue-gray" className="flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                  Age
                </Typography>
              </th>
              <th className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50">
                <Typography variant="small" color="blue-gray" className="flex items-center justify-between gap-2 font-normal leading-none opacity-70">
                  Actions
                </Typography>
              </th>
            </tr>
          </thead>
          <tbody className="shadow-md">
            {players.map(({ id, name, is_male, weight, age }, index) => {
              const isLast = index === players.length - 1;
              const classes = isLast ? "p-4" : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={id}>
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
                      {weight}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Typography variant="small" color="blue-gray" className="font-normal">
                      {age}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Update Player">
                      <IconButton
                        variant="text"
                        onClick={() => {
                          const updatedName = prompt("Enter updated name:", name);
                          const updatedIsMale = prompt("Enter updated gender (true for Male, false for Female):", is_male);
                          const updatedWeight = prompt("Enter updated weight:", weight);
                          const updatedAge = prompt("Enter updated age:", age);

                          if (
                            updatedName !== null &&
                            updatedIsMale !== null &&
                            updatedWeight !== null &&
                            updatedAge !== null
                          ) {
                            const updatedPlayer = {
                              name: updatedName,
                              is_male: JSON.parse(updatedIsMale),
                              weight: updatedWeight,
                              age: updatedAge,
                            };

                            handleUpdatePlayer(id, updatedPlayer);
                          }
                        }}
                      >
                        Update
                      </IconButton>
                    </Tooltip>
                    <Tooltip content="Delete Player">
                      <IconButton
                        variant="text"
                        onClick={() => handleDeletePlayer(id)}
                      >
                        Delete
                      </IconButton>
                    </Tooltip>
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
