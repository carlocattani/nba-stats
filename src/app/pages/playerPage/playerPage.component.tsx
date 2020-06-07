import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Player, fetchPlayer } from '@services';
import style from './playerPage.module.scss';
import { mockPlayer } from '@testing';
import { PlayerDetails } from './playerDetails/playerDetails.component';
import { PlayerStats } from './playerStats/playerStats.component';

const PlayerPage: React.FC = () => {
  const { id } = useParams();
  const [player, setPlayer] = useState<Player>();

  useEffect(() => {
    setPlayer(mockPlayer);
    /*
    fetchPlayer(id).then(player => {
      setPlayer(player);
    });
    */
  }, [id]);

  return (
    <div className={style.container}>
      <PlayerDetails player={player} />
      <PlayerStats playerId={id} />
    </div>
  );
};

export default PlayerPage;
