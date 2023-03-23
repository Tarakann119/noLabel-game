import type { ButtonHTMLAttributes, FC } from 'react';
import { memo } from 'react';
import classNames from 'classnames';
import './index.scss';

export type ButtonProps = {
  text: string;
  view?: 'primary' | 'secondary' | 'ghost';
  className?: string;
  withSound?: boolean
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button: FC<ButtonProps> = memo(
  ({ text, view = 'primary', type = 'button', className = '', ...props }) => {
    return (
      <button
        type={type}
        className={classNames('button', `button_view_${view}`, className)}
        {...props}>
        {text}
      </button>
    );
  }
);
