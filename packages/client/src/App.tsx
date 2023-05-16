import { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';

import { getCurrentUser } from '@/components/Autification/slice';
import { LoadingProvider } from '@/components/LoaderComponent';
import { useAppDispatch } from '@/utils/hooks/reduxHooks';

import '@/ui/Loader/img/Loader.png';

import { fetchLeaderboard, pushUserScore } from './components/Leaderboard/slice';
import { Layout } from './Layout';

import '@/assets/styles/App.scss';
import 'react-toastify/dist/ReactToastify.css';

export const App = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const user = localStorage.getItem('user');

    if (user) {
      dispatch(getCurrentUser({ navigate, data: 'init' }));
      dispatch(fetchLeaderboard());
      dispatch(pushUserScore({ score: 100 }));
    }
  }, []);
  return (
    <>
      <LoadingProvider>
        <Routes>
          <Route path='/*' element={<Layout />} />
        </Routes>
      </LoadingProvider>
    </>
  );
};
