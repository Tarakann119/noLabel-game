import { FC, memo } from 'react';
import classNames from 'classnames';

import { ButtonProps } from './Button.typings';

import './index.scss';

export const Button: FC<ButtonProps> = memo(
  ({ text, view = 'primary', type = 'button', className = '', ...props }) => {
    return (
      <button type={type} className={classNames('button', `button_${view}`, className)} {...props}>
        {text}
      </button>
    );
  }
);
