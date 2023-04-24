import { FC, memo } from 'react';
import classNames from 'classnames';

import { TitleProps } from './Title.typings';

import './index.scss';

export const Title: FC<TitleProps> = memo(({ className, text, view = 'base' }) => {
  return <h2 className={classNames('title', `title_view-${view}`, className)}>{text}</h2>;
});
