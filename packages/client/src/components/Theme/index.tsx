import { useSelector, useDispatch } from 'react-redux';
import cn from 'classnames';

import { set } from './slice';
import styles from './index.module.css';
import { useEffect } from 'react';
// TODO: Типизировать
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const Theme = ({ className }: any) => {
  // TODO: Типизировать
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const theme = useSelector((state: any) => state.theme);
  const dispatch = useDispatch();

  useEffect(() => {
    document.documentElement.dataset.theme = theme;
    localStorage.setItem('theme', theme);
  }, [theme]);

  const handleChange = () => {
    const next = theme === 'dark' ? 'light' : 'dark';
    dispatch(set(next));
  };

  return (
    <div
      className={cn(className, styles.root, theme === 'dark' ? styles.dark : styles.light)}
      onClick={handleChange}>
      Смена темы
    </div>
  );
};

export default Theme;
