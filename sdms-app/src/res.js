import { useEffect, useState } from 'react';
import { Bracket, Seed, SeedItem, SeedTeam } from 'react-brackets';

const Teams = [
  {
    id: 2,
    'name': "Player 2"
  },
  {
    id: 3,
    'name': "Player 3"
  },
  {
    id: 4,
    'name': "Player 4"
  },
  {
    id: 5,
    'name': "Player 5"
  },
  {
    id: 6,
    'name': "Player 6"
  },
  {
    id: 7,
    'name': "Player 7"
  },
  {
    id: 8,
    'name': "Player 8"
  },
  {
    id: 9,
    'name': "Player 9"
  },
  {
    id: 10,
    'name': "Player 10"
  },
  {
    id: 11,
    'name': "Player 11"
  },
  {
    id: 12,
    'name': "Player 12"
  },
  {
    id: 2,
    'name': "Player 2"
  },
  {
    id: 17,
    'name': "Player 17"
  },
  {
    id: 18,
    'name': "Player 18"
  },
  {
    id: 19,
    'name': "Player 19"
  },
  {
    id: 20,
    'name': "Player 20"
  },
  {
    id: 17,
    'name': "Player 17"
  },
  {
    id: 18,
    'name': "Player 18"
  },
  {
    id: 19,
    'name': "Player 19"
  },
  {
    id: 20,
    'name': "Player 20"
  },
  {
    id: 17,
    'name': "Player 17"
  },
  {
    id: 18,
    'name': "Player 18"
  },
  {
    id: 19,
    'name': "Player 19"
  },
  {
    id: 20,
    'name': "Player 20"
  }
]

const TournamentComponent = ({seedIndex}) => {
  const [rounds, setRounds] = useState([]);

  useEffect(() => {
    // Generate tournament rounds based on the number of teams
    const generateRounds = (teams) => {
      const numTeams = teams.length;

      // Calculate the number of byes needed to make the number of teams a power of 2
      const numByes = Math.pow(2, Math.ceil(Math.log2(numTeams))) - numTeams;

      const byesPerRound = Math.ceil(numByes / (Math.log2(numTeams) - 1));

      // Fill in byes
      const teamsWithByes = [...teams];
      let byeCounter = 1;

      for (let round = 0; round < Math.log2(numTeams) - 1; round++) {
        const byesForCurrentRound = Math.min(byesPerRound, numByes - (round * byesPerRound));

        for (let i = 0; i < byesForCurrentRound && byeCounter <= numByes; i++) {
          teamsWithByes.splice(round * (byesPerRound * 2) + i * 2, 0, {
            id: `bye${byeCounter}`,
            name: `Bye ${byeCounter}`,
            bye: true,
          });
          byeCounter++;
        }
      }

      const rounds = [];
      let currentRoundTeams = [...teamsWithByes];

      while (currentRoundTeams.length > 1) {
        const matches = [];
        for (let i = 0; i < currentRoundTeams.length; i += 2) {
          const teamA = currentRoundTeams[i];
          const teamB = currentRoundTeams[i + 1];
          const match = {
            id: i / 2 + 1,
            title: `Match ${i + 1}`,
            date: new Date().toDateString(),
            teams: [
              { name: teamA.name },
              { name: teamB.name },
            ],
          };
          matches.push(match);
        }
        const roundTitle = rounds.length + 1;
        rounds.push({ title:  `Round ${roundTitle}`, seeds: matches });

        // Update the currentRoundTeams with the winners of the current round
        currentRoundTeams = matches.map((match) => ({
          id: match.id,
          // name: `Winner ${match.title} ${seedIndex}`,
          // name: `${match.teams[0].name} vs ${match.teams[1].name} Winner`,
        }));
      }

      return rounds;
    };

    // Call the generateRounds function with the Teams data
    const generatedRounds = generateRounds(Teams);

    // Set the generated rounds in the state
    setRounds(generatedRounds);
  }, []); // Run this effect only once on component mount

  // Custom rendering function for seeds
  const renderSeedComponent = ({ seed, breakpoint, roundIndex, seedIndex }) => {
    const homeTeam = seed.teams[0];
    const awayTeam = seed.teams[1];

    const hasBye = homeTeam.bye || awayTeam.bye;

    return (
      <Seed mobileBreakpoint={breakpoint} style={{ fontSize: 14 }}>
        {getRoundType(roundIndex, Teams.length, seedIndex)}
      <SeedItem>
        <SeedTeam className='bg-red-500 text-white'>
          <div>
              <div>
            {/* {homeTeam.name ? homeTeam.name :
              `Winner R${roundIndex}M${seedIndex + 1}`} */}
               {gametype(homeTeam.name, roundIndex, Teams.length, 2 * seedIndex + 1)}
              </div>
            {homeTeam.bye && <div>Bye</div>}
          </div>
          {homeTeam.score && <div className='ml-2 text-black'>{homeTeam.score}</div>}
        </SeedTeam>
        <SeedTeam className='bg-blue-500 text-white'>
          <div>
            {/* {awayTeam.name ? awayTeam.name :
              `Winner R${roundIndex}M${seedIndex + 2}`} */}
            <div>{gametype(awayTeam.name, roundIndex, Teams.length, ((2 * seedIndex + 1) + 1))}</div>
            {awayTeam.bye && <div>Bye</div>}
          </div>
          {awayTeam.score && <div className='ml-2 text-black'>{awayTeam.score}</div>}
        </SeedTeam>
      </SeedItem>
      {hasBye && <div>{awayTeam.name ? `${awayTeam.name} wins` : '---- wins'}</div>}

      </Seed>
    );
  };

  const getRoundType = (roundIndex, numTeams, seedIndex) => {
    const totalRounds = Math.ceil(Math.log2(numTeams));
  
    if (roundIndex === totalRounds - 1) {
      return 'Finals';
    } else if (roundIndex === totalRounds - 2) {
      return `Semifinals ${seedIndex + 1}`;
    } else if (roundIndex === totalRounds - 3) {
      return `Quarterfinals  ${seedIndex + 1}`;
    } else {
      return `Match ${seedIndex + 1}`
    }
    
  };

  const gametype = (hTeam, roundIndex, numTeams, seedIndex) => {
    const totalRounds = Math.ceil(Math.log2(numTeams));
    if (hTeam){
      return hTeam
    } else if (roundIndex === totalRounds - 1) {
      return `SemiFinals ${seedIndex} Winner`;
    } else if (roundIndex === totalRounds - 2) {
        return `QuaterFinal ${seedIndex} Winner`;
    } else {
      return `Winner R${roundIndex}M${seedIndex}`
    }   
  };

  return <Bracket rounds={rounds} renderSeedComponent={renderSeedComponent} />;

};

export default TournamentComponent;





  {/* <div onClick={() => setOpen(false)} className="relative" x-data="{ open: false }">
            <button onClick={() => setOpen(!open)} className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm text-left text-white md:w-auto md:inline md:mt-0 hover:text-blue-600 focus:outline-none focus:shadow-outline">
              <span>Tournaments</span>
              <svg fill="currentColor" viewBox="0 0 20 20" className={`inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform ${open ? 'rotate-180' : 'rotate-0'} md:-mt-1`}>
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd"></path>
              </svg>
            </button>
            <div className={`absolute right-0 z-30 w-full mt-2 origin-top-right rounded-md shadow-lg md:w-48 ${open ? 'block' : 'hidden'}`}>
              <div className="px-2 py-2 bg-white rounded-md shadow">
                <a className="block px-4 py-2 mt-2 text-sm text-gray-500 md:mt-0 hover:text-blue-600 focus:outline-none focus:shadow-outline">
                <li><Link to="/dashboard">Dashboard</Link></li>
                </a>
                <a className="block px-4 py-2 mt-2 text-sm text-gray-500 md:mt-0 hover:text-blue-600 focus:outline-none focus:shadow-outline" href="#">
                  Link #2
                </a>
                <a className="block px-4 py-2 mt-2 text-sm text-gray-500 md:mt-0 hover:text-blue-600 focus:outline-none focus:shadow-outline" href="#">
                  Link #3
                </a>
              </div>
            </div>
          </div> */}


          <div ref={dropdownRef} className="relative">
          <button
            onClick={() => setOpen(!open)}
            className="flex flex-row items-center w-full px-4 py-2 mt-2 text-sm text-left text-white md:w-auto md:inline md:mt-0 hover:text-blue-600 focus:outline-none focus:shadow-outline"
          >
            <span>Tournaments</span>
            <svg
              fill="currentColor"
              viewBox="0 0 20 20"
              className="inline w-4 h-4 mt-1 ml-1 transition-transform duration-200 transform"
            >
              <path
                fillRule="evenodd"
                d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          </button>

          {open && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-md shadow-lg">
              {/* Dropdown content goes here */}
              <u className='list-none mx'>
                <li>DashBoad</li>
                <li>Tournaments</li>
                <li>Teams</li>
                <li>Players</li>
              </u>
              {/* <p className="px-4 py-2 text-gray-800">Dropdown Content</p> */}
            </div>
          )}
        </div>






import React, { useState, useRef, useEffect } from "react";
// import { useNavigate, Link } from 'react-router-dom'
import { useAuth } from "../hooks/useAuth";

const LoginPage = ({ onLogin }) => {
  const pwdRef = useRef(null);
  const mailRef = useRef(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('')
  const [error, setError]= useState('');

  const { login } = useAuth();

  // const navigate=useNavigate()
  const handleLogin=async(e)=>{
    e.preventDefault();
    try { const response=await fetch('http://127.0.0.1:5000/api/v1/login',{
    method:'POST',
    headers:{
      'Content-Type':'application/json'
    },
    body:JSON.stringify({email, password}),
  }
  );
  const data=await response.json()
  if (response.ok){

    await login({ email })
    // localStorage.setItem("authTokens", JSON.stringify(data))
    setMessage(data.message)
    setTimeout(() => {
      // navigate('/tournament')
    }, [2000])
  }
  else{
    setError(data.error)
    setPassword('')
    pwdRef.current.focus();
  }  
    } catch (error) {
      setError('An error occurred, please do try again')
    }
  }

  useEffect(()=>{
    mailRef.current.focus();
  }, []);

  return (
    <div className="bg-gradient-to-r from-gray-300 via-green-200 to-indigo-300 flex justify-center items-center">
      <div className="h-screen mt-20" >
            {/* <img src="client/src/images/ourimage.png" alt="logo"/> */}
            {message && <p className="bg-green-500 shadow-md text-center text-white p-2 rounded-md mt-4">{message}</p>}
            {error && <p className="bg-red-500 shadow-md text-center text-white p-2 rounded-md mt-4">{error}</p>}
            <div className="w-full bg-gradient-to-r from-blue-500 via-purple-400 to-purple-700 h-3/5 rounded-xl mt-4">
                <form onSubmit={handleLogin}>
                    <h1 className="text-center mb-12 mt-4 text-2xl font-bold pt-4">Log in</h1>
                    <div className="flex space-x-4 ml-3 mx-auto">
                          <div className="mx-4">
                              <label htmlFor="email" className='p-4'>Email</label>
                              <input
                                type='text'
                                id='email'
                                ref={mailRef}
                                placeholder='Email'
                                className='rounded-md shadow-md'
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                          </div>
                          <br />
                          <div className="ml-4">
                                <label htmlFor="password" className='p-4 text-black-700'>Password</label>
                                <input
                                  type='password'
                                  id="password"
                                  ref={pwdRef}
                                  className='p-1 rounded-md shadow-md mr-10'
                                  placeholder='password'
                                  value={password}
                                  onChange={(e) => setPassword(e.target.value)}
                                />
                          </div>
                    </div>
                    <br />
                    <div className="flex justify-between mx-10">
                        <div className="flex items-center space-x-2">
                          <input type="checkbox" className="rounded-sm ml-4" />
                          <div>Remember me</div>
                        </div>
                        <div className="m-4">
                          <button type='submit'
                            onClick={handleLogin}
                            className="bg-blue-700 transition-all duration-700 hover:bg-blue-500 text-center mr-12 text-white p-8 py-2 rounded-md" >
                              Login</button>
                        </div>
                    </div>
                    <br />
                    <div className="text-center p-6">
                        Don't have an account? <span className="text-blue-700 underline font-bold text-md"><Link to="/register">Sign Up</Link></span>
                    </div>
                  </form>
            </div>
           
      </div>
    </div>
  );  
};

export default LoginPage;
