import type { FC, InputHTMLAttributes } from 'react'
import classNames from 'classnames'
import './index.css'

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
  ...props
}) => {
  const inputId = id ?? `${type}-${name}`

  return (
    <div
      className={classNames(
        'input',
        {
          input_invalid: !isValid && !disabled,
          'input_type_read-only': readOnly,
        },
        className
      )}
      style={style}>
      {!!label && (
        <label htmlFor={inputId} className="input__label">
          {label}
        </label>
      )}

      <input
        id={inputId}
        name={name}
        type={type}
        disabled={disabled}
        readOnly={readOnly}
        className="input__control"
        {...props}
      />

      <span className="input__error">{error}</span>
    </div>
  )
}
