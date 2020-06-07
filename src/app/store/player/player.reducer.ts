import { PlayerState } from './player.model';
import { createReducer, Action } from 'typesafe-actions';
import { PlayerAction } from './player.action';

const initialState: PlayerState = {
  players: {}
};

export const playerReducer = createReducer<PlayerState, Action>(initialState)
  .handleAction(PlayerAction.setPlayer, (state, { payload }) => ({
    ...state,
    players: { ...state.players, [payload.id]: payload }
  }))
  .handleAction(PlayerAction.getPlayer.request, state => ({
    ...state,
    isLoading: true,
    errorMessage: undefined
  }))
  .handleAction(PlayerAction.getPlayer.success, (state, { payload }) => ({
    ...state,
    players: { ...state.players, [payload.id]: payload },
    isLoading: false
  }))
  .handleAction(PlayerAction.getPlayer.failure, (state, { payload }) => ({
    ...state,
    errorMessage: payload.message,
    isLoading: false
  }));
