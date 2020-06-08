import React from 'react';
import style from './navbar.module.scss';
import { useSelector } from 'react-redux';
import { LayoutSelector } from '@store';
import { Logo } from '../logo/logo.component';
import { SearchInput } from '../searchInput/searchInput.component';

export const Navbar: React.FC = () => {
  const showSearch = useSelector(LayoutSelector.showNavbarSearch);
  return (
    <div className={style.container}>
      <div className={style.items}>
        <Logo />
        {showSearch && <SearchInput />}
      </div>
    </div>
  );
};
