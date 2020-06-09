import React, { useCallback } from 'react';
import cx from 'classnames';
import style from './button.module.scss';

type ButtonStyleType = 'primary' | 'secondary';
type ButtonActionType = 'button' | 'submit';

interface ButtonProps {
  styleType?: ButtonStyleType;
  actionType?: ButtonActionType;
  disabled?: boolean;
  onClick?: (event: React.MouseEvent) => void;
  className?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  styleType = 'primary',
  actionType = 'button',
  disabled = false,
  onClick,
  className
}) => {
  const handleOnClick = useCallback(
    (event: React.MouseEvent) => {
      if (onClick) {
        onClick(event);
      }
    },
    [onClick]
  );

  return (
    <button
      type={actionType}
      disabled={disabled}
      className={cx(style.button, style[styleType], { [style.disabled]: disabled }, className)}
      onClick={handleOnClick}
    >
      {children}
    </button>
  );
};
