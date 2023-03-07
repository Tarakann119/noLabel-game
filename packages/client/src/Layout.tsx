import { Navigate, Outlet, Route, Routes } from 'react-router-dom';
import StartScreen from './pages/StartScreen';
import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import RatingPage from './pages/RatingPage';
import { toast, ToastContainer } from 'react-toastify';
import Profile from './pages/Profile';
import MainMenu from './pages/MainMenu';
import Header from './components/Header';
import Error404 from './pages/ErrorPages/404';
import Forum from './pages/Forum';
import ForumTheme from './pages/Forum/ForumTheme';
import AboutUs from './pages/AboutUs';
import ChangePassword from './pages/Profile/ChangePassword';
import ChangeAvatar from './pages/Profile/ChangeAvatar';
import Game from './pages/Game';
import ChangeProfile from './pages/Profile/ChangeProfile';
import Footer from './components/Footer';
import { useAuth } from '../utils/hooks/useAuth';
const Layout = () => {
  function RequireAuth() {
    const auth = useAuth();
    if (!auth.isAuth) {
      toast.error('Вы не авторизованы!');
      return <Navigate to='/login' />;
    }

    return <Outlet />;
  }

  return (
    <>
      <Header />
      <Routes>
        <Route path='/' element={<StartScreen />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/registration' element={<RegisterPage />} />
        <Route path='/rating' element={<RatingPage />} />
        <Route path='/aboutUs' element={<AboutUs />} />
        <Route element={<RequireAuth />}>
          <Route path='/profile' element={<Profile />} />
          <Route path='/profile/change-password' element={<ChangePassword />} />
          <Route path='/profile/change-avatar' element={<ChangeAvatar />} />
          <Route path='/menu' element={<MainMenu />} />
          <Route path='/forum' element={<Forum />} />
          <Route path='/forum/:id' element={<ForumTheme />} />
          <Route path='/profile/edit' element={<ChangeProfile />} />
          <Route path='/game' element={<Game />} />
        </Route>
        <Route path='/*' element={<Error404 />} />
      </Routes>
      <Footer />
      <ToastContainer
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

export default Layout;
