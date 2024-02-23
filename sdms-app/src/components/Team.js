import React, { useState, useEffect } from 'react';
import customFetcher from '../utils/fetchInstance';
import { faHourglass1 } from '@fortawesome/free-solid-svg-icons';
import {
  MagnifyingGlassIcon,
  ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import { TrashIcon, UserPlusIcon } from "@heroicons/react/24/solid";
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
import Modal from "./addTeamModal"




const TABLE_HEAD = ["Team", "Coach", "status", "Date of registration", ""];
const defaultTeamImg = "https://images.unsplash.com/photo-1631495634750-0f14320bc0a7?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"


export function TeamList() {
  const [teamData, setTeamData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [modalOpen, setModalOpen] = useState(false)


  const handleButtonClick = () => {
    setModalOpen(true);
  };

  const deleteTeam = function (teamId) {
    customFetcher(`http://54.236.44.210:5000/api/v1/teams/${teamId}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => updateTeamData())
      .catch(error => console.error('Error deleting team:', error))
  }

  const updateTeamData = function () {
    customFetcher('http://54.236.44.210:5000/api/v1/teams')
      .then(({ data }) => setTeamData(data))
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));

  }

  useEffect(() => {
    updateTeamData();
  }, []);

  useEffect(() => {

    customFetcher('http://54.236.44.210:5000/api/v1/teams')
      .then(({ data }) => setTeamData(data))
      .catch(error => setError(error.message))
      .finally(() => setLoading(false));

  }, []);


  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error}</p>;
  }
  return (
    <Card className="flex flex-col min-h-screen bg-gray-800 text-white" style={{ width: '100%' }}>
      <CardHeader floated={false} shadow={false} className="rounded-none bg-gray-800 text-white">
        <div className=" mb-8 flex items-center justify-between gap-8 ml-0">
          <div>
            <Typography variant="h5" color="blue-gray">
              Team list
            </Typography>
            <Typography color="gray" className="mt-1 font-normal">
              Teams and their Coaches
            </Typography>
          </div>
          <div className="flex shrink-0 flex-col gap-2 sm:flex-row mr-40">
            <Button className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600" size="sm" onClick={handleButtonClick}>
              <UserPlusIcon strokeWidth={2} className="h-4 w-4" /> Add Team
            </Button>
          </div>
        </div>
        {/* Render the add team modal component */}
        <Modal isOpen={modalOpen} setIsOpen={setModalOpen} setTeamData={updateTeamData} />
        <div className="flex flex-col items-center justify-between gap-4 md:flex-row">
          <Tabs value="all" className="w-full md:w-max">
          </Tabs>
        </div>
      </CardHeader>
      <CardBody className="overflow-hidden px-0 mx-40">
        <table className="mt-4 w-full min-w-max table-auto text-left shadow-md">
          <thead>
            <tr>
              {TABLE_HEAD.map((head, index) => (
                <th
                  key={head}
                  className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                >
                  <Typography
                    variant="small"
                    color="blue-gray"
                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                  >
                    {head}{" "}
                    {index !== TABLE_HEAD.length - 1 && (
                      <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4" />
                    )}
                  </Typography>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className='shadow-md'>
            {teamData.length > 1 && teamData.map(({ name, coach, status, created_at, id }, index) => {
              const isLast = index === teamData.length - 1;
              const classes = isLast
                ? "p-4"
                : "p-4 border-b border-blue-gray-50";

              return (
                <tr key={name}>
                  <td className={classes}>
                    <div className="flex items-center gap-3">
                      <Avatar src={coach?.img || defaultTeamImg} alt={name} size="sm" />
                      <div className="flex flex-col">
                        <Typography
                          variant="small"
                          color="blue-gray"
                          className="font-normal"
                        >
                          {name}
                        </Typography>
                      </div>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="flex flex-col">
                      <Typography
                        variant="small"
                        color="blue-gray"
                        className="font-normal"
                      >
                        {coach?.name}
                      </Typography>
                    </div>
                  </td>
                  <td className={classes}>
                    <div className="w-max">
                      <Chip
                        variant="ghost"
                        size="sm"
                        value={status === "affiliated" ? "Yes" : "No"}
                        color={status === "affiliated" ? "green" : "blue-gray"}
                      />
                    </div>
                  </td>
                  <td className={classes}>
                    <Typography
                      variant="small"
                      color="blue-gray"
                      className="font-normal"
                    >
                      {created_at}
                    </Typography>
                  </td>
                  <td className={classes}>
                    <Tooltip content="Delete Team">
                      <IconButton variant="text" onClick={() => deleteTeam(id)}>
                        <TrashIcon className="h-4 w-4" />
                      </IconButton>
                    </Tooltip>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </CardBody>
      <CardFooter className="flex items-center justify-between border-blue-gray-50 p-4">
      </CardFooter>
    </Card>
  );
}



export default TeamList;