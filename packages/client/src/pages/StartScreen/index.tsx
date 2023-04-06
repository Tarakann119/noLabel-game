import { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@components/Button';
import { Rating } from '@components/Leaderboard';
import { LogoText } from '@components/LogoText';
import { Spacer } from '@ui/Spacer';
import { useAppDispatch } from '@utils/hooks/reduxHooks';

import { signInWithToken } from '@/components/Autification/slice';

import './index.scss';
import '@assets/styles/App.scss';

export const StartScreen = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  useEffect(() => {
    const params = new URL(document.location.href).searchParams;
    const code = params.get('code');

    if (code) {
      window.history.pushState({}, '', 'http://localhost:3000/');
      dispatch(signInWithToken({ code, navigate }));
    }
  }, []);

  return (
    <div className='container-content container-content_main bg-image'>
      <div className='container_center colum-8 container-start-screen' style={{ marginLeft: 0 }}>
        <LogoText />
        <Button
          text='Начать игру'
          onClick={() => navigate('/login')}
          className='button button_primary'
          style={{ margin: 20 }}
        />

        <Link className='plane-link' to='/registration' style={{ marginBottom: 20 }}>
          Нет аккаунта?
        </Link>
        <Spacer />
      </div>
      <div className='container colum-3' style={{ paddingLeft: 20 }}>
        <Rating />
      </div>
    </div>
  );
};
