import { Player } from '@services';

const mockPlayer: Player = {
  id: 237,
  first_name: 'LeBron',
  last_name: 'James',
  position: 'F',
  height_feet: 6,
  height_inches: 8,
  weight_pounds: 250,
  team: {
    id: 14,
    abbreviation: 'LAL',
    city: 'Los Angeles',
    conference: 'West',
    division: 'Pacific',
    full_name: 'Los Angeles Lakers',
    name: 'Lakers'
  }
};

const mockPlayers: Player[] = [
  {
    id: 241,
    first_name: 'Amir',
    height_feet: 6,
    height_inches: 9,
    last_name: 'Johnson',
    position: 'C-F',
    team: {
      id: 23,
      abbreviation: 'PHI',
      city: 'Philadelphia',
      conference: 'East',
      division: 'Atlantic',
      full_name: 'Philadelphia 76ers',
      name: '76ers'
    },
    weight_pounds: 240
  },
  {
    id: 495,
    first_name: 'John',
    height_feet: null,
    height_inches: null,
    last_name: 'Morton',
    position: '',
    team: {
      id: 6,
      abbreviation: 'CLE',
      city: 'Cleveland',
      conference: 'East',
      division: 'Central',
      full_name: 'Cleveland Cavaliers',
      name: 'Cavaliers'
    },
    weight_pounds: null
  },
  {
    id: 498,
    first_name: 'John',
    height_feet: null,
    height_inches: null,
    last_name: 'Salley',
    position: '',
    team: {
      id: 9,
      abbreviation: 'DET',
      city: 'Detroit',
      conference: 'East',
      division: 'Central',
      full_name: 'Detroit Pistons',
      name: 'Pistons'
    },
    weight_pounds: null
  },
  {
    id: 501,
    first_name: 'Kevin',
    height_feet: null,
    height_inches: null,
    last_name: 'Johnson',
    position: '',
    team: {
      id: 24,
      abbreviation: 'PHX',
      city: 'Phoenix',
      conference: 'West',
      division: 'Pacific',
      full_name: 'Phoenix Suns',
      name: 'Suns'
    },
    weight_pounds: null
  },
  {
    id: 507,
    first_name: 'Steve',
    height_feet: null,
    height_inches: null,
    last_name: 'Johnson',
    position: '',
    team: {
      id: 10,
      abbreviation: 'GSW',
      city: 'Golden State',
      conference: 'West',
      division: 'Pacific',
      full_name: 'Golden State Warriors',
      name: 'Warriors'
    },
    weight_pounds: null
  },
  {
    id: 561,
    first_name: 'Avery',
    height_feet: null,
    height_inches: null,
    last_name: 'Johnson',
    position: '',
    team: {
      id: 8,
      abbreviation: 'DEN',
      city: 'Denver',
      conference: 'West',
      division: 'Northwest',
      full_name: 'Denver Nuggets',
      name: 'Nuggets'
    },
    weight_pounds: null
  }
];

export const PlayerTesting = {
  mockPlayer,
  mockPlayers
};
