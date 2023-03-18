import Theme from '../../components/Theme';
import './index.scss';
import { Title } from '../../components/Title';
import { Link, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { Fragment } from 'react';
import { currentUser } from '../../Store/selectors';
import { Avatar } from '../../components/Avatar';

type UserKeys = 'Логин' | 'Имя' | 'Фамилия' | 'Почта' | 'Телефон';

const Profile = () => {
  const user = useSelector(currentUser);
  const navigate = useNavigate();

  const userData = [
    { Логин: user.login },
    { Имя: user.first_name },
    { Фамилия: user.second_name },
    { Почта: user.email },
    { Телефон: user.phone },
  ];

  return (
    <div className='container-content bg-image_login container-content_main'>
      <div className='colum-6 container_center'>
        <Title text='Данные вашего Профиля' />
        <Avatar
          src={user.avatar ? `https://ya-praktikum.tech/api/v2/resources${user.avatar}` : undefined}
          size='default'
          onClick={() => navigate('./change-avatar')}
          isLink={true}
          title='Изменить аватар'
        />
        <div className='profile__container'>
          <div className=''>
            {userData.map((items, index) =>
              Object.keys(items).map((key: string) => (
                <Fragment key={index}>
                  <div className='profile__item-container'>
                    <div className='profile__item'>{key}</div>
                    <div className='profile__item profile__item-value'>
                      {items[key as UserKeys]}
                    </div>
                  </div>
                </Fragment>
              ))
            )}
          </div>
          <Theme />
        </div>
        <Link className='plane-link' to={'./edit'}>
          Изменить данные профиля
        </Link>
        <Link className='plane-link' to={'./change-password'}>
          Изменить пароль
        </Link>
      </div>
    </div>
  );
};
export default Profile;
