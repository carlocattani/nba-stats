import { Store, createStore, combineReducers } from 'redux';
import { playerReducer } from './player.reducer';
import { PlayerAction } from './player.action';
import { PlayerSelector } from './player.selector';
import { PlayerTesting } from '@testing';

describe('Player', () => {
  let store: Store;

  beforeEach(() => {
    store = createStore(combineReducers({ player: playerReducer }));
  });

  describe('Set selected player', () => {
    beforeEach(() => {
      store.dispatch(PlayerAction.setPlayer(PlayerTesting.mockPlayer));
    });

    it('should add the player to the store', () => {
      const player = PlayerSelector.getPlayer(PlayerTesting.mockPlayer.id)(store.getState());
      expect(player).toEqual(PlayerTesting.mockPlayer);
    });

    it('should add the player to the recently viewed list', () => {
      const recentlyViewed = PlayerSelector.getRecentlyViewed(store.getState());
      expect(recentlyViewed?.length).toEqual(1);
      expect(recentlyViewed[0]).toEqual(PlayerTesting.mockPlayer);
    });
  });

  describe('Recently viewed', () => {
    beforeEach(() => {
      store.dispatch(PlayerAction.setPlayer(PlayerTesting.mockPlayers[0]));
      store.dispatch(PlayerAction.setPlayer(PlayerTesting.mockPlayers[1]));
      store.dispatch(PlayerAction.setPlayer(PlayerTesting.mockPlayers[2]));
      store.dispatch(PlayerAction.setPlayer(PlayerTesting.mockPlayers[3]));
      store.dispatch(PlayerAction.setPlayer(PlayerTesting.mockPlayers[4]));
      store.dispatch(PlayerAction.setPlayer(PlayerTesting.mockPlayers[5]));
    });

    it('should store up to 5 players', () => {
      const recentlyViewed = PlayerSelector.getRecentlyViewed(store.getState());
      expect(recentlyViewed.length).toEqual(5);
    });

    it('should store players in reverse order', () => {
      const recentlyViewed = PlayerSelector.getRecentlyViewed(store.getState());
      expect(recentlyViewed[0]).toEqual(PlayerTesting.mockPlayers[5]);
      expect(recentlyViewed[1]).toEqual(PlayerTesting.mockPlayers[4]);
      expect(recentlyViewed[2]).toEqual(PlayerTesting.mockPlayers[3]);
      expect(recentlyViewed[3]).toEqual(PlayerTesting.mockPlayers[2]);
    });
  });
});
