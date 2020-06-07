import { Player } from '@services';
import { CommonState } from '../common/common.model';

export const PlayerSelector = {
  isLoading(state: CommonState): boolean {
    return state.player.isLoading;
  },
  getPlayer(playerId: number) {
    return (state: CommonState): Player => {
      return state.player.players[playerId];
    };
  }
};