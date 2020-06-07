import { PlayerState } from '../player/player.model';
import { StatsState } from '../stats/stats.model';

export interface CommonState {
  player: PlayerState;
  stats: StatsState;
}
