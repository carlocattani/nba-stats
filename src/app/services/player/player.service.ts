import { PlayersResponse, PlayersRequest, Player } from './player.model';
import qs from 'query-string';
import { ServicesUtil } from '../common/services.util';

export const PlayerService = {
  /**
   * endpoint to retrieve players from all seasons
   * @param request
   * page: default 0
   * per_page: default 25
   * search: filter players based on their first or last name
   */
  fetchPlayers: (request: PlayersRequest): Promise<PlayersResponse> => {
    const params = qs.stringify(request);
    const endpoint = `${ServicesUtil.API}/players?${params}`;
    return fetch(endpoint).then(r => ServicesUtil.toJsonResponse<PlayersResponse>(r));
  },

  /**
   * endpoint to retrieve a single player
   * @param id
   */
  fetchPlayer: (id: number): Promise<Player> => {
    const endpoint = `${ServicesUtil.API}/players/${id}`;
    return fetch(endpoint).then(r => ServicesUtil.toJsonResponse<Player>(r));
  },

  /**
   * endpoint to retrieve the player picture
   * @param firstName
   * @param lastName
   */
  fetchPlayerPicture: (firstName: string, lastName: string): Promise<Blob> => {
    const endpoint = `https://nba-players.herokuapp.com/players/${lastName}/${firstName}`;
    return fetch(endpoint).then(response => {
      const contentType = response.headers.get('content-type');
      if (contentType?.indexOf('image') > -1) {
        return ServicesUtil.toBlobResponse(response);
      }
      return Promise.reject('Picture not found');
    });
  }
};
