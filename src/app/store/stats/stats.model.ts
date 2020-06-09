import { SeasonAverages } from '@services';

// the key is the year
export type SeasonAvgByYear = Record<number, SeasonAverages>;

// the key is the player id
export type SeasonAvgByPlayer = Record<number, SeasonAvgByYear>;

export interface StatsState {
  seasonAvgByPlayer: SeasonAvgByPlayer;
  isLoading?: boolean;
  errorMessage?: string;
}
