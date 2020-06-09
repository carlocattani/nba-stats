import { Store, createStore, combineReducers } from 'redux';
import { statsReducer } from './stats.reducer';
import { StatsAction } from './stats.action';
import { StatsSelector } from './stats.selector';
import { StatsTesting } from '@testing';

describe('Stats', () => {
  let store: Store;

  beforeEach(() => {
    store = createStore(combineReducers({ stats: statsReducer }));
  });

  describe('Season averages', () => {
    beforeEach(() => {
      store.dispatch(
        StatsAction.getSeasonAverages.success(StatsTesting.mockSeasonAveragesResponse)
      );
    });

    it('should store stats for the player', () => {
      const playerId = StatsTesting.mockSeasonAverages.player_id;
      const season = StatsTesting.mockSeasonAverages.season;
      const stats = StatsSelector.getPlayerStats(playerId)(store.getState());
      expect(stats[season]).toEqual(StatsTesting.mockSeasonAverages);
    });
  });
});
