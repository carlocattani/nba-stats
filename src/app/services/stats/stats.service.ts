import { SeasonAveragesResponse, SeasonAveragesRequest } from './stats.model';
import qs from 'query-string';
import { API, toJsonResponse } from '../common/services.util';

/**
 * Endpoint to retrieve season averages for one or more players
 * @param request
 * season: default current season
 * player_ids: an array of player ids
 */
export const fetchSeasonAverages = (
  request: SeasonAveragesRequest
): Promise<SeasonAveragesResponse> => {
  const params = qs.stringify(request, { arrayFormat: 'bracket' });
  const endpoint = `${API}/season_averages?${params}`;
  return fetch(endpoint).then(r => toJsonResponse<SeasonAveragesResponse>(r));
};
