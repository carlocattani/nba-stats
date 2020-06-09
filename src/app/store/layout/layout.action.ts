import { createAction } from 'typesafe-actions';

export const LayoutAction = {
  setShowNavbarSearch: createAction('[Layout] Set show navbar search')<boolean>()
};
