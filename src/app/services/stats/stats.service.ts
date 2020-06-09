import { SeasonAveragesResponse, SeasonAveragesRequest } from './stats.model';
import qs from 'query-string';
import { ServicesUtil } from '../common/services.util';

export const StatsService = {
  /**
   * endpoint to retrieve season averages for one or more players
   * @param request
   * season: default current season
   * player_ids: an array of player ids
   */
  fetchSeasonAverages: (request: SeasonAveragesRequest): Promise<SeasonAveragesResponse> => {
    const params = qs.stringify(request, { arrayFormat: 'bracket' });
    const endpoint = `${ServicesUtil.API}/season_averages?${params}`;
    return fetch(endpoint).then(r => ServicesUtil.toJsonResponse<SeasonAveragesResponse>(r));
  }
};
