import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { Avatar } from '@/components/Avatar';
import { BurgerMenu } from '@/components/BurgerMenu';
import { Dropdown } from '@/components/Dropdown';
import { Icon } from '@/components/Icon';
import { Link } from '@/components/Link';
import { ThemeSwitcher } from '@/components/ThemeSwitcher';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { currentUser } from '@/store/selectors';
import { logOut } from '@/store/slices/Autification';

import { HeaderNav } from './HeaderNav';

import './index.scss';

export const Header = () => {
  const user = useSelector(currentUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const handleLogOut = async () => {
    await dispatch(logOut());
    navigate('/');
  };

  return (
    <header className='header'>
      <div className='header__container container'>
        <Link className='header__logo' to={'/'}>
          <Icon className='header-logo' icon='logo' />
        </Link>

        <div className='header__block desktop-only'>
          <HeaderNav />

          <ThemeSwitcher className='header__switcher' />

          {!user.login ? (
            <Link className='button header__link' to={'/login'}>
              Войти
            </Link>
          ) : (
            <Dropdown
              className='header__dropdown'
              childrenBtn={<Avatar src={user.avatar ?? ''} size='header' />}
              childrenMenu={
                <>
                  <div className='header-user'>
                    <div className='header-user__login'>{`${user.first_name} ${user.second_name}`}</div>
                    <div className='header-user__email'>{user.email}</div>
                  </div>

                  <div className='header-user-links'>
                    <Link className='button header__link' to={'/profile'}>
                      Профиль
                    </Link>
                    <button className='button header__link' onClick={handleLogOut}>
                      Выйти
                    </button>
                  </div>
                </>
              }></Dropdown>
          )}
        </div>

        <div className='header__block mobile-only'>
          <ThemeSwitcher className='header__switcher' />

          <BurgerMenu className='header__burger-menu'>
            {!user.login ? (
              <Link className='button header__link' to={'/login'}>
                Войти
              </Link>
            ) : (
              <>
                <div className='header-user'>
                  <Avatar className='header-user__avatar' src={user.avatar ?? ''} size='header' />
                  <div className='header-user__block'>
                    <div className='header-user__login'>{`${user.first_name} ${user.second_name}`}</div>
                    <div className='header-user__email'>{user.email}</div>
                  </div>
                </div>

                <div className='header-user-links'>
                  <Link className='button header__link' to={'/profile'}>
                    Профиль
                  </Link>
                  <button className='button header__link' onClick={handleLogOut}>
                    Выйти
                  </button>
                </div>
              </>
            )}

            <HeaderNav />
          </BurgerMenu>
        </div>
      </div>
    </header>
  );
};
