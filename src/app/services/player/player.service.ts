import { PlayersResponse, PlayersRequest, Player } from './player.model';
import qs from 'query-string';
import { toJsonResponse, toBlobResponse, API } from '../common/services.util';

/**
 * Endpoint to retrieve players from all seasons
 * @param request
 * page: default 0
 * per_page: default 25
 * search: filter players based on their first or last name
 */
export const fetchPlayers = (request: PlayersRequest): Promise<PlayersResponse> => {
  const params = qs.stringify(request);
  const endpoint = `${API}/players?${params}`;
  return fetch(endpoint).then(r => toJsonResponse<PlayersResponse>(r));
};

/**
 * endpoint to retrieve a single player
 * @param id
 */
export const fetchPlayer = (id: number): Promise<Player> => {
  const endpoint = `${API}/players/${id}`;
  return fetch(endpoint).then(r => toJsonResponse<Player>(r));
};

/**
 * endpoint to retrieve the player picture
 * @param firstName
 * @param lastName
 */
export const fetchPlayerPicture = (firstName: string, lastName: string): Promise<Blob> => {
  const endpoint = `https://nba-players.herokuapp.com/players/${lastName}/${firstName}`;
  return fetch(endpoint).then(response => {
    const contentType = response.headers.get('content-type');
    if (contentType?.indexOf('image') > -1) {
      return toBlobResponse(response);
    }
    return Promise.reject('Picture not found');
  });
};
