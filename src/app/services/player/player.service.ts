import { PlayersResponse, PlayersRequest } from './player.model';
import qs from 'query-string';

/**
 * Endpoint to retrieve players from all seasons.
 * page: default 0
 * per_page: default 25
 * search: filter players based on their first or last name
 */
export const fetchPlayers = (request: PlayersRequest): Promise<PlayersResponse> => {
  const params = qs.stringify(request);
  const endpoint = `https://www.balldontlie.io/api/v1/players?${params}`;
  return fetch(endpoint)
    .then(response => Promise.all([response.ok, response.json()]))
    .then(([ok, data]) => {
      if (ok) {
        return data as Promise<PlayersResponse>;
      }
      throw Error(data.error);
    })
    .catch(e => handleError(e));
};

const handleError = (errorMessage: string): PlayersResponse => {
  console.warn('Failed to fetch players', errorMessage);
  throw new Error('Something went wrong');
};
