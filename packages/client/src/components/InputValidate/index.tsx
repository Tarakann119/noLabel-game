import { FC, useState } from 'react';
import classNames from 'classnames';

import { Button } from '../Button';

import { TInputValidateProps } from './InputValidate.typings';

import './index.scss';

export const InputValidate: FC<TInputValidateProps> = ({
  label,
  type,
  className,
  field,
  meta,
  placeholder,
  disabled,
}) => {
  const [showPass, setShowPass] = useState(false);
  const input = (type: string) => (
    <input
      type={type}
      className='form-control__input'
      placeholder={placeholder}
      {...field}
      disabled={disabled}
    />
  );

  return (
    <div className={classNames('form-control', className)}>
      {label && (
        <label htmlFor={field?.name} className='form-control__label'>
          {label}
        </label>
      )}

      <div className='form-control__wrapper'>
        {type === 'password' ? (
          <div className='form-control__group'>
            {input(showPass ? 'text' : 'password')}
            <Button
              className='form-control__show-pass'
              type='button'
              view='icon'
              icon={showPass ? 'eye' : 'eye-blocked'}
              onClick={() => setShowPass(!showPass)}
            />
          </div>
        ) : (
          input(type)
        )}

        {type !== 'search' && meta?.touched && meta.error && (
          <div className='form-control__feedback'>{meta.error}</div>
        )}
      </div>
    </div>
  );
};
