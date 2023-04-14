import { FC, memo } from 'react';
import classNames from 'classnames';

import { TitleProps } from './Title.typings';

import './index.scss';

export const Title: FC<TitleProps> = memo(({ children, className, level, size }) => {
  const Title = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Title className={classNames('title', className, { title_small: size })}>{children}</Title>
  );
});
