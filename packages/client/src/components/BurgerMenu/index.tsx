import { forwardRef, PropsWithChildren } from 'react';
import classNames from 'classnames';

import { withClickOutside } from '@/hocs/withClickOutside';

import { Button } from '../Button';

import { TBurgerMenu } from './BurgerMenu.typings';

import './index.scss';

const BurgerMenuBase = forwardRef<HTMLDivElement, PropsWithChildren<TBurgerMenu>>(
  ({ children, className, open, setOpen }, ref) => {
    return (
      <div className={classNames('burger-menu', className, { 'burger-menu_open': open })} ref={ref}>
        <Button
          view='icon'
          icon={!open ? 'menu-burger' : 'cross'}
          className='burger-menu__button'
          onClick={() => setOpen(!open)}
        />

        {open && <div className='burger-menu__content'>{children}</div>}
      </div>
    );
  }
);

export const BurgerMenu = withClickOutside(BurgerMenuBase);
