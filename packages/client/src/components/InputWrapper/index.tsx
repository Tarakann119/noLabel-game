import React, { ReactElement, ReactNode } from 'react';
import './index.scss';
import classNames from 'classnames';

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
      <div className={classNames('input__wrapper', { 'input__wrapper-error': error })}>
        {children}
      </div>
    </div>
  );
};

export default InputWrapper;
