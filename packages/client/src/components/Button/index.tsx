import { PropsWithChildren } from 'react';
import classNames from 'classnames';

import { Icon } from '../Icon';

import { ButtonProps } from './Button.typings';

import './index.scss';

export const Button = ({
  children,
  view,
  type = 'button',
  className,
  icon,
  onClick,
}: PropsWithChildren<ButtonProps>) => (
  <button
    type={type}
    className={classNames('button', { [`button_${view}`]: view }, className)}
    onClick={onClick}>
    {view === 'icon' && icon ? <Icon icon={icon as string} /> : children}
  </button>
);
