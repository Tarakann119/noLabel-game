import { FC } from 'react';

import { Avatar } from '../Avatar';
import { Button } from '../Button';
import { Title } from '../Title';

import { TPost } from './Post.typings';

import './index.scss';

export const Post: FC<TPost> = ({ isTopicStarter = false, data }) => {
  const { title, created_at, text, user } = data;

  return (
    <div className='post'>
      {title && (
        <Title size='small' className='post-title' level='1'>
          Тема: {title}
        </Title>
      )}

      <div className='post__user-info'>
        <Avatar className='post__avatar' size='header' />
        <div className='post__author'>{user.login}</div>
      </div>

      <div className='post__group'>
        <div className='post__created'>{created_at}</div>
        <div className='post__text'>{text}</div>
      </div>

      <div className='post__group'>
        {isTopicStarter ? (
          <Button className='post__button' view='outline'>
            Комментировать
          </Button>
        ) : (
          <Button className='post__button' view='outline'>
            Ответить
          </Button>
        )}
      </div>
    </div>
  );
};
