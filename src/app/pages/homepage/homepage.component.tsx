import React, { useEffect } from 'react';
import style from './homepage.module.scss';
import { Button, SearchInput } from '@common-ui';
import { RouteComponentProps, withRouter } from 'react-router-dom';
import coverImage from '@assets/homepage/cover.png';
import { RecentlyViewed } from './recentlyViewed/recentlyViewed.component';
import { useDispatch } from 'react-redux';
import { LayoutAction } from '@store';

interface HomepageProsp extends RouteComponentProps {}

const Homepage: React.FC<HomepageProsp> = ({ history }) => {
  const dispatch = useDispatch();

  const toRandomPlayer = () => {
    const playerId = Math.round(Math.random() * 3000);
    history.push({ pathname: `/player/${playerId}/` });
  };

  useEffect(() => {
    dispatch(LayoutAction.setShowNavbarSearch(false));
  }, []);

  return (
    <div className={style.container}>
      <div className={style.cover} style={{ backgroundImage: `url(${coverImage})` }} />
      <div className={style.button}>
        <Button styleType='primary' onClick={toRandomPlayer}>
          Blindfold dunk
        </Button>
      </div>
      <div className={style.searchInput}>
        <RecentlyViewed />
        <SearchInput />
      </div>
    </div>
  );
};

export default withRouter(Homepage);
