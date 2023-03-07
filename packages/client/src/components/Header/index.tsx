import { Link, useLocation, useNavigate } from 'react-router-dom';
import './index.scss';
import { Button } from '../Button';
import Spacer from '../../ui/Spacer';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
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
              <Button text={'ВХОД'} onClick={() => navigate('/login')} />
            </div>
          ) : (
            <div>{/*{TODO: добавить карточку юзера}*/}</div>
          )}
        </div>
      </div>
      <Spacer />
    </>
  );
};
export default Header;
