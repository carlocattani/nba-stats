import React from 'react';
import style from './playerDetails.module.scss';
import { Player } from '@services';
import { PlayerPicture } from '../playerPicture/playerPicture.component';

interface PlayerDetailsProps {
  player: Player;
}

export const PlayerDetails: React.FC<PlayerDetailsProps> = ({ player }) => {
  const height = player?.height_feet
    ? `${player.height_feet}-${player.height_inches || 0}`
    : undefined;

  if (!player) {
    return null;
  }
  return (
    <div className={style.container}>
      <PlayerPicture player={player} />
      <div>
        <h2>{`${player.first_name} ${player.last_name}`}</h2>
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
    </div>
  );
};
