import React from 'react';
import { Logo } from '@common-ui';

import style from './navbar.module.scss';

export const Navbar: React.FC = () => {
  return (
    <div className={style.container}>
      <Logo />
    </div>
  );
};
