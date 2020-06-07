import React from 'react';
import style from './homepage.module.scss';
import { SearchInput } from './searchInput/searchInput.component';
import { Button } from '@common-ui';
import { RouteComponentProps, withRouter } from 'react-router-dom';

interface HomepageProsp extends RouteComponentProps {}

const Homepage: React.FC<HomepageProsp> = ({ history }) => {
  const toRandomPlayer = () => {
    const playerId = Math.round(Math.random() * 3000);
    history.push({ pathname: `/player/${playerId}/` });
  };

  return (
    <div className={style.container}>
      <div className={style.cover} />
      <div className={style.button}>
        <Button styleType='secondary' onClick={toRandomPlayer}>
          Blindfold dunk
        </Button>
      </div>
      <div className={style.searchInput}>
        <SearchInput />
      </div>
    </div>
  );
};

export default withRouter(Homepage);
