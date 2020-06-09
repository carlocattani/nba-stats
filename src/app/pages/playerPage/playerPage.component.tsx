import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import style from './playerPage.module.scss';
import { PlayerStats } from './playerStats/playerStats.component';
import { useSelector, useDispatch } from 'react-redux';
import { PlayerSelector, PlayerAction, LayoutAction } from '@store';
import { PlayerPicture } from './playerPicture/playerPicture.component';
import { PlayerInfo } from './playerInfo/playerInfo.component';
import { SeasonSelection } from './seasonSelection/seasonSelection.component';
import { Error } from '@common-ui';

const PlayerPage: React.FC = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const player = useSelector(PlayerSelector.getPlayer(id));
  const playerErrorMessage = useSelector(PlayerSelector.getErrorMessage);

  useEffect(() => {
    dispatch(LayoutAction.setShowNavbarSearch(true));
  }, []);

  useEffect(() => {
    if (id && !player) {
      dispatch(PlayerAction.getPlayer.request(id));
    }
  }, [id, player]);

  return (
    <div className={style.container}>
      <div className={style.playerSection}>
        {playerErrorMessage && <Error message={playerErrorMessage} />}
        <PlayerPicture player={player} />
        <PlayerInfo player={player} />
      </div>
      <div className={style.statsSection}>
        <SeasonSelection playerId={id} />
        <PlayerStats playerId={id} />
      </div>
    </div>
  );
};

export default PlayerPage;
