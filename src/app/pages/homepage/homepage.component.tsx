import React from 'react';
import style from './homepage.module.scss';
import { SearchInput } from './searchInput/searchInput.component';

const Homepage: React.FC = () => {
  return (
    <div className={style.container}>
      <div className={style.cover} />
      <div className={style.SearchInput}>
        <SearchInput />
      </div>
    </div>
  );
};

export default Homepage;
