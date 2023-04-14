import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import { Header } from '@components/Header';
import { AboutUs } from '@pages/AboutUs';
import { Error404 } from '@pages/Errors/404';
import { Forum } from '@pages/Forum';
import { CreatePost } from '@pages/Forum/CreatePost';
import { Post } from '@pages/Forum/Post';
import { Game } from '@pages/Game';
import { LeaderboardPage } from '@pages/Leaderboard';
import { Login } from '@pages/Login';
import { Profile } from '@pages/Profile';
import { ChangePassword } from '@pages/Profile/ChangePassword';
import { Register } from '@pages/Register';
import { StartScreen } from '@pages/StartScreen';
import { useAuth } from '@utils/hooks/userAuth';

function RequireAuth() {
  const auth = useAuth();
  if (!auth.isAuth) {
    toast.error('Вы не авторизованы!');
    return <Navigate to='/login' />;
  }
  return <Outlet />;
}

export const Layout = () => {
  return (
    <>
      <div className='left-image'></div>
      <div className='content'>
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
      </div>
      <div className='right-image'></div>
      <ToastContainer
        className='custom-toastify'
        theme='dark'
        position='top-right'
        autoClose={5000}
        hideProgressBar={false}
        closeOnClick={true}
        pauseOnHover={true}
        draggable={true}
      />
    </>
  );
};
