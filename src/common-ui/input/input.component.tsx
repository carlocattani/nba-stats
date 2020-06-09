import React, { useState, useCallback, ChangeEvent, ReactNode } from 'react';
import cx from 'classnames';
import style from './input.module.scss';

type InputType = 'text' | 'number';

interface InputProps {
  type?: InputType;
  placeholder?: string;
  onValueChange?: (value: string) => void;
  autoFocus?: boolean;
  className?: string;
  suffix?: ReactNode;
  onFocus?: () => void;
}

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  onValueChange,
  autoFocus = false,
  className,
  suffix,
  onFocus
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

  const handleOnFocus = useCallback(() => {
    if (onFocus) {
      onFocus();
    }
  }, [onFocus]);

  return (
    <div className={style.container}>
      <input
        value={value}
        onChange={handleOnChange}
        className={cx(
          style.input,
          { [style.empty]: !value, [style.withSuffix]: !!suffix },
          className
        )}
        type={type}
        placeholder={placeholder}
        autoFocus={autoFocus}
        onFocus={handleOnFocus}
      />
      {suffix && <div className={cx(style.suffix, { [style.emptyInput]: !value })}>{suffix}</div>}
    </div>
  );
};
