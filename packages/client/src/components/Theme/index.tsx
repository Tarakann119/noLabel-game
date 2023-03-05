
import { useSelector, useDispatch } from 'react-redux'
import cn from 'classnames'
import './index.css'
import { set } from './slice'
import styles from './index.module.css'
import { useEffect } from 'react'


const Theme = ({ className }: any) => {
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

      className= {cn(
    		className,
    		styles.root,
    		theme === 'dark' ? styles.dark : styles.light)}
      onClick={handleChange}
    >
      <div className="theme-wrapper">
        <div className="navigation-link-invert">Активная тема </div>
        <div className="navigation-link"> Нективная тема</div>
      </div>
    </div>
      )
}

export default Theme
