import { FC, useState } from 'react';
import classNames from 'classnames';

import { ValidateErrorMessage } from '@/components/ValidateErrorMessage';

import { InputValidateProps } from './InputValidate.typings';

import './index.scss';

export const InputValidate: FC<InputValidateProps> = ({
  label,
  name,
  type,
  value,
  error,
  placeholder,
  errorTitle,
  handleChange,
}) => {
  // Для предотвращения потенциальных ошибок типизации и для повышения универсальности компонента
  // в message компонента ValidateErrorMessage передаём error в виде строки.

  const [err, setErr] = useState(false);
  return (
    <div className='input__container'>
      <label className='input__label' htmlFor='login'>
        {label}
      </label>
      <div className={classNames('input__wrapper', { 'input__wrapper-error': error })}>
        <input
          onChange={handleChange}
          value={value}
          name={name}
          type={type}
          className='input__field'
          onFocus={() => setErr(true)}
          onBlur={() => setErr(false)}
          placeholder={placeholder}
        />
        <ValidateErrorMessage
          title={errorTitle ? errorTitle : 'Ошибка валидации'}
          message={`${error}`}
          visible={err && !!error}
        />
      </div>
    </div>
  );
};
