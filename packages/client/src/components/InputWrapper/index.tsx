import React, { ReactElement, ReactNode } from 'react';
import './index.scss';

interface InputWrapperProps {
  label?: string;
  children?: ReactElement | ReactNode | ReactNode[];
  error?: unknown;
}

const InputWrapper: React.FC<InputWrapperProps> = ({ label, children, error }) => {
  return (
    <div className='input__container'>
      <label className='input__label' htmlFor='login'>
        {label}
      </label>
      <div className={error ? 'input__wrapper input__wrapper-error' : 'input__wrapper'}>
        {children}
      </div>
    </div>
  );
};

export default InputWrapper;
