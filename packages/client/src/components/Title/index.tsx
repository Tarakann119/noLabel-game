import { FC } from 'react';
import { memo } from 'react';
import classNames from 'classnames';

import { TTitleProps } from './Title.typings';

import './index.scss';

export const Title: FC<TTitleProps> = memo(({ children, className, level, size }) => {
  const Title = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Title className={classNames('title', className, { title_small: size })}>{children}</Title>
  );
});
