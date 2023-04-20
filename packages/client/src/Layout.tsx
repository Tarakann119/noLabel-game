import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';

import { Header } from '@/components/Header';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { AboutUs } from '@/pages/AboutUs';
import { Error404 } from '@/pages/Errors/404';
import { Forum } from '@/pages/Forum';
import { CreatePost } from '@/pages/Forum/CreatePost';
import { Post } from '@/pages/Forum/Post';
import { Game } from '@/pages/Game';
import { LeaderboardPage } from '@/pages/Leaderboard';
import { Login } from '@/pages/Login';
import { Profile } from '@/pages/Profile';
import { ChangePassword } from '@/pages/Profile/ChangePassword';
import { Register } from '@/pages/Register';
import { StartScreen } from '@/pages/StartScreen';
import { currentUser } from '@/store/selectors';
import { getCurrentUser, signInWithToken } from '@/store/slices/Autification';

export const Layout = () => {
  const user = useSelector(currentUser);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (!user.id) {
      const params = new URL(document.location.href).searchParams;
      const code = params.get('code');

      if (code) {
        window.history.pushState({}, '', 'http://localhost:3000/');
        dispatch(signInWithToken({ code }));
      } else {
        dispatch(getCurrentUser());
      }
    }
  }, []);

  const RequireAuth = () => {
    if (!user.id) {
      toast.error('Вы не авторизованы!');
      localStorage.setItem('destinationPath', location.pathname);
      return <Navigate to='/login' />;
    }

    return <Outlet />;
  };

  return (
    <>
      <Header />

      <Routes>
        <Route path='/' element={<StartScreen />} />
        <Route path='/login' element={<Login />} />
        <Route path='/registration' element={<Register />} />
        <Route path='/about' element={<AboutUs />} />
        <Route path='/forum' element={<Forum />} />
        <Route path='/forum/:id' element={<Post />} />
        <Route element={<RequireAuth />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/change-password' element={<ChangePassword />} />
          <Route path='/forum/create-post' element={<CreatePost />} />
          <Route path='/game' element={<Game />} />
          <Route path='/rating' element={<LeaderboardPage />} />
        </Route>
        <Route path='/*' element={<Error404 />} />
      </Routes>

      <ToastContainer
        className='custom-toastify'
        theme='dark'
        position='top-right'
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />
    </>
  );
};
