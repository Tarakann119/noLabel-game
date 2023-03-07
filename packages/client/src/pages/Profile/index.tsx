import Theme from '../../components/Theme';
import './index.scss';
import { Title } from '../../components/Title';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store';
import { Fragment } from 'react';

type UserKeys = 'Логин' | 'Имя' | 'Фамилия' | 'Почта' | 'Телефон';

const Profile = () => {
  const user = useSelector((state: RootState) => state.auth.user);

  const userData = [
    { Логин: user.login },
    { Имя: user.first_name },
    { Фамилия: user.second_name },
    { Почта: user.email },
    { Телефон: user.phone },
  ];

  return (
    <div className='main-page-wrapper'>
      <div
        className='main-wrapper'
        style={{
          backgroundImage: `url(https://mobimg.b-cdn.net/v3/fetch/1d/1da7e32dc534959fa6a4f5aedc7e5729.jpeg)`,
        }}>
        <div className='form-login profile-wrapper'>
          <>
            <Title className='form-login-title' text='Данные вашего Профиля' />
            <div className='profile-image-name'>
              <Link className='navigation-link profile-navigation-link' to={'./change-avatar'}>
                <div className='profile-link-page'></div>
              </Link>
              <div className='navigation-link-invert'>{user.login}</div>
            </div>
            <div>
              <div className='profile-image-name'>
                {userData.map((items, index) =>
                  Object.keys(items).map((key: string) => (
                    <Fragment key={index}>
                      <div className='navigation-link profile-navigation-link'>{key}</div>
                      <div className='navigation-link-invert'>{items[key as UserKeys]}</div>
                    </Fragment>
                  ))
                )}
              </div>
            </div>
            <Theme />
            <Link className='plane-link' to={'./edit'}>
              Изменить данные профиля
            </Link>
            <Link className='plane-link' to={'./change-password'}>
              Изменить пароль
            </Link>
          </>
        </div>
      </div>
    </div>
  );
};
export default Profile;
