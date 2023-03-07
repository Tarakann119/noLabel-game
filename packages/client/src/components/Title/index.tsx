import type { BaseHTMLAttributes, FC } from 'react';
import { memo } from 'react';
import classNames from 'classnames';
import './index.scss';

export type TitleProps = {
  className?: string;
  text: string;
  view?: 'base';
} & BaseHTMLAttributes<HTMLHeadingElement>;

export const Title: FC<TitleProps> = memo(({ className, text, view = 'base' }) => {
  return <h2 className={classNames('title', `title_view_${view}`, className)}>{text}</h2>;
});
