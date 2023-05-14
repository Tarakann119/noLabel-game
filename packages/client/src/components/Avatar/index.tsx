import { FC, memo } from 'react';
import classNames from 'classnames';

import defaultImages from './images/avatar-default.png';
import { AvatarProps } from './Avatar.typings';

import './index.scss';

export const Avatar: FC<AvatarProps> = memo(
  ({ src, alt, size = 'default', className, isLink, ...props }) => {
    const url = `http://localhost:3001/api/v2/resources${src}`;
    return (
      <img
        src={src ? url : defaultImages}
        alt={alt || 'Аватар'}
        draggable={false}
        className={classNames('avatar', `avatar_${size}`, { avatar_link: isLink }, className)}
        {...props}
      />
    );
  }
);
