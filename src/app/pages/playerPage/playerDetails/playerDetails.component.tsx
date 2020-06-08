import React from 'react';
import style from './playerDetails.module.scss';
import { Player, toPlayerName } from '@services';
import { PlayerPicture } from '../playerPicture/playerPicture.component';

interface PlayerDetailsProps {
  player: Player;
}

export const PlayerDetails: React.FC<PlayerDetailsProps> = ({ player }) => {
  const height = player?.height_feet
    ? `${player.height_feet}-${player.height_inches || 0}`
    : undefined;

  return (
    <div className={style.container}>
      {player && (
        <>
          <PlayerPicture player={player} />
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
        </>
      )}
    </div>
  );
};
