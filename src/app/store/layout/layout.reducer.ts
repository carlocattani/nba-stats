import { createReducer, Action } from 'typesafe-actions';
import { LayoutAction } from './layout.action';
import { LayoutState } from './layout.model';

const initialState: LayoutState = {};

export const layoutReducer = createReducer<LayoutState, Action>(initialState).handleAction(
  LayoutAction.setShowNavbarSearch,
  (state: LayoutState, { payload }) => {
    return { ...state, showNavbarSearch: payload };
  }
);
