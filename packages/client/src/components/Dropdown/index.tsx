import { cloneElement, type FC, useEffect, useRef, useState } from 'react';
import { DropdownProps } from '@typings/app.typings';
import classNames from 'classnames';

import './Dropdown.css';

export const Dropdown: FC<DropdownProps> = ({ trigger, menuItems, className, emoteClass }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (!dropdownRef.current?.contains(e.target as HTMLElement)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, [dropdownRef]);

  const toggleIsOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className={classNames('dropdown', className)} ref={dropdownRef}>
      {cloneElement(trigger, {
        onClick: toggleIsOpen,
      })}
      {isOpen ? (
        <ul className='dropdown__menu'>
          {menuItems.map(({ title, onClick, ...rest }, index) => (
            <li key={index} className='dropdown__menu-item'>
              <button
                onClick={(event) => {
                  toggleIsOpen();
                  onClick(event);
                }}
                className={classNames('dropdown__menu-button', emoteClass)}
                {...rest}>
                {title}
              </button>
            </li>
          ))}
        </ul>
      ) : null}
    </div>
  );
};
