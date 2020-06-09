import { Store, createStore, combineReducers } from 'redux';
import { layoutReducer } from './layout.reducer';
import { LayoutAction } from './layout.action';
import { LayoutSelector } from './layout.selector';

describe('Layout', () => {
  let store: Store;

  beforeEach(() => {
    store = createStore(combineReducers({ layout: layoutReducer }));
  });

  describe('Navbar layout', () => {
    beforeEach(() => {
      store.dispatch(LayoutAction.setShowNavbarSearch(true));
    });

    it('should toggle the show search flag', () => {
      const show = LayoutSelector.showNavbarSearch(store.getState());
      expect(show).toEqual(true);
    });
  });
});
