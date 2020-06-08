import { Player } from '@services';

// the key is the player id
export type PlayersById = Record<number, Player>;

export interface PlayerState {
  players: PlayersById;
  recentlyViewed: Player[];
  isLoading?: boolean;
  errorMessage?: string;
}
