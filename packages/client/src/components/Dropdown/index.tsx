import { forwardRef } from 'react';
import classNames from 'classnames';

import { withClickOutside } from '@/hocs/withClickOutside';

import { Button } from '../Button';

import { TDropdownProps } from './Dropdown.typings';

import './index.scss';

const DropdownBase = forwardRef<HTMLDivElement, TDropdownProps>(
  ({ childrenBtn, childrenMenu, className, open, setOpen }, ref) => {
    return (
      <div className={classNames('dropdown', className)} ref={ref}>
        <Button className='dropdown__button' onClick={() => setOpen(!open)}>
          {childrenBtn}
        </Button>

        {open && <div className='dropdown__menu'>{childrenMenu}</div>}
      </div>
    );
  }
);

export const Dropdown = withClickOutside(DropdownBase);
