import './index.scss';
import { Title } from '../../components/Title';
import { Link } from 'react-router-dom';

const RatingPage = () => {
  return (
    <div className='main-page-wrapper'>
      <div
        className='main-wrapper'
        style={{
          // TODO: Убрать это
          backgroundImage: `url(https://mobimg.b-cdn.net/v3/fetch/1d/1da7e32dc534959fa6a4f5aedc7e5729.jpeg)`,
        }}>
        <div className='form-login'>
          <Title className='form-login-title' text='Рейтинг игроков' />
          <div className='profile-image-name'>
            <Link className='navigation-link profile-navigation-link' to={'/profile'}>
              <div className='profile-link-page'></div>
            </Link>
            <div className='navigation-link-invert'>Джон Доу</div>
            <div className='navigation-link rating-money'>278</div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default RatingPage;
