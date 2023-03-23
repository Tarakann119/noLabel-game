import { FC } from 'react';
import { memo } from 'react';
import classNames from 'classnames';

import defaultImages from './images/avatar-default.png';
import { AvatarProps } from './Avatar.typings';

import './index.scss';

export const Avatar: FC<AvatarProps> = memo(
  ({ src, alt, size = 'default', className, isLink, ...props }) => {
    return (
      <img
        src={src || defaultImages}
        alt={alt || 'Аватар'}
        draggable={false}
        className={classNames('avatar', `avatar_${size}`, { avatar_link: isLink }, className)}
        {...props}
      />
    );
  }
);
