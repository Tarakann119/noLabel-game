import { ChangeEvent, FC, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import classNames from 'classnames';

import { setTheme } from '@/store/slices/Theme';

import { TThemeSwitcherProps } from './ThemeSwitcher.typing';

import './index.scss';

export const ThemeSwitcher: FC<TThemeSwitcherProps> = ({ className }) => {
  const dispatch = useDispatch();
  const theme: string = useSelector((state: Record<string, string>) => state.theme);

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    const theme = isChecked ? 'light' : 'dark';

    dispatch(setTheme(theme));
  };

  return (
    <label className={classNames('switcher', className)}>
      <input className='switcher__checkbox' type='checkbox' onChange={handleChange} />
      <span className='switcher__slider'></span>
    </label>
  );
};
