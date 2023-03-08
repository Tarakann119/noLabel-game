import { Link, useLocation, useNavigate } from 'react-router-dom';
import './index.scss';
import { Button } from '../Button';
import Spacer from '../../ui/Spacer';
import { toast } from 'react-toastify';
import UserCard from '../UserCard';

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
            {/*TODO: эта ссылка есть в футоре*/}
            {/*<Link to={'/aboutUs'} className='custom-link'>*/}
            {/*  О нас*/}
            {/*</Link>*/}
          </div>
          {location.pathname === '/' ? (
            <div className='header__container header__container_autch'>
              <Button text={'ВХОД'} onClick={() => navigate('/login')} />
            </div>
          ) : (
            <div>
              {/*{// TODO: Нужно достать из стора имя или логин пользователя}*/}
              <UserCard
                variant='header'
                userName='Имя Юзера'
                clickCard={() => navigate('/profile')}
                clickButton={() => LogOut()}
              />
            </div>
          )}
        </div>
      </div>
      <Spacer />
    </>
  );
};
export default Header;
