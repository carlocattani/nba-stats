import React from 'react';
import style from './error.module.scss';

interface ErrorProps {
  message: string;
}

export const Error: React.FC<ErrorProps> = ({ message = 'Something went wrong' }) => {
  return <div className={style.error}>{message}</div>;
};
