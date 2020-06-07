import { Player } from '@services';

// the key is the player id
export type PlayersById = Record<number, Player>;

export interface PlayerState {
  players: PlayersById;
  isLoading?: boolean;
  errorMessage?: string;
}
