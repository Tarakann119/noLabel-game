import classNames from 'classnames';

import icons from '@/assets/icons/sprite.svg';

import { TIconProps } from './Icon.typings';

export const Icon = ({ icon, className }: TIconProps) => (
  <svg className={classNames('icon', className)}>
    <use href={`${icons}#${icon}`}></use>
  </svg>
);
