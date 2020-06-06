import React from 'react';
import style from './logo.module.scss';
import { GiBasketballBasket } from 'react-icons/gi';
import { Link } from 'react-router-dom';

export const Logo: React.FC = () => {
  return (
    <Link to={'/'} className={style.link}>
      <div className={style.logo}>
        <GiBasketballBasket className={style.icon} />
        <span className={style.nba}>NBA</span>
        <span className={style.stats}>stats</span>
      </div>
    </Link>
  );
};
