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
            <Link to={'/'} className='custom-link'>
              Главная
            </Link>
            <Link to={'/game'} className='custom-link'>
              Game
            </Link>
            <Link to={'/rating'} className='custom-link'>
              Рейтинг
            </Link>
            <Link to={'/forum'} className='custom-link'>
              Форум
            </Link>
            <Link to={'/aboutUs'} className='custom-link'>
              О нас
            </Link>
          </div>
          {location.pathname === '/' ? (
            <div className='header__container header__container_autch'>
              <Link to={'/login'} className='custom-button'>
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
