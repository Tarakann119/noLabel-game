import { Title } from '../../components/Title';
import { Link } from 'react-router-dom';
import './index.scss';

const ForumTheme = () => {
  // из юрл берем айди, отправляем запрос,рендерим данные(
  //   создатель темы, айди темы, вопрос, массив комментарие(айди, ник, ответ)
  // )
  return (
    <>
      <div className='main-page-wrapper'>
        <div
          className='main-wrapper'
          style={{
            backgroundImage: `url(https://mobimg.b-cdn.net/v3/fetch/1d/1da7e32dc534959fa6a4f5aedc7e5729.jpeg)`,
          }}>
          <div className='form-login'>
            <Title className='form-login-title' text='Название темы' />
            <Link className='navigation-link profile-navigation-link' to={'/theme1'}>
              Комментарий 1
            </Link>
          </div>
        </div>
      </div>

      <input />
    </>
  );
};
export default ForumTheme;
