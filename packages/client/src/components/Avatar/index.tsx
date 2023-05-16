import { FC, memo } from 'react';
import { SERVER_URL } from '@typings/constants';
import classNames from 'classnames';

import defaultImages from './images/avatar-default.png';
import { AvatarProps } from './Avatar.typings';

import './index.scss';

export const Avatar: FC<AvatarProps> = memo(
  ({ src, alt, size = 'default', className, isLink, ...props }) => {
    const url = `${SERVER_URL}api/v2/resources${src}`;
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
