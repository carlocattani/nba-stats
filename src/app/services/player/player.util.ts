import { Player } from './player.model';

export const toPlayerName = (player: Player): string => {
  return player ? `${player.first_name} ${player.last_name}` : undefined;
};
