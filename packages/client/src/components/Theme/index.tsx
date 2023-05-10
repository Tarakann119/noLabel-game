import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { set } from './slice';

import './index.scss';

export const Theme = () => {
  const theme: string = useSelector((state: Record<string, string>) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleChange = (value: 'dark' | 'light') => {
    dispatch(set(value));
  };

  return (
    <div className='theme__container'>
      <div className='theme__label'></div>
      <div className='theme__item-container'>
        <div
          className={classNames('theme__item', { theme__item_active: theme === 'dark' })}
          onClick={() => handleChange('dark')}>
          Дерево
        </div>
        <div
          className={classNames('theme__item', { theme__item_active: theme === 'light' })}
          onClick={() => handleChange('light')}>
          Металл
        </div>
      </div>
    </div>
  );
};
