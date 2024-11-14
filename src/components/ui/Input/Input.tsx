import s from './Input.module.css';
import { HTMLInputTypeAttribute, InputHTMLAttributes, useEffect, useRef } from 'react';
import SvgIcon from '@site/src/components/ui/SvgIcon/SvgIcon';
import clearIcon from '!!raw-loader!./clear.svg';
import React from 'react';

export type InputProps = {
  value: string,
  onChange: (v: string) => void,
  isError?: boolean,
  isSmall?: boolean,
  iconSvg?: string,
  focusOnMount?: boolean
  clearable?: boolean,
  type?: HTMLInputTypeAttribute,
  inputProps?: InputHTMLAttributes<any>,
  placeholder?: string,
  testId?: string,
}
const Input: React.FC<InputProps> = ({ value, placeholder, isError, isSmall, iconSvg, clearable, onChange, focusOnMount, type, inputProps, testId }) => {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (focusOnMount) {
      inputRef?.current?.focus();
    }
  }, [inputRef.current]);

  return (
    <div className={s.Input}>
      <input
        ref={inputRef}
        className={`${s.InputInput} ${isSmall ? s.SmallInputInput : ''} ${isError ? s.InputInputWithError : ''} ${iconSvg ? s.InputInputWithIcon : ''} ${clearable ? s.InputInputClearable : ''}`}
        type={type || 'text'}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        spellCheck={false}
        onKeyDown={(e) => {
          if (e.key === 'Escape') {
            inputRef?.current?.blur();
          }
        }}
        {...inputProps}
        data-testid={testId}
      />
      {iconSvg && (<div className={s.InputIcon}>
        <SvgIcon svg={iconSvg} />
      </div>
      )}
      {clearable && (
        <div className={s.Clear} onClick={() => onChange('')}>
          <SvgIcon svg={clearIcon} />
        </div>
      )}
    </div>
  );
};

export default Input;
