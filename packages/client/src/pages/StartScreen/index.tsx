import { Link, useNavigate } from 'react-router-dom';
import LogoText from '../../components/LogoText';
import './index.scss';
import { Button } from '../../components/Button';
import Spacer from '../../ui/Spacer';
import '../../assets/styles/App.scss';
import Rating from '../../components/Leaderboard';

const StartScreen = () => {
  const navigate = useNavigate();

  return (
    <div className='container-content container-content_main bg-image'>
      <div className='container_center colum-8 container-start-screen'>
        <LogoText />
        <Button
          text='Начать игру'
          onClick={() => navigate('/login')}
          className='button button_view-primary'
        />

        <Link className='plane-link' to='/registration'>
          Нет аккаунта?
        </Link>
        <Spacer />
      </div>
      <div className='container colum-3 plane-link'>
        <Rating />
      </div>
    </div>
  );
};
export default StartScreen;
