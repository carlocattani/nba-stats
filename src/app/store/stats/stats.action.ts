import { SeasonAveragesResponse, SeasonAveragesRequest } from '@services';
import { createAsyncAction } from 'typesafe-actions';

export const StatsAction = {
  // fetches season averages for a player from the api
  getSeasonAverages: createAsyncAction(
    '[Stats] Get Season Averages Request',
    '[Stats] Get Season Averages Success',
    '[Stats] Get Season Averages Failure'
  )<SeasonAveragesRequest, SeasonAveragesResponse, Error>()
};
