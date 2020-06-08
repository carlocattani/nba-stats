import { PlayerState } from '../player/player.model';
import { StatsState } from '../stats/stats.model';
import { LayoutState } from '../layout/layout.model';

export interface CommonState {
  player: PlayerState;
  stats: StatsState;
  layout: LayoutState;
}
