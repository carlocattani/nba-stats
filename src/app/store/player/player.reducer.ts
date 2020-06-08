import { PlayerState } from './player.model';
import { createReducer, Action } from 'typesafe-actions';
import { PlayerAction } from './player.action';
import { Player } from '@services';

const initialState: PlayerState = {
  players: {},
  recentlyViewed: []
};

const updateRecentlyViewed = (state: PlayerState, player: Player): Player[] => {
  const isAlreadyThere = !!state.recentlyViewed.find(p => p.id === player.id);
  const recentlyViewed = !isAlreadyThere
    ? [player].concat(...state.recentlyViewed)
    : state.recentlyViewed;
  return recentlyViewed.slice(0, 5);
};

export const playerReducer = createReducer<PlayerState, Action>(initialState)
  .handleAction(PlayerAction.setPlayer, (state, { payload }) => {
    return {
      ...state,
      players: { ...state.players, [payload.id]: payload },
      recentlyViewed: updateRecentlyViewed(state, payload)
    };
  })
  .handleAction(PlayerAction.getPlayer.request, state => ({
    ...state,
    isLoading: true,
    errorMessage: undefined
  }))
  .handleAction(PlayerAction.getPlayer.success, (state, { payload }) => ({
    ...state,
    players: { ...state.players, [payload.id]: payload },
    recentlyViewed: updateRecentlyViewed(state, payload),
    isLoading: false
  }))
  .handleAction(PlayerAction.getPlayer.failure, (state, { payload }) => ({
    ...state,
    errorMessage: payload.message,
    isLoading: false
  }));
