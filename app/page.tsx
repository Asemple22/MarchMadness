'use client';

import { useState } from 'react';
import TeamSelector from './components/TeamSelector';

interface Player {
  id: string;
  name: string;
  teams: Team[];
  draftOrder: number;
}

interface Team {
  id: string;
  name: string;
  seed: number;
  region: string;
  isFirstFour?: boolean;
  odds: {
    championship: number;
    finalFour: number;
    eliteEight: number;
    sweetSixteen: number;
  };
  ev: number;
  winner: number;
}

export default function Home() {
  const [players, setPlayers] = useState<Player[]>([
    { id: '1', name: 'Player 1', draftOrder: 1, teams: [] },
    { id: '2', name: 'Player 2', draftOrder: 2, teams: [] },
    { id: '3', name: 'Player 3', draftOrder: 3, teams: [] },
    { id: '4', name: 'Player 4', draftOrder: 4, teams: [] },
  ]);
  const [currentPlayer, setCurrentPlayer] = useState<string>('1');
  const [draftStarted, setDraftStarted] = useState(false);
  const [draftRound, setDraftRound] = useState(1);
  const [isSnake, setIsSnake] = useState(true);
  const [pickNumber] = useState(1);
  const [isDraftComplete, setIsDraftComplete] = useState(false);

  const [teams] = useState<Team[]>([
    // East Region (E)
    { id: '1', name: 'Duke', seed: 1, region: 'East', ev: 96.7, winner: 320, odds: { championship: 185, finalFour: -120, eliteEight: -260, sweetSixteen: -800 } },
    { id: '2', name: 'Mississippi St.', seed: 8, region: 'East', ev: 57.0, winner: 25000, odds: { championship: 10000, finalFour: 850, eliteEight: 900, sweetSixteen: 900 } },
    { id: '3', name: 'Baylor', seed: 9, region: 'East', ev: 46.0, winner: 30000, odds: { championship: 6000, finalFour: 3500, eliteEight: 1000, sweetSixteen: 750 } },
    { id: '4', name: 'Oregon', seed: 5, region: 'East', ev: 66.1, winner: 18000, odds: { championship: 13000, finalFour: 2200, eliteEight: 1300, sweetSixteen: 250 } },
    { id: '5', name: 'Liberty', seed: 12, region: 'East', ev: 52.0, winner: 80000, odds: { championship: 35000, finalFour: 20000, eliteEight: 3000, sweetSixteen: 650 } },
    { id: '6', name: 'Arizona', seed: 4, region: 'East', ev: 80.0, winner: 5000, odds: { championship: 2500, finalFour: 950, eliteEight: 450, sweetSixteen: -180 } },
    { id: '7', name: 'Akron', seed: 13, region: 'East', ev: 47.5, winner: 80000, odds: { championship: 30000, finalFour: 20000, eliteEight: 10000, sweetSixteen: 1100 } },
    { id: '8', name: 'BYU', seed: 6, region: 'East', ev: 71.0, winner: 9000, odds: { championship: 4000, finalFour: 1500, eliteEight: 425, sweetSixteen: 180 } },
    { id: '9', name: 'VCU', seed: 11, region: 'East', ev: 63.8, winner: 40000, odds: { championship: 9000, finalFour: 4000, eliteEight: 900, sweetSixteen: 380 } },
    { id: '10', name: 'Wisconsin', seed: 3, region: 'East', ev: 82.5, winner: 6000, odds: { championship: 1800, finalFour: 850, eliteEight: 300, sweetSixteen: -145 } },
    { id: '11', name: 'Montana', seed: 14, region: 'East', ev: 17.3, winner: 100000, odds: { championship: 50000, finalFour: 20000, eliteEight: 10000, sweetSixteen: 2000 } },
    { id: '12', name: "Saint Mary's", seed: 7, region: 'East', ev: 68.2, winner: 13000, odds: { championship: 4500, finalFour: 1800, eliteEight: 500, sweetSixteen: 270 } },
    { id: '13', name: 'Vanderbilt', seed: 10, region: 'East', ev: 53.1, winner: 40000, odds: { championship: 15000, finalFour: 6000, eliteEight: 1500, sweetSixteen: 750 } },
    { id: '14', name: 'Alabama', seed: 2, region: 'East', ev: 88.7, winner: 2200, odds: { championship: 850, finalFour: 450, eliteEight: 120, sweetSixteen: -200 } },
    { id: '15', name: 'Robert Morris', seed: 15, region: 'East', ev: 15.5, winner: 100000, odds: { championship: 50000, finalFour: 50000, eliteEight: 15000, sweetSixteen: 10000 } },
    { id: '16', name: 'American', seed: 16, region: 'East', isFirstFour: true, ev: 19.8, winner: 100000, odds: { championship: 50000, finalFour: 50000, eliteEight: 15000, sweetSixteen: 10000 } },
    { id: '17', name: 'Mount St. Mary\'s', seed: 16, region: 'East', isFirstFour: true, ev: 19.5, winner: 100000, odds: { championship: 50000, finalFour: 50000, eliteEight: 15000, sweetSixteen: 10000 } },

    // West Region
    { id: '18', name: 'Florida', seed: 1, region: 'West', ev: 100.0, winner: 380, odds: { championship: 190, finalFour: -125, eliteEight: -240, sweetSixteen: -750 } },
    { id: '19', name: 'Norfolk St.', seed: 16, region: 'West', ev: 14.5, winner: 100000, odds: { championship: 50000, finalFour: 50000, eliteEight: 5000, sweetSixteen: 10000 } },
    { id: '20', name: 'UConn', seed: 8, region: 'West', ev: 71.0, winner: 8000, odds: { championship: 5000, finalFour: 2000, eliteEight: 850, sweetSixteen: 600 } },
    { id: '21', name: 'Oklahoma', seed: 9, region: 'West', ev: 55.0, winner: 60000, odds: { championship: 18000, finalFour: 8000, eliteEight: 1500, sweetSixteen: 1200 } },
    { id: '22', name: 'Memphis', seed: 5, region: 'West', ev: 65.0, winner: 35000, odds: { championship: 9000, finalFour: 5500, eliteEight: 2000, sweetSixteen: 600 } },
    { id: '23', name: 'Colorado St.', seed: 12, region: 'West', ev: 54.9, winner: 40000, odds: { championship: 15000, finalFour: 6500, eliteEight: 1500, sweetSixteen: 400 } },
    { id: '24', name: 'Maryland', seed: 4, region: 'West', ev: 78.7, winner: 4500, odds: { championship: 1200, finalFour: 750, eliteEight: 360, sweetSixteen: -180 } },
    { id: '25', name: 'Grand Canyon', seed: 13, region: 'West', ev: 49.1, winner: 80000, odds: { championship: 25000, finalFour: 20000, eliteEight: 8000, sweetSixteen: 900 } },
    { id: '26', name: 'Missouri', seed: 6, region: 'West', ev: 68.0, winner: 12000, odds: { championship: 5000, finalFour: 2200, eliteEight: 500, sweetSixteen: 250 } },
    { id: '27', name: 'Drake', seed: 11, region: 'West', ev: 55.6, winner: 50000, odds: { championship: 15000, finalFour: 9000, eliteEight: 1500, sweetSixteen: 700 } },
    { id: '28', name: 'Texas Tech', seed: 3, region: 'West', ev: 84.5, winner: 3500, odds: { championship: 1200, finalFour: 550, eliteEight: 135, sweetSixteen: -145 } },
    { id: '29', name: 'UNC Wilmington', seed: 14, region: 'West', ev: 17.5, winner: 100000, odds: { championship: 50000, finalFour: 25000, eliteEight: 10000, sweetSixteen: 2500 } },
    { id: '30', name: 'Kansas', seed: 7, region: 'West', ev: 62.3, winner: 9000, odds: { championship: 6000, finalFour: 1800, eliteEight: 550, sweetSixteen: 210 } },
    { id: '31', name: 'Arkansas', seed: 10, region: 'West', ev: 55.0, winner: 20000, odds: { championship: 9000, finalFour: 5000, eliteEight: 1000, sweetSixteen: 550 } },
    { id: '32', name: "St. John's", seed: 2, region: 'West', ev: 77.8, winner: 2800, odds: { championship: 1800, finalFour: 600, eliteEight: 210, sweetSixteen: -170 } },
    { id: '33', name: 'Omaha', seed: 15, region: 'West', ev: 15.0, winner: 100000, odds: { championship: 50000, finalFour: 50000, eliteEight: 10000, sweetSixteen: 5000 } },

    // South Region (S)
    { id: '34', name: 'Auburn', seed: 1, region: 'South', ev: 94.2, winner: 400, odds: { championship: 170, finalFour: -135, eliteEight: -180, sweetSixteen: -400 } },
    { id: '35', name: 'Louisville', seed: 8, region: 'South', ev: 60.9, winner: 10000, odds: { championship: 4000, finalFour: 2200, eliteEight: 600, sweetSixteen: 750 } },
    { id: '36', name: 'Creighton', seed: 9, region: 'South', ev: 59.7, winner: 13000, odds: { championship: 5000, finalFour: 3000, eliteEight: 850, sweetSixteen: 700 } },
    { id: '37', name: 'Michigan', seed: 5, region: 'South', ev: 47.0, winner: 7500, odds: { championship: 4500, finalFour: 1800, eliteEight: 950, sweetSixteen: 190 } },
    { id: '38', name: 'UC San Diego', seed: 12, region: 'South', ev: 54.4, winner: 50000, odds: { championship: 9000, finalFour: 7000, eliteEight: 1200, sweetSixteen: 390 } },
    { id: '39', name: 'Texas A&M', seed: 4, region: 'South', ev: 71.0, winner: 10000, odds: { championship: 3500, finalFour: 1600, eliteEight: 650, sweetSixteen: 120 } },
    { id: '40', name: 'Yale', seed: 13, region: 'South', ev: 50.6, winner: 100000, odds: { championship: 50000, finalFour: 15000, eliteEight: 5000, sweetSixteen: 600 } },
    { id: '41', name: 'Ole Miss', seed: 6, region: 'South', ev: 47.2, winner: 15000, odds: { championship: 6500, finalFour: 2000, eliteEight: 500, sweetSixteen: 220 } },
    { id: '42', name: 'Iowa St.', seed: 3, region: 'South', ev: 83.3, winner: 4500, odds: { championship: 2500, finalFour: 750, eliteEight: 220, sweetSixteen: -140 } },
    { id: '43', name: 'Lipscomb', seed: 14, region: 'South', ev: 17.0, winner: 100000, odds: { championship: 50000, finalFour: 35000, eliteEight: 8000, sweetSixteen: 2000 } },
    { id: '44', name: 'Marquette', seed: 7, region: 'South', ev: 59.4, winner: 20000, odds: { championship: 7000, finalFour: 2500, eliteEight: 500, sweetSixteen: 260 } },
    { id: '45', name: 'New Mexico', seed: 10, region: 'South', ev: 57.9, winner: 35000, odds: { championship: 15000, finalFour: 6000, eliteEight: 850, sweetSixteen: 500 } },
    { id: '46', name: 'Michigan St.', seed: 2, region: 'South', ev: 89.5, winner: 2500, odds: { championship: 1500, finalFour: 500, eliteEight: 140, sweetSixteen: -180 } },
    { id: '47', name: 'Bryant', seed: 15, region: 'South', ev: 15.3, winner: 100000, odds: { championship: 50000, finalFour: 50000, eliteEight: 5000, sweetSixteen: 2500 } },
    { id: '48', name: 'Alabama St.', seed: 16, region: 'South', isFirstFour: true, ev: 20.0, winner: 100000, odds: { championship: 50000, finalFour: 50000, eliteEight: 15000, sweetSixteen: 10000 } },
    { id: '49', name: 'Saint Francis U', seed: 16, region: 'South', isFirstFour: true, ev: 19.5, winner: 100000, odds: { championship: 50000, finalFour: 50000, eliteEight: 15000, sweetSixteen: 10000 } },
    { id: '50', name: 'San Diego St.', seed: 11, region: 'South', isFirstFour: true, ev: 63.2, winner: 80000, odds: { championship: 25000, finalFour: 15000, eliteEight: 1500, sweetSixteen: 950 } },
    { id: '51', name: 'North Carolina', seed: 11, region: 'South', isFirstFour: true, ev: 63.5, winner: 40000, odds: { championship: 12000, finalFour: 5500, eliteEight: 1000, sweetSixteen: 425 } },

    // Midwest Region (MW)
    { id: '52', name: 'Houston', seed: 1, region: 'Midwest', ev: 98.5, winner: 600, odds: { championship: 275, finalFour: 105, eliteEight: -145, sweetSixteen: -350 } },
    { id: '53', name: 'SIU Edwardsville', seed: 16, region: 'Midwest', ev: 14.4, winner: 100000, odds: { championship: 50000, finalFour: 50000, eliteEight: 15000, sweetSixteen: 10000 } },
    { id: '54', name: 'Gonzaga', seed: 8, region: 'Midwest', ev: 69.1, winner: 5000, odds: { championship: 2000, finalFour: 950, eliteEight: 425, sweetSixteen: 340 } },
    { id: '55', name: 'Georgia', seed: 9, region: 'Midwest', ev: 44.6, winner: 40000, odds: { championship: 5000, finalFour: 3500, eliteEight: 1000, sweetSixteen: 1000 } },
    { id: '56', name: 'Clemson', seed: 5, region: 'Midwest', ev: 75.5, winner: 8000, odds: { championship: 4000, finalFour: 1400, eliteEight: 650, sweetSixteen: 140 } },
    { id: '57', name: 'McNeese', seed: 12, region: 'Midwest', ev: 41.0, winner: 100000, odds: { championship: 20000, finalFour: 9000, eliteEight: 1500, sweetSixteen: 700 } },
    { id: '58', name: 'Purdue', seed: 4, region: 'Midwest', ev: 70.3, winner: 7500, odds: { championship: 4500, finalFour: 1300, eliteEight: 650, sweetSixteen: 120 } },
    { id: '59', name: 'High Point', seed: 13, region: 'Midwest', ev: 48.6, winner: 100000, odds: { championship: 50000, finalFour: 15000, eliteEight: 10000, sweetSixteen: 1200 } },
    { id: '60', name: 'Illinois', seed: 6, region: 'Midwest', ev: 73.2, winner: 8000, odds: { championship: 5000, finalFour: 1500, eliteEight: 475, sweetSixteen: 130 } },
    { id: '61', name: 'Kentucky', seed: 3, region: 'Midwest', ev: 72.0, winner: 6000, odds: { championship: 3000, finalFour: 1000, eliteEight: 360, sweetSixteen: 100 } },
    { id: '62', name: 'Troy', seed: 14, region: 'Midwest', ev: 18.8, winner: 100000, odds: { championship: 50000, finalFour: 25000, eliteEight: 10000, sweetSixteen: 2000 } },
    { id: '63', name: 'UCLA', seed: 7, region: 'Midwest', ev: 67.2, winner: 20000, odds: { championship: 7000, finalFour: 2800, eliteEight: 550, sweetSixteen: 320 } },
    { id: '64', name: 'Utah St.', seed: 10, region: 'Midwest', ev: 44.4, winner: 60000, odds: { championship: 25000, finalFour: 11000, eliteEight: 3000, sweetSixteen: 800 } },
    { id: '65', name: 'Tennessee', seed: 2, region: 'Midwest', ev: 91.8, winner: 2000, odds: { championship: 900, finalFour: 390, eliteEight: 100, sweetSixteen: -270 } },
    { id: '66', name: 'Wofford', seed: 15, region: 'Midwest', ev: 15.2, winner: 100000, odds: { championship: 50000, finalFour: 50000, eliteEight: 10000, sweetSixteen: 5000 } },
    { id: '67', name: 'Texas', seed: 11, region: 'Midwest', isFirstFour: true, ev: 62.7, winner: 50000, odds: { championship: 20000, finalFour: 15000, eliteEight: 900, sweetSixteen: 750 } },
    { id: '68', name: 'Xavier', seed: 11, region: 'Midwest', isFirstFour: true, ev: 62.9, winner: 50000, odds: { championship: 25000, finalFour: 12000, eliteEight: 3500, sweetSixteen: 750 } }
  ]);

  const handleTeamSelect = (team: Team) => {
    setPlayers(prevPlayers => {
      return prevPlayers.map(player => {
        if (player.id === currentPlayer) {
          return { ...player, teams: [...player.teams, team] };
        }
        return player;
      });
    });

    // Calculate next player
    const currentPlayerObj = players.find(p => p.id === currentPlayer);
    if (!currentPlayerObj) return;

    const direction = getDraftDirection();
    let nextOrder;

    if (direction === "Forward") {
      nextOrder = currentPlayerObj.draftOrder + 1;
      if (nextOrder > players.length) {
        setDraftRound(prev => prev + 1);
        nextOrder = players.length;
      }
    } else {
      nextOrder = currentPlayerObj.draftOrder - 1;
      if (nextOrder < 1) {
        setDraftRound(prev => prev + 1);
        nextOrder = 1;
      }
    }

    // Check if draft is complete (each player has selected enough teams)
    const teamsPerPlayer = 17; // Adjust this number based on your requirements
    const isComplete = players.every(player => 
      player.id === currentPlayer 
        ? (player.teams.length + 1) >= teamsPerPlayer 
        : player.teams.length >= teamsPerPlayer
    );

    if (isComplete) {
      setIsDraftComplete(true);
      setDraftStarted(false);
    } else {
      const nextPlayer = players.find(p => p.draftOrder === nextOrder);
      if (nextPlayer) {
        setCurrentPlayer(nextPlayer.id);
      }
    }
  };

  const getSelectedTeams = () => {
    return players.flatMap(player => player.teams.map(team => team.id));
  };

  const handleNameChange = (playerId: string, name: string) => {
    setPlayers(prevPlayers =>
      prevPlayers.map(player =>
        player.id === playerId
          ? { ...player, name }
          : player
      )
    );
  };

  const handleDraftOrderChange = (playerId: string, newOrder: number) => {
    if (draftStarted) return; // Don&apos;t allow changes after draft has started
    
    // Find the player who currently has the new order
    const playerWithNewOrder = players.find(p => p.draftOrder === newOrder);
    const changingPlayer = players.find(p => p.id === playerId);
    
    if (!changingPlayer) return;
    
    setPlayers(prevPlayers => {
      const updatedPlayers = prevPlayers.map(player => {
        if (player.id === playerId) {
          // Update the changing player's order
          return { ...player, draftOrder: newOrder };
        } else if (playerWithNewOrder && player.id === playerWithNewOrder.id) {
          // Swap the order with the other player
          return { ...player, draftOrder: changingPlayer.draftOrder };
        }
        return player;
      });
      
      // Sort players by draft order for display
      return updatedPlayers.sort((a, b) => a.draftOrder - b.draftOrder);
    });
  };

  const startDraft = () => {
    // Find the player with draft order 1
    const firstPlayer = players.find(p => p.draftOrder === 1);
    if (firstPlayer) {
      setCurrentPlayer(firstPlayer.id);
      setDraftStarted(true);
    }
  };

  const canStartDraft = players.every(player => 
    player.name.trim() !== '' && player.draftOrder > 0
  );

  // Get the draft direction for display
  const getDraftDirection = () => {
    if (!isSnake) return "Regular";
    return draftRound % 2 === 1 ? "Forward" : "Reverse";
  };

  const restartDraft = () => {
    setPlayers(players.map(player => ({
      id: player.id,
      name: player.name,
      draftOrder: player.draftOrder,
      teams: []
    })));
    setDraftRound(1);
    setDraftStarted(false);
    setIsDraftComplete(false);
    const firstPlayer = players.find(p => p.draftOrder === 1);
    if (firstPlayer) {
      setCurrentPlayer(firstPlayer.id);
    }
  };

  const renderTeamList = (teams: Team[]) => (
    <div className="space-y-4">
      {teams.map((team) => (
        <div
          key={team.id}
          className="p-6 rounded-xl shadow-sm bg-white border border-gray-100"
        >
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="flex flex-col">
                <span className="font-bold text-xl text-gray-800">
                  {team.name} {team.isFirstFour && '🏀'}
                </span>
                <div className="flex items-center gap-3 mt-1">
                  <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-md text-sm font-medium">
                    #{team.seed}
                  </span>
                  <span className="px-2 py-1 bg-gray-100 text-gray-700 rounded-md text-sm font-medium">
                    {team.region}
                  </span>
                </div>
              </div>
            </div>
            {team.odds && (
              <div className="text-sm text-right space-y-1">
                <div className="px-3 py-1 bg-green-50 text-green-700 rounded-md font-medium">
                  Championship: +{team.odds.championship}
                </div>
                <div className="px-3 py-1 bg-purple-50 text-purple-700 rounded-md font-medium">
                  Final Four: +{team.odds.finalFour}
                </div>
                <div className="px-3 py-1 bg-orange-50 text-orange-700 rounded-md font-medium">
                  Elite Eight: +{team.odds.eliteEight}
                </div>
                <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md font-medium">
                  Sweet 16: {team.odds.sweetSixteen > 0 ? '+' : ''}{team.odds.sweetSixteen}
                </div>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );

  return (
    <main className="min-h-screen p-8 bg-slate-100">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-8 text-slate-800">
          8th Annual Havey Pool
        </h1>
        
        {!draftStarted && !isDraftComplete ? (
          <div className="bg-white p-6 rounded-lg shadow-md max-w-2xl mx-auto">
            <h2 className="text-2xl font-semibold mb-6 text-center text-slate-800">Enter Player Names and Draft Order</h2>
            <div className="space-y-4">
              {players.map((player) => (
                <div key={player.id} className="flex items-center gap-4">
                  <label className="w-24 font-medium text-slate-700">Player {player.id}:</label>
                  <input
                    type="text"
                    value={player.name}
                    onChange={(e) => handleNameChange(player.id, e.target.value)}
                    className="flex-1 p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                    placeholder={`Enter Player ${player.id}'s name`}
                  />
                  <select
                    value={player.draftOrder}
                    onChange={(e) => handleDraftOrderChange(player.id, parseInt(e.target.value))}
                    className="w-24 p-2 border border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-slate-800"
                  >
                    <option value={0}>Order</option>
                    {[1, 2, 3, 4].map((order) => (
                      <option key={order} value={order}>
                        {order}
                      </option>
                    ))}
                  </select>
                </div>
              ))}
            </div>
            <div className="mt-6 flex items-center justify-center gap-4">
              <label className="flex items-center gap-2 text-slate-700">
                <input
                  type="checkbox"
                  checked={isSnake}
                  onChange={(e) => setIsSnake(e.target.checked)}
                  className="w-4 h-4 text-blue-600 focus:ring-blue-500"
                />
                Snake Draft
              </label>
            </div>
            <button
              onClick={startDraft}
              disabled={!canStartDraft}
              className={`mt-6 w-full py-3 rounded-lg transition-colors ${
                canStartDraft
                  ? 'bg-blue-600 text-white hover:bg-blue-700'
                  : 'bg-slate-300 text-slate-500 cursor-not-allowed'
              }`}
            >
              Start Draft
            </button>
          </div>
        ) : isDraftComplete ? (
          <div className="max-w-7xl mx-auto space-y-8">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-8">Draft Results</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {players
                .sort((a, b) => a.draftOrder - b.draftOrder)
                .map((player) => (
                  <div key={player.id} className="space-y-4">
                    <div className="bg-white rounded-xl shadow-md p-6">
                      <h3 className="text-xl font-bold text-gray-800 mb-4">{player.name}</h3>
                      {renderTeamList(player.teams)}
                    </div>
                  </div>
                ))}
            </div>
            <div className="mt-8 flex justify-center">
              <button
                onClick={restartDraft}
                className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
              >
                Start New Draft
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Draft Order */}
            <div className="space-y-6">
              <div className="p-6 bg-white rounded-xl shadow-md mb-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Draft Order</h2>
                <div className="space-y-2">
                  {players
                    .sort((a, b) => a.draftOrder - b.draftOrder)
                    .map((player) => (
                      <div
                        key={player.id}
                        className={`p-3 rounded ${
                          currentPlayer === player.id
                            ? 'bg-blue-100 border-2 border-blue-600 text-blue-900 font-semibold'
                            : 'bg-gray-100 border border-gray-300 text-gray-800'
                        }`}
                      >
                        {player.name} ({player.teams.length} teams)
                      </div>
                    ))}
                </div>
                <div className="mt-4 text-sm font-medium text-gray-700">
                  Round {draftRound} - {getDraftDirection()} - Pick {pickNumber}
                </div>
              </div>

              {/* Regional Teams Table */}
              <div className="p-6 bg-white rounded-xl shadow-md mb-6">
                <h2 className="text-2xl font-bold mb-4 text-gray-800">Teams by Region</h2>
                <div className="grid grid-cols-4 gap-4">
                  {['South', 'West', 'East', 'Midwest'].map((region) => (
                    <div key={region} className="flex flex-col">
                      <h3 className="text-lg font-semibold mb-2 text-center text-gray-800">{region}</h3>
                      <div className="space-y-2">
                        {teams
                          .filter(team => team.region === region)
                          .sort((a, b) => {
                            if (a.seed !== b.seed) return a.seed - b.seed;
                            if (a.isFirstFour && !b.isFirstFour) return 1;
                            if (!a.isFirstFour && b.isFirstFour) return -1;
                            return 0;
                          })
                          .map(team => {
                            const draftedBy = players.find(p => p.teams.some(t => t.id === team.id));
                            const getPlayerColor = () => {
                              if (!draftedBy) return 'bg-gray-100';
                              switch (draftedBy.draftOrder) {
                                case 1: return 'bg-red-100';
                                case 2: return 'bg-blue-100';
                                case 3: return 'bg-green-100';
                                case 4: return 'bg-purple-100';
                                default: return 'bg-gray-100';
                              }
                            };
                            const getPlayerTextColor = () => {
                              if (!draftedBy) return 'text-gray-800';
                              switch (draftedBy.draftOrder) {
                                case 1: return 'text-red-900';
                                case 2: return 'text-blue-900';
                                case 3: return 'text-green-900';
                                case 4: return 'text-purple-900';
                                default: return 'text-gray-800';
                              }
                            };
                            return (
                              <div key={team.id} className={`flex items-center gap-2 p-2 ${getPlayerColor()} rounded border ${team.isFirstFour ? 'border-yellow-400' : 'border-gray-300'}`}>
                                <span className="px-2 py-1 bg-blue-200 text-blue-900 rounded-md text-sm font-medium">
                                  #{team.seed}
                                </span>
                                <span className={`font-medium ${getPlayerTextColor()}`}>
                                  {team.name}
                                  {team.isFirstFour && ' 🏀'}
                                  {draftedBy && ` (${draftedBy.name})`}
                                </span>
                              </div>
                            );
                          })}
                      </div>
                    </div>
                  ))}
                </div>
                <div className="mt-4 flex gap-4 justify-center">
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-red-100 border border-red-300 rounded"></div>
                    <span className="text-sm font-medium text-gray-700">Player 1</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-blue-100 border border-blue-300 rounded"></div>
                    <span className="text-sm font-medium text-gray-700">Player 2</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-green-100 border border-green-300 rounded"></div>
                    <span className="text-sm font-medium text-gray-700">Player 3</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 bg-purple-100 border border-purple-300 rounded"></div>
                    <span className="text-sm font-medium text-gray-700">Player 4</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Team Selection */}
            <div className="bg-white p-6 rounded-lg shadow-md">
              <h2 className="text-2xl font-semibold mb-4 text-slate-800">
                {players.find(p => p.id === currentPlayer)?.name}&apos;s Turn
              </h2>
              <TeamSelector
                onSelectTeam={handleTeamSelect}
                selectedTeams={getSelectedTeams()}
              />
            </div>
          </div>
        )}

        {draftStarted && (
          <div className="flex justify-center gap-4 mt-8">
            <button
              onClick={restartDraft}
              className="px-6 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
            >
              Restart Draft
            </button>
          </div>
        )}

        {isDraftComplete && (
          <div className="mt-8 text-center">
            <p className="text-gray-600">Don&apos;t forget to save your draft!</p>
          </div>
        )}
      </div>
    </main>
  );
}
