import { Link } from 'react-router-dom';
import { Title } from '@components/Title';
import classNames from 'classnames';

import mockData from './ForumMock';

import '@components/Button/index.scss';
import '@components/Header/index.scss';
import '@pages/StartScreen/index.scss';
import './index.scss';

export const Forum = () => {
  return (
    <div className={classNames('container-content', 'container-content_main', 'bg-image_login')}>
      <div className='forum__container'>
        <Title text='Актуальные темы' />
        {mockData.map((data) => (
          <Link className='plane-link' to={`./${data.id}`} key={data.id}>
            {data.title}
          </Link>
        ))}
      </div>
    </div>
  );
};
export default Forum;
