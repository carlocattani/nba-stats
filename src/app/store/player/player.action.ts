import { createAsyncAction, createAction } from 'typesafe-actions';
import { Player } from '@services';

export const PlayerAction = {
  setPlayer: createAction('[Player] Set Player')<Player>(),

  // fetches a player from the api
  getPlayer: createAsyncAction(
    '[Player] Get Player Request',
    '[Player] Get Player Success',
    '[Player] Get Player Failure'
  )<number, Player, Error>()
};
