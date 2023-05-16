import { useEffect, useMemo, useState } from 'react';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { ForumTopicType } from '@typings/app.typings';
import classNames from 'classnames';
import moment from 'moment';

import { getForumTopics } from '@/components/ForumSlice/forumSlice';
import { Title } from '@/components/Title';
import { ForumHeader } from '@/pages/Forum/ForumHeader';
import { getTopics } from '@/store/selectors';
import { useAppDispatch } from '@/utils/hooks/reduxHooks';

import './index.scss';

export const Forum = () => {
  const [searchItem, setSearchItem] = useState('');
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getForumTopics());
  }, [dispatch]);
  const items = useSelector(getTopics);

  const forumData = useMemo(() => {
    let searchRes = items as unknown as ForumTopicType[];
    searchRes = searchRes?.filter((item) =>
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
              {!forumData?.length && <div>Нет тем,соответствующих запросу</div>}
              {forumData &&
                forumData?.map((data: ForumTopicType) => (
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
