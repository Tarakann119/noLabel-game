import { FC } from 'react';
import classNames from 'classnames';

import { Icon } from '../Icon';

import { TButtonProps } from './Button.typings';

import './index.scss';

export const Button: FC<TButtonProps> = ({
  children,
  view,
  type = 'button',
  className,
  icon,
  onClick,
}) => (
  <button
    type={type}
    className={classNames('button', { [`button_${view}`]: view }, className)}
    onClick={onClick}>
    {view === 'icon' && icon ? <Icon icon={icon as string} /> : children}
  </button>
);
