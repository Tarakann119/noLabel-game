import { FC, useState } from 'react';
import TextareaAutosize from 'react-textarea-autosize';
import classNames from 'classnames';

import { InputValidateProps } from '../InputValidate/InputValidate.typings';
import { ValidateErrorMessage } from '../ValidateErrorMessage';

import './index.scss';

export const MyTextArea: FC<InputValidateProps> = ({
  label,
  name,
  value,
  error,
  placeholder,
  errorTitle,
  handleChange,
}) => {
  const [err, setErr] = useState(false);

  return (
    <div className='input__container'>
      <label className='input__label' htmlFor='login'>
        {label}
      </label>
      <div className={classNames('input__wrapper', { 'input__wrapper-error': error })}>
        <TextareaAutosize
          required
          onChange={handleChange}
          value={value}
          name={name}
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
