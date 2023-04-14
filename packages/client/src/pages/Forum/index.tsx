import { useState } from 'react';
import ReactPaginate from 'react-paginate';
import { useSelector } from 'react-redux';
import { InputValidate } from '@components/InputValidate';
import { Link } from '@components/Link';
import { Topic } from '@components/Topic';
import { currentUser } from '@store/selectors';

import { Pagination } from '@/components/Pagination';

import mockData from './ForumMock';

import './index.scss';

export const Forum = () => {
  const user = useSelector(currentUser);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 4;
  const endOffset = itemOffset + itemsPerPage;
  const currentItems = mockData.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(mockData.length / itemsPerPage);

  const handlePageClick = (selectedItem: { selected: number }) => {
    const newOffset = (selectedItem.selected * itemsPerPage) % mockData.length;
    setItemOffset(newOffset);
  };

  return (
    <main className='main main-bg main-h forum-page container'>
      <div className='forum-page__header'>
        <InputValidate className='forum-page__search' type='search' placeholder='Поиск по темам' />
        {user && (
          <Link className='button button_outline forum-page__button' to='/forum/create-post'>
            Создать тему
          </Link>
        )}
      </div>

      <div className='forum-page__content'>
        <div className='forum-page__filter'>
          <div className='forum-page__group forum-page__group_main'>Загловок / Автор</div>
          <div className='forum-page__group'>
            <button className='button forum-page__sort'>Ответов</button>/
            <button className='button forum-page__sort'>Просмотров</button>
          </div>
          <div className='forum-page__group forum-page__group_right'>
            <button className='button forum-page__sort forum-page__sort_toggle'>
              Последнее сообщение от
            </button>
          </div>
        </div>

        <ol className='forum-page__topics'>
          {currentItems.map((data) => (
            <Topic wrapper='LI' data={data} key={data.id} />
          ))}
        </ol>

        <Pagination
          className='forum-page__pagination'
          pageCount={pageCount}
          handlePageClick={handlePageClick}
        />
      </div>
    </main>
  );
};
