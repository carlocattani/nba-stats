import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware, compose, combineReducers, ReducersMapObject } from 'redux';
import { all } from 'redux-saga/effects';
import { CommonState } from './common.model';
import { playerReducer } from '../player/player.reducer';
import { playerSagas } from '../player/player.saga';
import { statsReducer } from '../stats/stats.reducer';
import { statsSagas } from '../stats/stats.saga';

// custom compose for the redux devtool extension
const composeEnhancer = (() => {
  if (process.env.NODE_ENV === 'development') {
    // https://github.com/zalmoxisus/redux-devtools-extension#redux-devtools-extension
    const key = '__REDUX_DEVTOOLS_EXTENSION_COMPOSE__';
    if (window && typeof (window as any)[key] !== 'undefined') {
      // custom compose
      return (window as any)[key];
    }
  }
  // default compose
  return compose;
})();

const sagaMiddleware = createSagaMiddleware();

const commonReducers: ReducersMapObject<CommonState> = {
  player: playerReducer,
  stats: statsReducer
};

export const store = createStore(
  combineReducers(commonReducers),
  composeEnhancer(applyMiddleware(sagaMiddleware))
);

function* rootSagas() {
  yield all([...playerSagas, ...statsSagas]);
}

sagaMiddleware.run(rootSagas);
