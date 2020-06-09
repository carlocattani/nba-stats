import { put, call, StrictEffect, takeLatest } from 'redux-saga/effects';
import { StatsAction } from './stats.action';
import { StatsService, SeasonAveragesResponse } from '@services';

function* getSeasonAveragesSaga(
  action: ReturnType<typeof StatsAction.getSeasonAverages.request>
): Generator<StrictEffect, void, SeasonAveragesResponse> {
  try {
    const response: SeasonAveragesResponse = yield call(
      StatsService.fetchSeasonAverages,
      action.payload
    );
    yield put(StatsAction.getSeasonAverages.success(response));
  } catch (err) {
    yield put(StatsAction.getSeasonAverages.failure(err));
  }
}

export const statsSagas = [
  takeLatest(StatsAction.getSeasonAverages.request, getSeasonAveragesSaga)
];
