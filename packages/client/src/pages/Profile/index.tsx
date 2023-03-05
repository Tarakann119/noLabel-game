import Theme from '../../components/Theme';
import './index.scss';
import { Title } from '../../components/Title';
import { Link } from 'react-router-dom';

const Profile = () => {
  //     useEffect(()=>{
  //         axios.get(`https://ya-praktikum.tech/api/v2/auth/user`)
  //         .then((response: any) => {
  //           const user = response;
  //           localStorage.setItem("userId", user.id)
  // console.log(response)
  //         })
  //     },[])
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
              <Link className='navigation-link profile-navigation-link' to={'/profile'}>
                <div className='profile-link-page'></div>
              </Link>
              <div className='navigation-link-invert'>Имя</div>
            </div>
            <div>
              <div className='profile-image-name'>
                <div className='navigation-link profile-navigation-link'>key</div>
                <div className='navigation-link-invert'>value</div>
              </div>
            </div>
            <Theme />
            <Link className='plane-link' to={'/ChangeProfile'}>
              Изменить данные профиля
            </Link>
            <Link className='plane-link' to={'/ChangePassword'}>
              Изменить пароль
            </Link>
          </>
        </div>
      </div>
    </div>
  );
};
export default Profile;
