import { FC } from 'react';

import { Link } from '@/components/Link';

import './index.scss';

export type TTopic = {
  wrapper: keyof typeof Wrappers;
  data: {
    id: number;
    title: string;
    author: string;
    created_at: string;
    answers_count: number;
    views_count: number;
    last_answer: {
      created_at: string;
      author: string;
    };
  };
};

enum Wrappers {
  LI = 'li',
  DIV = 'div',
}

export const Topic: FC<TTopic> = ({ wrapper, data }) => {
  const { id, title, author, created_at, answers_count, views_count, last_answer } = data;
  const WrapTag = `${Wrappers[wrapper]}` as keyof JSX.IntrinsicElements;

  return (
    <WrapTag className='topic'>
      <div className='topic__group topic__group_main'>
        <Link className='topic__title' to={`/forum/${id}`}>
          {title}
        </Link>
        <div className=''>
          <span className='topic__author'>{author}</span>,
          <span className='topic__created'>{created_at}</span>
        </div>
      </div>

      <div className='topic__group topic__group_center'>
        <div className='topic__count'>
          Ответы: <span className='topic__number'>{answers_count}</span>
        </div>
        <div className='topic__count'>
          Просмотры: <span className='topic__number'>{views_count}</span>
        </div>
      </div>

      <div className='topic__group topic__group_right'>
        <div className='topic__author'>{last_answer.author}</div>
        <div className='topic__created'>{last_answer.created_at}</div>
      </div>
    </WrapTag>
  );
};
