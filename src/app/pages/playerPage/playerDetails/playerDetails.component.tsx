import React from 'react';
import style from './playerDetails.module.scss';
import { Player } from '@services';
import { PlayerPicture } from '../playerPicture/playerPicture.component';
import { PlayerInfo } from '../playerInfo/playerInfo.component';

interface PlayerDetailsProps {
  player: Player;
}

export const PlayerDetails: React.FC<PlayerDetailsProps> = ({ player }) => {
  return (
    <div className={style.container}>
      <PlayerPicture player={player} />
      <PlayerInfo player={player} />
    </div>
  );
};
