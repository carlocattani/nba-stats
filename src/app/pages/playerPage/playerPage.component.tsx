import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from './playerPage.module.scss';
import { PlayerDetails } from './playerDetails/playerDetails.component';
import { PlayerStats } from './playerStats/playerStats.component';
import { useSelector, useDispatch } from 'react-redux';
import { PlayerSelector, PlayerAction } from '@store';

const PlayerPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const player = useSelector(PlayerSelector.getPlayer(id));

  useEffect(() => {
    if (id && !player) {
      dispatch(PlayerAction.getPlayer.request(id));
    }
  }, [id, player]);

  return (
    <div className={style.container}>
      <PlayerDetails player={player} />
      <PlayerStats playerId={id} />
    </div>
  );
};

export default PlayerPage;
