import { put, call, StrictEffect, takeLatest } from 'redux-saga/effects';
import { PlayerAction } from './player.action';
import { Player, PlayerService } from '@services';

function* getPlayerSaga(
  action: ReturnType<typeof PlayerAction.getPlayer.request>
): Generator<StrictEffect, void, Player> {
  try {
    const response: Player = yield call(PlayerService.fetchPlayer, action.payload);
    yield put(PlayerAction.getPlayer.success(response));
  } catch (err) {
    yield put(PlayerAction.getPlayer.failure(err));
  }
}

export const playerSagas = [takeLatest(PlayerAction.getPlayer.request, getPlayerSaga)];
