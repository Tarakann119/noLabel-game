import type { FC, ImgHTMLAttributes } from 'react';
import { memo } from 'react';
import classNames from 'classnames';
import defaultImages from './images/avatar-default.png';
import './index.scss';

export type AvatarProps = {
  size?: 'default' | 'small' | 'header';
  className?: string;
  isLink?: boolean;
} & ImgHTMLAttributes<HTMLImageElement>;

export const Avatar: FC<AvatarProps> = memo(
  ({ src, alt, size = 'default', className, isLink, ...props }) => {
    return (
      <img
        src={src || defaultImages}
        alt={alt || 'Аватар'}
        draggable={false}
        className={classNames('avatar', `avatar-size_${size}`, { avatar_link: isLink }, className)}
        {...props}
      />
    );
  }
);
