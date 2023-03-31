import type { FC } from 'react';
import { memo } from 'react';
import { NavLink as RouterLink } from 'react-router-dom';
import randomClickSound from '@utils/randomClickSound/randomClickSound';
import classNames from 'classnames';

import { LinkProps } from './Link.typings';

import '@Button/index.css';

export const Link: FC<LinkProps> = memo(
  ({ href, text, view = 'primary', withSound = true, ...props }) => {
    function addSound() {
      if (withSound) {
        return randomClickSound;
      }
    }
    return (
      <RouterLink
        className={classNames('button', `button_view_${view}`)}
        to={href}
        onMouseUp={addSound}
        {...props}>
        {text}
      </RouterLink>
    );
  }
);
