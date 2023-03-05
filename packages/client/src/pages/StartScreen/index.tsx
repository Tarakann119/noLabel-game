import { Link, useNavigate } from 'react-router-dom';
import { LogoText } from '../../components/LogoText';
import './index.scss';
import { Button } from '../../components/Button';

const StartScreen = () => {
  const navigate = useNavigate();
  console.log(location);

  return (
    <div className='main-page-wrapper'>
      <div
        className='main-wrapper'
        style={{
          backgroundImage: `url(https://mobimg.b-cdn.net/v3/fetch/1d/1da7e32dc534959fa6a4f5aedc7e5729.jpeg)`,
        }}>
        <LogoText />
        <div className='button-wrapper'>
          <Button
            text='Начать игру'
            onClick={() => navigate('/login')}
            className='button button_view_primary'
          />
          <div>
            <Link className='plane-link' to={'/login'}>
              Нет аккаунта?
            </Link>
          </div>
        </div>
        <div className='text-description'>ТУТ ОПИСАНИЕ ИГРЫ</div>
      </div>
    </div>
  );
};
export default StartScreen;
