import type { FC, InputHTMLAttributes } from 'react';
import classNames from 'classnames';

type InputType = 'text' | 'tel' | 'email' | 'password';

export type InputProps = {
  name: string;
  type?: InputType;
  label?: string;
  error?: string;
  isValid?: boolean;
  className?: string;
} & InputHTMLAttributes<HTMLInputElement>;

export const Input: FC<InputProps> = ({
  name,
  type = 'text',
  label,
  error = '',

  placeholder,
}) => {
  return (
    <div className='input__container'>
      <label className='input__label' htmlFor='login'>
        {label}
      </label>
      <div className={classNames('input__wrapper', { 'input__wrapper-error': error })}>
        <input name={name} type={type} className='input__field' placeholder={placeholder} />
      </div>
    </div>
  );
};
