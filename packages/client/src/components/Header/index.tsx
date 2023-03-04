import { Link, useLocation } from 'react-router-dom';
import './index.scss';

const Header = () => {
  const location = useLocation();
  return (
    <>
      <div className='header'>
        <div className='header__logo'></div>
        <div className='header__container header__container_link-autch'>
          <div className='header__container header__container_link'>
            <Link to={'/'} className='link'>
              Главная
            </Link>
            <Link to={'/game'} className='link'>
              Игра
            </Link>
            <Link to={'/rating'} className='link'>
              Рейтинг
            </Link>
            <Link to={'/forum'} className='link'>
              Форум
            </Link>
            <Link to={'/aboutUs'} className='link'>
              О нас
            </Link>
          </div>
          {location.pathname === '/' ? (
            <div className='header__container header__container_autch'>
              <Link to={'/login'} className='button'>
                Вход
              </Link>
              {/*<Link to={'/registration'} className='button'>Регистрация</Link>*/}
            </div>
          ) : (
            <div></div>
          )}
        </div>
      </div>
    </>
  );
};
export default Header;
