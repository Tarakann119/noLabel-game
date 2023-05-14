import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ForumTopicType } from '@typings/app.typings';
import axios from 'axios';
import classNames from 'classnames';

import { Title } from '@/components/Title';
import { ForumHeader } from '@/pages/Forum/ForumHeader';

import './index.scss';

// const mockData = [
//   {
//     id: 1,
//     author: 'author',
//     last_message: { author: 'mes_author', created_at: '22.04.2023 1:11' },
//     href: '1',
//     title: 'Моя тактика',
//   },
//   {
//     id: 2,
//     author: 'author',
//     last_message: { author: 'mes_author', created_at: '22.04.2023 1:11' },
//     href: '2',
//     title: 'Не получается пройти уровень',
//   },
//   {
//     id: 3,
//     author: 'author',
//     last_message: { author: 'mes_author', created_at: '22.04.2023 1:11' },
//     href: '3',
//     title: 'Дружелюбное комьюнити миф?',
//   },
//   {
//     id: 4,
//     author: 'author',
//     last_message: { author: 'mes_author', created_at: '22.04.2023 1:11' },
//     href: '4',
//     title: 'Опыт какой игры поможет при прохождении Tower Defence',
//   },
//   {
//     id: 5,
//     author: 'author',
//     last_message: { author: 'mes_author', created_at: '22.04.2023 1:11' },
//     href: '5',
//     title: 'Моя тактика',
//   },
//   {
//     id: 6,
//     author: 'author',
//     last_message: { author: 'mes_author', created_at: '22.04.2023 1:11' },
//     href: '6',
//     title: 'Не получается пройти уровень',
//   },
//   {
//     id: 7,
//     author: 'author',
//     last_message: { author: 'mes_author', created_at: '22.04.2023 1:11' },
//     href: '7',
//     title: 'Дружелюбное комьюнити миф?',
//   },
//   {
//     id: 8,
//     author: 'author',
//     last_message: { author: 'mes_author', created_at: '22.04.2023 1:11' },
//     href: '8',
//     title: 'Опыт какой игры поможет при прохождении Tower Defence',
//   },
//   {
//     id: 9,
//     author: 'author',
//     last_message: { author: 'mes_author', created_at: '22.04.2023 1:11' },
//     href: '9',
//     title: 'Моя тактика',
//   },
//   {
//     id: 10,
//     author: 'author',
//     last_message: { author: 'mes_author', created_at: '22.04.2023 1:11' },
//     href: '10',
//     title: 'Не получается пройти уровень',
//   },
//   {
//     id: 11,
//     author: 'author',
//     last_message: { author: 'mes_author', created_at: '22.04.2023 1:11' },
//     href: '11',
//     title: 'Дружелюбное комьюнити миф?',
//   },
//   {
//     id: 12,
//     author: 'author',
//     last_message: { author: 'mes_author', created_at: '22.04.2023 1:11' },
//     href: '12',
//     text: 'Опыт какой игры поможет п ри прохождении Tower Defence',
//   },
//   {
//     id: 13,
//     author: 'author',
//     last_message: { author: 'mes_author', created_at: '22.04.2023 1:11' },
//     href: '13',
//     title: 'Моя тактика',
//   },
//   {
//     id: 14,
//     author: 'author',
//     last_message: { author: 'mes_author', created_at: '22.04.2023 1:11' },
//     href: '14',
//     title: 'Не получается пройти уровень',
//   },
//   {
//     id: 15,
//     author: 'author',
//     last_message: { author: 'mes_author', created_at: '22.04.2023 1:11' },
//     href: '15',
//     title: 'Дружелюбное комьюнити миф?',
//   },
//   {
//     id: 16,
//     author: 'author',
//     last_message: { author: 'mes_author', created_at: '22.04.2023 1:11' },
//     href: '15',
//     title: 'Опыт какой игры поможет при прохождении Tower Defence',
//   },
// ];

export const Forum = () => {
  const [items, setItems] = useState<ForumTopicType[]>([]);
  const [searchItem, setSearchItem] = useState('');
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(`http://localhost:3001/api/forum/topics/all`);
        setItems(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);

  const forumData = useMemo(() => {
    let searchRes = items;
    searchRes = searchRes.filter((item) =>
      item.title.toLowerCase().includes(searchItem.toLowerCase())
    );
    return searchRes;
  }, [searchItem, items]);
  return (
    <div
      className={classNames(
        'container-content',
        'container-content_main',
        'bg-image_login',
        'forum'
      )}>
      <div className='forum__container'>
        <ForumHeader setSearchInfo={setSearchItem} />

        <Title text='Актуальные темы' />
        {items.length ? (
          <div className='forum-topics'>
            <div className='forum-topics-header'>
              <div className='forum-topics-header__title'>Загловок / Автор</div>
              <div className='forum-topics-header__title'>
                {/* При сортировке добавлять класс в завивисомтсти от направления сортировки.
                  forum-topics-header__sort_sorted-down /
                  forum-topics-header__sort_sorted-up
                  По умолчанию сортировки нет.
              */}
                <button className='forum-topics-header__sort'>Последнее сообщение от</button>
              </div>
            </div>

            <ol className='forum-topics-list'>
              {!forumData.length && <div>Нет тем,соответствующих запросу</div>}
              {forumData.map((data) => (
                <li className='forum-topics-list__item' key={data.id}>
                  <div className='forum-topics-list__group'>
                    <Link className='plane-link' to={`./${data.id}`}>
                      {data.title}
                    </Link>
                    <span>{data.author.login}</span>
                  </div>
                  <div className='forum-topics-list__group'>
                    <span>{data.last_message.author_id}</span>
                    <span>{data.last_message.created_at}</span>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        ) : (
          <div>Пока нет ни одной темы</div>
        )}
      </div>
    </div>
  );
};
export default Forum;
