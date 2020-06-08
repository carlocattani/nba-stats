import React from 'react';
import style from './playerInfo.module.scss';
import { Player, toPlayerName } from '@services';
import { useSelector } from 'react-redux';
import { Loading } from '@common-ui';
import { PlayerSelector } from '@store';

interface PlayerInfoProps {
  player: Player;
}

export const PlayerInfo: React.FC<PlayerInfoProps> = ({ player }) => {
  const loading = useSelector(PlayerSelector.isLoading);
  const height = player?.height_feet
    ? `${player.height_feet}-${player.height_inches || 0}`
    : undefined;

  const showLoading = loading || !player;

  return (
    <>
      {showLoading ? (
        <Loading />
      ) : (
        <div>
          <h2>{toPlayerName(player)}</h2>
          {height && (
            <div className={style.row}>
              <span className={style.label}>Height:</span> {height}
            </div>
          )}
          {player.weight_pounds && (
            <div className={style.row}>
              <span className={style.label}>Weight:</span> {player.weight_pounds} lbs
            </div>
          )}
          {player.team?.full_name && (
            <div className={style.row}>
              <span className={style.label}>Team:</span> {player.team?.full_name}
            </div>
          )}
          {player.position && (
            <div className={style.row}>
              <span className={style.label}>Position:</span> {player.position}
            </div>
          )}
        </div>
      )}
    </>
  );
};
