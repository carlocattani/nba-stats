import { Player } from './player.model';

export const PlayerUtil = {
  getPlayerName: (player: Player): string => {
    return player ? `${player.first_name} ${player.last_name}` : undefined;
  },

  getPlayerHeight: (player: Player): string => {
    return player?.height_feet ? `${player.height_feet}-${player.height_inches || 0}` : undefined;
  }
};
