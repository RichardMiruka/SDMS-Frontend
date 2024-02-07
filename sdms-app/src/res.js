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