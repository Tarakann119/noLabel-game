import { Link } from 'react-router-dom';
import { Title } from '@components/Title';
import classNames from 'classnames';

import './index.scss';

export const ForumTheme = () => {
  // из юрл берем айди, отправляем запрос,рендерим данные(
  //   создатель темы, айди темы, вопрос, массив комментарие(айди, ник, ответ)
  // )
  return (
    <div className={classNames('container-content', 'container-content_main', 'bg-image_login')}>
      <div className='forum__container'>
        <Title className='form-login-title' text='Название темы' />
        <Link className='plane-link' to={'/theme1'}>
          Комментарий 1
        </Link>
      </div>
    </div>
  );
};
