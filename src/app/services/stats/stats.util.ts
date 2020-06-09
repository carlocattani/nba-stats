import { SeasonAveragesLabelMap } from './stats.model';

const seasonAveragesLabelMap: SeasonAveragesLabelMap = {
  games_played: { code: 'GP', description: 'Games Played' },
  min: { code: 'MIN', description: 'Minutes Played' },
  fgm: { code: 'FGM', description: 'Field Goals Made' },
  fga: { code: 'FGA', description: 'Field Goals Attempted' },
  fg3m: { code: '3FGM', description: '3PT Field Goals Made' },
  fg3a: { code: '3FGA', description: '3PT Field Goals Attempted' },
  ftm: { code: 'FTM', description: 'Free Throws Made' },
  fta: { code: 'FTA', description: 'Free Throws Attempted' },
  oreb: { code: 'OREB', description: 'Offensive Rebounds' },
  dreb: { code: 'DREB', description: 'Defensive Rebounds' },
  reb: { code: 'REB', description: 'Rebounds' },
  ast: { code: 'AST', description: 'Assists' },
  stl: { code: 'STL', description: 'Steals' },
  blk: { code: 'BLK', description: 'Blocks' },
  turnover: { code: 'TOV', description: 'Turnovers' },
  pf: { code: 'PF', description: 'Personal Fouls' },
  pts: { code: 'PTS', description: 'Points' },
  fg_pct: { code: 'FG%', description: 'Field Goal %' },
  fg3_pct: { code: 'FG3%', description: '3PT Field Goal %' },
  ft_pct: { code: 'FT%', description: 'Free Throw %' }
};

const firstSeason: number = 1950;

// TODO improve logic to determine the current season
const currentSeason: number = new Date().getFullYear() - 1;

const validateYear = (value: string): number | undefined => {
  const numericValue = +value;
  return numericValue >= firstSeason && numericValue <= currentSeason ? numericValue : undefined;
};

export const StatsUtil = {
  seasonAveragesLabelMap,
  firstSeason,
  currentSeason,
  validateYear
};
