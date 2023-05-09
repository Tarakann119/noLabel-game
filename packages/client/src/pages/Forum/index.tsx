import { useEffect, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import { ForumTopicType } from '@typings/app.typings';
import axios from 'axios';
import classNames from 'classnames';
import moment from 'moment';

import { Title } from '@/components/Title';
import { ForumHeader } from '@/pages/Forum/ForumHeader';
import { showError } from '@/utils/ShowError';

import './index.scss';

export const Forum = () => {
  const [items, setItems] = useState<ForumTopicType[]>([]);
  const [searchItem, setSearchItem] = useState('');
  useEffect(() => {
    const fetchData = () => {
      axios(`http://localhost:3001/api/forum/topics/all`)
        .then((result) => {
          setItems(result.data);
        })
        .catch(() => showError());
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
                    <span>
                      {data.author.first_name} {data.author.second_name}
                    </span>
                  </div>
                  <div className='forum-topics-list__group'>
                    <span>{data.last_message.author_id}</span>
                    <span>
                      {moment(data.last_message.created_at).format('YYYY-MM-DD HH:mm:ss')}
                    </span>
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
