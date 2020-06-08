import { createAction } from 'typesafe-actions';

export const LayoutAction = {
  setShowNavbarSearch: createAction('[Settings] Set show navbar search')<boolean>()
};
