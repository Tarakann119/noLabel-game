import type { FC, ImgHTMLAttributes } from 'react';
import { memo } from 'react';
import classNames from 'classnames';
import defaultImage from './images/avatar-dafault.png';
import './index.scss';

export type AvatarProps = {
  size?: 'default' | 'small';
  className?: string;
} & ImgHTMLAttributes<HTMLImageElement>;

export const Avatar: FC<AvatarProps> = memo(
  ({ src, alt, size = 'default', className, ...props }) => {
    return (
      <img
        src={src || defaultImage}
        alt={alt || 'Аватар'}
        draggable={false}
        className={classNames('avatar', `avatar_size_${size}`, className)}
        {...props}
      />
    );
  }
);
