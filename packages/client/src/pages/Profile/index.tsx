import Theme from '../../components/Theme';
import './index.scss';
import { Title } from '../../components/Title';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';
import classNames from 'classnames';
import { currentUser } from '../../Store/selectors';

type UserKeys = 'Логин' | 'Имя' | 'Фамилия' | 'Почта' | 'Телефон';

const Profile = () => {
  const user = useSelector(currentUser);
  console.log(user);

  const userData = [
    { Логин: user.login },
    { Имя: user.first_name },
    { Фамилия: user.second_name },
    { Почта: user.email },
    { Телефон: user.phone },
  ];

  return (
    <div className={classNames('container-content', 'bg-image_login', 'container-content_main')}>
      <div className={classNames('colum-6', 'container__reg-form')}>
        <>
          <Title text='Данные вашего Профиля' />
          <div className='profile-image-name'>
            <Link className='plane-link' to={'./change-avatar'}>
              Изменить аватар
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
  );
};
export default Profile;
