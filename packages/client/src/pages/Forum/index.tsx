import { Link } from 'react-router-dom';
import { Title } from '@components/Title';
import { ForumHeader } from '@pages/Forum/ForumHeader';
import { uuid } from '@utils/generateId';
import classNames from 'classnames';

import '@components/Button/index.scss';
import '@components/Header/index.scss';
import '@pages/StartScreen/index.scss';
import './index.scss';

const mockData = [
  { id: 1, href: '1', title: 'Моя тактика' },
  { id: 2, href: '2', title: 'Не получается пройти уровень' },
  { id: 3, href: '3', title: 'Дружелюбное комьюнити миф?' },
  {
    id: 4,
    href: '4',
    title: 'Опыт какой игры поможет при прохождении Tower Defence',
  },
  { id: 5, href: '5', title: 'Моя тактика' },
  { id: 6, href: '6', title: 'Не получается пройти уровень' },
  { id: 7, href: '7', title: 'Дружелюбное комьюнити миф?' },
  {
    id: 8,
    href: '8',
    title: 'Опыт какой игры поможет при прохождении Tower Defence',
  },
  { id: 9, href: '9', title: 'Моя тактика' },
  { id: 10, href: '10', title: 'Не получается пройти уровень' },
  { id: 11, href: '11', title: 'Дружелюбное комьюнити миф?' },
  {
    id: 12,
    href: '12',
    text: 'Опыт какой игры поможет п ри прохождении Tower Defence',
  },
  { id: 13, href: '13', title: 'Моя тактика' },
  { id: 14, href: '14', title: 'Не получается пройти уровень' },
  { id: 15, href: '15', title: 'Дружелюбное комьюнити миф?' },
  {
    id: 16,
    href: '15',
    title: 'Опыт какой игры поможет при прохождении Tower Defence',
  },
];

export const Forum = () => {
  return (
    <div className={classNames('container-content', 'container-content_main', 'bg-image_login')}>
      <div className='forum__container'>
        <ForumHeader />
        <Title text='Актуальные темы' />
        {mockData.map((data) => (
          <li className='topics-list__item' key={uuid()}>
            <Link className='plane-link' to={`./${data.href}`}>
              {data.title}
            </Link>
          </li>
        ))}
      </div>
    </div>
  );
};
