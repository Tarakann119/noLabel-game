import { FC } from 'react';
import classNames from 'classnames';

import defaultImage from './img/avatar-default.png';
import { TAvatarProps } from './Avatar.typings';

import './index.scss';

export const Avatar: FC<TAvatarProps> = ({
  src,
  alt,
  size = 'default',
  className,
  isLink,
  ...props
}) => {
  const url = `https://ya-praktikum.tech/api/v2/resources${src}`;
  return (
    <img
      src={src ? url : defaultImage}
      alt={alt || 'Аватар'}
      draggable={false}
      className={classNames('avatar', `avatar_${size}`, { avatar_link: isLink }, className)}
      {...props}
    />
  );
};
