import { Link, useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Button } from '../Button';
import './index.scss';

const Header = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const LogOut = async () => {
    fetch('https://ya-praktikum.tech/api/v2/auth/logout', {
      method: 'post',
      credentials: 'include',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        toast.success('Вы вышли из профиля!');
        navigate('/');
      })
      .catch(() => toast.error('Что-то не так...'));
  };

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
              Игра
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
            <div>
              {/*{// TODO: Нужно добавить компонент карточки юзера}*/}
              <Button text='Выход' onClick={() => LogOut()} />
            </div>
          )}
        </div>
      </div>
    </>
  );
};
export default Header;
