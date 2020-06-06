import React, { useState, useCallback, ChangeEvent } from 'react';
import cx from 'classnames';

import style from './input.module.scss';

type InputType = 'text' | 'number';

interface InputProps {
  type?: InputType;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  autoFocus?: boolean;
  className?: string;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  onValueChange,
  autoFocus = false,
  className
}) => {
  const [value, setValue] = useState<string>('');

  const handleOnChange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const newValue = e.target.value;
      setValue(newValue);
      if (onValueChange) {
        onValueChange(newValue);
      }
    },
    [onValueChange, setValue]
  );

  return (
    <div className={style.container}>
      <input
        value={value}
        onChange={handleOnChange}
        className={cx(style.input, { [style.empty]: !value }, className)}
        type={type}
        placeholder={placeholder}
        autoFocus={autoFocus}
      />
    </div>
  );
};
