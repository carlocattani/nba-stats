import React, { useCallback } from 'react';
import style from './recentlyViewed.module.scss';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { PlayerSelector } from '@store';
import { Player, PlayerUtil } from '@services';

/**
 * shows a list of the last viewed players
 */
export const RecentlyViewed: React.FC = () => {
  const players = useSelector(PlayerSelector.getRecentlyViewed);

  const toLink = useCallback((player: Player) => {
    return player?.id ? (
      <div className={style.player} key={player.id}>
        <Link to={`/player/${player.id}/`} className={style.link}>
          {PlayerUtil.getPlayerName(player)}
        </Link>
      </div>
    ) : (
      undefined
    );
  }, []);

  return (
    players?.length > 0 && (
      <div className={style.container}>
        <div className={style.text}>Recently viewed</div>
        {players.map(toLink)}
      </div>
    )
  );
};
