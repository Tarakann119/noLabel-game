import { FC, useState } from 'react';
import './index.scss';
import classNames from 'classnames';

import ValidateErrorMessage from '../ValidateErrorMessage';

type InputValidateProps = {
  label?: string;
  name: string;
  type: 'text' | 'password';
  value?: string | undefined;
  // Специально не типизируем, для повышения универсальности компонента
  error?: unknown;
  errorTitle?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  handleChange: (e: React.ChangeEvent<any>) => void;
};

const InputValidate: FC<InputValidateProps> = ({
  label,
  name,
  type,
  value,
  error,
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

export default InputValidate;
