import { StatsState, SeasonAvgByYear, SeasonAvgByPlayer } from './stats.model';
import { createReducer, Action } from 'typesafe-actions';
import { StatsAction } from './stats.action';
import { SeasonAverages } from '@services';

const initialState: StatsState = {
  seasonAvgByPlayer: {}
};

export const statsReducer = createReducer<StatsState, Action>(initialState)
  .handleAction(StatsAction.getSeasonAverages.request, state => ({
    ...state,
    isLoading: true,
    errorMessage: undefined
  }))
  .handleAction(StatsAction.getSeasonAverages.success, (state, { payload }) => {
    let seasonAvgByPlayer = { ...state.seasonAvgByPlayer };
    payload.data?.forEach((avg: SeasonAverages) => {
      const playerId = avg.player_id;
      const season = avg.season;
      const avgByYear: SeasonAvgByYear = { ...(seasonAvgByPlayer[playerId] || {}), [season]: avg };
      const avgByPlayer: SeasonAvgByPlayer = {
        ...seasonAvgByPlayer,
        [playerId]: avgByYear
      };
      console.log('avgByPlayer', avgByPlayer);
      seasonAvgByPlayer = avgByPlayer;
      console.log('seasonAvgByPlayer', seasonAvgByPlayer);
    });
    return {
      ...state,
      seasonAvgByPlayer: seasonAvgByPlayer,
      isLoading: false
    };
  })
  .handleAction(StatsAction.getSeasonAverages.failure, (state, { payload }) => ({
    ...state,
    errorMessage: payload.message,
    isLoading: false
  }));
