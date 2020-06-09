import { SeasonAvgByYear } from './stats.model';
import { CommonState } from '@store';

export const StatsSelector = {
  isLoading(state: CommonState): boolean {
    return state.stats.isLoading;
  },
  getPlayerStats(playerId: number) {
    return (state: CommonState): SeasonAvgByYear => {
      return state.stats.seasonAvgByPlayer[playerId];
    };
  },
  getErrorMessage(state: CommonState): string {
    return state.stats.errorMessage;
  }
};
