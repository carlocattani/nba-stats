import React from 'react';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import style from './loading.module.scss';

interface LoadingProps {
  message?: string;
}

export const Loading: React.FC<LoadingProps> = ({ message = 'Loading' }) => {
  return (
    <div className={style.container}>
      <div className={style.icon}>
        <AiOutlineLoading3Quarters className={style.spin} />
      </div>
      <div>{message}</div>
    </div>
  );
};
