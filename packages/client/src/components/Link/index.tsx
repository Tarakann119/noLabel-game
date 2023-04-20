import { FC } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import classNames from 'classnames';

import { TLinkProps } from './Link.typings';

import './index.scss';

export const Link: FC<TLinkProps> = ({ children, className, to }) => {
  return (
    <RouterLink className={classNames('link', className)} to={to}>
      {children}
    </RouterLink>
  );
};
