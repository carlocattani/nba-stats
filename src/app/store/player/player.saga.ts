import { put, call, StrictEffect, takeLatest } from 'redux-saga/effects';
import { PlayerAction } from './player.action';
import { Player, fetchPlayer } from '@services';

function* getPlayerSaga(
  action: ReturnType<typeof PlayerAction.getPlayer.request>
): Generator<StrictEffect, void, any> {
  try {
    const response: Player = yield call(fetchPlayer, action.payload);
    yield put(PlayerAction.getPlayer.success(response));
  } catch (err) {
    yield put(PlayerAction.getPlayer.failure(err));
  }
}

export const playerSagas = [takeLatest(PlayerAction.getPlayer.request, getPlayerSaga)];
