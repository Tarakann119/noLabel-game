import type { FC, InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import './index.scss'
import ValidateErrorMessage from '../ValidateErrorMessage';

type InputType = 'text' | 'tel' | 'email' | 'password'

export type InputProps = {
  name: string
  type?: InputType
  label?: string
  error?: string
  isValid?: boolean
  className?: string
} & InputHTMLAttributes<HTMLInputElement>

export const Input: FC<InputProps> = ({
                                        id,
                                        name,
                                        type = 'text',
                                        label,
                                        error = '',
                                        isValid = true,
                                        disabled = false,
                                        readOnly = false,
                                        style,
                                        className = '',
                                        placeholder,
                                        ...props
                                      }) => {
  const inputId = id ?? `${type}-${name}`

  return (
    <div className='input__container'>
      <label className='input__label' htmlFor='login'>
        {label}
      </label>
      <div className={classNames('input__wrapper', { 'input__wrapper-error': error })}>
        <input
          name={name}
          type={type}
          className='input__field'
          placeholder={placeholder}
        />
      </div>
    </div>
  )
}
