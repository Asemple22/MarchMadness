'use client';

import { useState, useMemo } from 'react';

interface Team {
  id: string;
  name: string;
  seed: number;
  region: string;
  isFirstFour?: boolean;
  ev: number;
  odds: {
    championship: number;
    finalFour: number;
    eliteEight: number;
    sweetSixteen: number;
  };
}

interface TeamSelectorProps {
  onSelectTeam: (team: Team) => void;
  selectedTeams: string[];
}

export default function TeamSelector({ onSelectTeam, selectedTeams }: TeamSelectorProps) {
  const [teams] = useState<Team[]>([
    // East Region (E)
    { id: '1', name: 'Duke', seed: 1, region: 'East', ev: 96.7, odds: { championship: 320, finalFour: -120, eliteEight: -260, sweetSixteen: -800 } },
    { id: '2', name: 'Mississippi St.', seed: 8, region: 'East', ev: 57.0, odds: { championship: 10000, finalFour: 850, eliteEight: 900, sweetSixteen: 900 } },
    { id: '3', name: 'Baylor', seed: 9, region: 'East', ev: 46.0, odds: { championship: 6000, finalFour: 3500, eliteEight: 1000, sweetSixteen: 750 } },
    { id: '4', name: 'Oregon', seed: 5, region: 'East', ev: 66.1, odds: { championship: 13000, finalFour: 2200, eliteEight: 1300, sweetSixteen: 250 } },
    { id: '5', name: 'Liberty', seed: 12, region: 'East', ev: 52.0, odds: { championship: 35000, finalFour: 20000, eliteEight: 3000, sweetSixteen: 650 } },
    { id: '6', name: 'Arizona', seed: 4, region: 'East', ev: 80.0, odds: { championship: 2500, finalFour: 950, eliteEight: 450, sweetSixteen: -180 } },
    { id: '7', name: 'Akron', seed: 13, region: 'East', ev: 47.5, odds: { championship: 30000, finalFour: 20000, eliteEight: 10000, sweetSixteen: 1100 } },
    { id: '8', name: 'BYU', seed: 6, region: 'East', ev: 71.0, odds: { championship: 4000, finalFour: 1500, eliteEight: 425, sweetSixteen: 180 } },
    { id: '9', name: 'VCU', seed: 11, region: 'East', ev: 63.8, odds: { championship: 9000, finalFour: 4000, eliteEight: 900, sweetSixteen: 380 } },
    { id: '10', name: 'Wisconsin', seed: 3, region: 'East', ev: 82.5, odds: { championship: 1800, finalFour: 850, eliteEight: 300, sweetSixteen: -145 } },
    { id: '11', name: 'Montana', seed: 14, region: 'East', ev: 17.3, odds: { championship: 50000, finalFour: 20000, eliteEight: 10000, sweetSixteen: 2000 } },
    { id: '12', name: "Saint Mary's", seed: 7, region: 'East', ev: 68.2, odds: { championship: 4500, finalFour: 1800, eliteEight: 500, sweetSixteen: 270 } },
    { id: '13', name: 'Vanderbilt', seed: 10, region: 'East', ev: 53.1, odds: { championship: 15000, finalFour: 6000, eliteEight: 1500, sweetSixteen: 750 } },
    { id: '14', name: 'Alabama', seed: 2, region: 'East', ev: 88.7, odds: { championship: 850, finalFour: 450, eliteEight: 120, sweetSixteen: -200 } },
    { id: '15', name: 'Robert Morris', seed: 15, region: 'East', ev: 15.5, odds: { championship: 50000, finalFour: 50000, eliteEight: 15000, sweetSixteen: 10000 } },
    { id: '16', name: 'American', seed: 16, region: 'East', isFirstFour: true, ev: 19.8, odds: { championship: 50000, finalFour: 50000, eliteEight: 15000, sweetSixteen: 10000 } },
    { id: '17', name: 'Mount St. Mary\'s', seed: 16, region: 'East', isFirstFour: true, ev: 19.5, odds: { championship: 50000, finalFour: 50000, eliteEight: 15000, sweetSixteen: 10000 } },

    // West Region
    { id: '18', name: 'Florida', seed: 1, region: 'West', ev: 100.0, odds: { championship: 380, finalFour: -125, eliteEight: -240, sweetSixteen: -750 } },
    { id: '19', name: 'Norfolk St.', seed: 16, region: 'West', ev: 14.5, odds: { championship: 50000, finalFour: 50000, eliteEight: 5000, sweetSixteen: 10000 } },
    { id: '20', name: 'UConn', seed: 8, region: 'West', ev: 71.0, odds: { championship: 5000, finalFour: 2000, eliteEight: 850, sweetSixteen: 600 } },
    { id: '21', name: 'Oklahoma', seed: 9, region: 'West', ev: 55.0, odds: { championship: 18000, finalFour: 8000, eliteEight: 1500, sweetSixteen: 1200 } },
    { id: '22', name: 'Memphis', seed: 5, region: 'West', ev: 65.0, odds: { championship: 9000, finalFour: 5500, eliteEight: 2000, sweetSixteen: 600 } },
    { id: '23', name: 'Colorado St.', seed: 12, region: 'West', ev: 54.9, odds: { championship: 15000, finalFour: 6500, eliteEight: 1500, sweetSixteen: 400 } },
    { id: '24', name: 'Maryland', seed: 4, region: 'West', ev: 78.7, odds: { championship: 1200, finalFour: 750, eliteEight: 360, sweetSixteen: -180 } },
    { id: '25', name: 'Grand Canyon', seed: 13, region: 'West', ev: 49.1, odds: { championship: 25000, finalFour: 20000, eliteEight: 8000, sweetSixteen: 900 } },
    { id: '26', name: 'Missouri', seed: 6, region: 'West', ev: 68.0, odds: { championship: 5000, finalFour: 2200, eliteEight: 500, sweetSixteen: 250 } },
    { id: '27', name: 'Drake', seed: 11, region: 'West', ev: 55.6, odds: { championship: 15000, finalFour: 9000, eliteEight: 1500, sweetSixteen: 700 } },
    { id: '28', name: 'Texas Tech', seed: 3, region: 'West', ev: 84.5, odds: { championship: 1200, finalFour: 550, eliteEight: 135, sweetSixteen: -145 } },
    { id: '29', name: 'UNC Wilmington', seed: 14, region: 'West', ev: 17.5, odds: { championship: 50000, finalFour: 25000, eliteEight: 10000, sweetSixteen: 2500 } },
    { id: '30', name: 'Kansas', seed: 7, region: 'West', ev: 62.3, odds: { championship: 6000, finalFour: 1800, eliteEight: 550, sweetSixteen: 210 } },
    { id: '31', name: 'Arkansas', seed: 10, region: 'West', ev: 55.0, odds: { championship: 9000, finalFour: 5000, eliteEight: 1000, sweetSixteen: 550 } },
    { id: '32', name: "St. John's", seed: 2, region: 'West', ev: 77.8, odds: { championship: 1800, finalFour: 600, eliteEight: 210, sweetSixteen: -170 } },
    { id: '33', name: 'Omaha', seed: 15, region: 'West', ev: 15.0, odds: { championship: 50000, finalFour: 50000, eliteEight: 10000, sweetSixteen: 5000 } },

    // South Region (S)
    { id: '34', name: 'Auburn', seed: 1, region: 'South', ev: 94.2, odds: { championship: 400, finalFour: -135, eliteEight: -180, sweetSixteen: -400 } },
    { id: '35', name: 'Louisville', seed: 8, region: 'South', ev: 60.9, odds: { championship: 4000, finalFour: 2200, eliteEight: 600, sweetSixteen: 750 } },
    { id: '36', name: 'Creighton', seed: 9, region: 'South', ev: 59.7, odds: { championship: 5000, finalFour: 3000, eliteEight: 850, sweetSixteen: 700 } },
    { id: '37', name: 'Michigan', seed: 5, region: 'South', ev: 47.0, odds: { championship: 4500, finalFour: 1800, eliteEight: 950, sweetSixteen: 190 } },
    { id: '38', name: 'UC San Diego', seed: 12, region: 'South', ev: 54.4, odds: { championship: 9000, finalFour: 7000, eliteEight: 1200, sweetSixteen: 390 } },
    { id: '39', name: 'Texas A&M', seed: 4, region: 'South', ev: 71.0, odds: { championship: 3500, finalFour: 1600, eliteEight: 650, sweetSixteen: 120 } },
    { id: '40', name: 'Yale', seed: 13, region: 'South', ev: 50.6, odds: { championship: 50000, finalFour: 15000, eliteEight: 5000, sweetSixteen: 600 } },
    { id: '41', name: 'Ole Miss', seed: 6, region: 'South', ev: 47.2, odds: { championship: 6500, finalFour: 2000, eliteEight: 500, sweetSixteen: 220 } },
    { id: '42', name: 'Iowa St.', seed: 3, region: 'South', ev: 83.3, odds: { championship: 3000, finalFour: 750, eliteEight: 220, sweetSixteen: -140 } },
    { id: '43', name: 'Lipscomb', seed: 14, region: 'South', ev: 17.0, odds: { championship: 50000, finalFour: 35000, eliteEight: 8000, sweetSixteen: 2000 } },
    { id: '44', name: 'Marquette', seed: 7, region: 'South', ev: 59.4, odds: { championship: 7000, finalFour: 2500, eliteEight: 500, sweetSixteen: 260 } },
    { id: '45', name: 'New Mexico', seed: 10, region: 'South', ev: 57.9, odds: { championship: 15000, finalFour: 6000, eliteEight: 850, sweetSixteen: 500 } },
    { id: '46', name: 'Michigan St.', seed: 2, region: 'South', ev: 89.5, odds: { championship: 1500, finalFour: 500, eliteEight: 140, sweetSixteen: -180 } },
    { id: '47', name: 'Bryant', seed: 15, region: 'South', ev: 15.3, odds: { championship: 50000, finalFour: 50000, eliteEight: 5000, sweetSixteen: 2500 } },
    { id: '48', name: 'Alabama St.', seed: 16, region: 'South', isFirstFour: true, ev: 20.0, odds: { championship: 50000, finalFour: 50000, eliteEight: 15000, sweetSixteen: 10000 } },
    { id: '49', name: 'Saint Francis U', seed: 16, region: 'South', isFirstFour: true, ev: 19.5, odds: { championship: 50000, finalFour: 50000, eliteEight: 15000, sweetSixteen: 10000 } },
    { id: '50', name: 'San Diego St.', seed: 11, region: 'South', isFirstFour: true, ev: 63.2, odds: { championship: 25000, finalFour: 15000, eliteEight: 1500, sweetSixteen: 950 } },
    { id: '51', name: 'North Carolina', seed: 11, region: 'South', isFirstFour: true, ev: 63.5, odds: { championship: 12000, finalFour: 5500, eliteEight: 1000, sweetSixteen: 425 } },

    // Midwest Region (MW)
    { id: '52', name: 'Houston', seed: 1, region: 'Midwest', ev: 98.5, odds: { championship: 600, finalFour: 105, eliteEight: -145, sweetSixteen: -350 } },
    { id: '53', name: 'SIU Edwardsville', seed: 16, region: 'Midwest', ev: 14.4, odds: { championship: 50000, finalFour: 50000, eliteEight: 15000, sweetSixteen: 10000 } },
    { id: '54', name: 'Gonzaga', seed: 8, region: 'Midwest', ev: 69.1, odds: { championship: 2000, finalFour: 950, eliteEight: 425, sweetSixteen: 340 } },
    { id: '55', name: 'Georgia', seed: 9, region: 'Midwest', ev: 44.6, odds: { championship: 5000, finalFour: 3500, eliteEight: 1000, sweetSixteen: 1000 } },
    { id: '56', name: 'Clemson', seed: 5, region: 'Midwest', ev: 75.5, odds: { championship: 4000, finalFour: 1400, eliteEight: 650, sweetSixteen: 140 } },
    { id: '57', name: 'McNeese', seed: 12, region: 'Midwest', ev: 41.0, odds: { championship: 20000, finalFour: 9000, eliteEight: 1500, sweetSixteen: 700 } },
    { id: '58', name: 'Purdue', seed: 4, region: 'Midwest', ev: 70.3, odds: { championship: 4500, finalFour: 1300, eliteEight: 650, sweetSixteen: 120 } },
    { id: '59', name: 'High Point', seed: 13, region: 'Midwest', ev: 48.6, odds: { championship: 50000, finalFour: 15000, eliteEight: 10000, sweetSixteen: 1200 } },
    { id: '60', name: 'Illinois', seed: 6, region: 'Midwest', ev: 73.2, odds: { championship: 5000, finalFour: 1500, eliteEight: 475, sweetSixteen: 130 } },
    { id: '61', name: 'Kentucky', seed: 3, region: 'Midwest', ev: 72.0, odds: { championship: 3000, finalFour: 1000, eliteEight: 360, sweetSixteen: 100 } },
    { id: '62', name: 'Troy', seed: 14, region: 'Midwest', ev: 18.8, odds: { championship: 50000, finalFour: 25000, eliteEight: 10000, sweetSixteen: 2000 } },
    { id: '63', name: 'UCLA', seed: 7, region: 'Midwest', ev: 67.2, odds: { championship: 7000, finalFour: 2800, eliteEight: 550, sweetSixteen: 320 } },
    { id: '64', name: 'Utah St.', seed: 10, region: 'Midwest', ev: 44.4, odds: { championship: 25000, finalFour: 11000, eliteEight: 3000, sweetSixteen: 800 } },
    { id: '65', name: 'Tennessee', seed: 2, region: 'Midwest', ev: 91.8, odds: { championship: 900, finalFour: 390, eliteEight: 100, sweetSixteen: -270 } },
    { id: '66', name: 'Wofford', seed: 15, region: 'Midwest', ev: 15.2, odds: { championship: 50000, finalFour: 50000, eliteEight: 10000, sweetSixteen: 5000 } },
    { id: '67', name: 'Texas', seed: 11, region: 'Midwest', isFirstFour: true, ev: 62.7, odds: { championship: 20000, finalFour: 15000, eliteEight: 900, sweetSixteen: 750 } },
    { id: '68', name: 'Xavier', seed: 11, region: 'Midwest', isFirstFour: true, ev: 62.9, odds: { championship: 25000, finalFour: 12000, eliteEight: 3500, sweetSixteen: 750 } }
  ]);

  const [sortBy, setSortBy] = useState<'seed' | 'championship' | 'finalFour' | 'eliteEight' | 'sweetSixteen' | 'ev'>('seed');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredTeams = teams.filter(team => 
    team.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const sortedTeams = [...filteredTeams].sort((a, b) => {
    switch (sortBy) {
      case 'seed':
        return a.seed - b.seed;
      case 'championship':
        return a.odds.championship - b.odds.championship;
      case 'finalFour':
        return a.odds.finalFour - b.odds.finalFour;
      case 'eliteEight':
        return a.odds.eliteEight - b.odds.eliteEight;
      case 'sweetSixteen':
        return a.odds.sweetSixteen - b.odds.sweetSixteen;
      case 'ev':
        return b.ev - a.ev;
      default:
        return 0;
    }
  });

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      <div className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md">
        <label className="text-sm font-semibold text-gray-700">Sort by:</label>
        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value as typeof sortBy)}
          className="p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        >
          <option value="seed">Sort by Seed</option>
          <option value="championship">Sort by Championship Odds</option>
          <option value="finalFour">Sort by Final Four Odds</option>
          <option value="eliteEight">Sort by Elite Eight Odds</option>
          <option value="sweetSixteen">Sort by Sweet 16 Odds</option>
          <option value="ev">Sort by EV</option>
        </select>
        <input
          type="text"
          placeholder="Search teams..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-gray-700 font-medium"
        />
      </div>

      <div className="grid grid-cols-1 gap-4">
        {sortedTeams.filter(team => !selectedTeams.includes(team.id)).map((team) => (
          <div
            key={`${team.region}-${team.seed}-${team.id}`}
            className={`p-6 rounded-xl shadow-sm transition-all duration-200 bg-white hover:shadow-md hover:scale-[1.01] cursor-pointer ${
              team.isFirstFour ? 'border-2 border-yellow-400' : 'border border-gray-100'
            }`}
            onClick={() => onSelectTeam(team)}
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
              <div className="text-sm text-right space-y-1">
                <div className="px-3 py-1 bg-yellow-50 text-yellow-700 rounded-md font-medium">
                  EV: {team.ev}%
                </div>
                <div className="px-3 py-1 bg-green-50 text-green-700 rounded-md font-medium">
                  Championship: {team.odds.championship > 0 ? '+' : ''}{team.odds.championship}
                </div>
                <div className="px-3 py-1 bg-purple-50 text-purple-700 rounded-md font-medium">
                  Final Four: {team.odds.finalFour > 0 ? '+' : ''}{team.odds.finalFour}
                </div>
                <div className="px-3 py-1 bg-orange-50 text-orange-700 rounded-md font-medium">
                  Elite Eight: {team.odds.eliteEight > 0 ? '+' : ''}{team.odds.eliteEight}
                </div>
                <div className="px-3 py-1 bg-blue-50 text-blue-700 rounded-md font-medium">
                  Sweet 16: {team.odds.sweetSixteen > 0 ? '+' : ''}{team.odds.sweetSixteen}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 