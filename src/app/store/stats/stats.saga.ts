import { put, call, StrictEffect, takeLatest } from 'redux-saga/effects';
import { StatsAction } from './stats.action';
import { fetchSeasonAverages, SeasonAveragesResponse } from '@services';

function* getSeasonAveragesSaga(
  action: ReturnType<typeof StatsAction.getSeasonAverages.request>
): Generator<StrictEffect, void, any> {
  try {
    const response: SeasonAveragesResponse = yield call(fetchSeasonAverages, action.payload);
    yield put(StatsAction.getSeasonAverages.success(response));
  } catch (err) {
    yield put(StatsAction.getSeasonAverages.failure(err));
  }
}

export const statsSagas = [
  takeLatest(StatsAction.getSeasonAverages.request, getSeasonAveragesSaga)
];
