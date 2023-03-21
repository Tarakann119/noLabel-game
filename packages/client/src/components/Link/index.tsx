import { FC } from 'react';
import { memo } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import classNames from 'classnames';

import { LinkProps } from './Link.typings';

import '@Button/index.css';

export const Link: FC<LinkProps> = memo(({ href, text, view = 'primary', ...props }) => {
  return (
    <RouterLink className={classNames('button', `button_${view}`)} to={href} {...props}>
      {text}
    </RouterLink>
  );
});
