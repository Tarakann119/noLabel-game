import icons from '@assets/icons/sprite.svg';
import classNames from 'classnames';

import { TIcon } from './Icon.typings';

export const Icon = ({ icon, className }: TIcon) => (
  <svg className={classNames('icon', className)}>
    <use href={`${icons}#${icon}`}></use>
  </svg>
);
