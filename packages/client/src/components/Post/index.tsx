import { FC } from 'react';

import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { Icon } from '@/components/Icon';
import { Title } from '@/components/Title';

import { TPostProps } from './Post.typings';

import './index.scss';

export const Post: FC<TPostProps> = ({ isTopicStarter = false, data }) => {
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

      <div className='post-reactions'>
        <div className='post-reactions__item'>
          <Icon className='post-reactions__icon' icon='thumb-up' />
          <div className='post-reactions__count'>3</div>
        </div>
        <div className='post-reactions__item'>
          <Icon className='post-reactions__icon' icon='edit' />
          <div className='post-reactions__count'>3</div>
        </div>
        <div className='post-reactions__item'>
          <Icon className='post-reactions__icon' icon='cross' />
          <div className='post-reactions__count'>13</div>
        </div>
      </div>

      <div className='post__buttons'>
        <Button className='post__button' view='icon' icon='add-reaction' />

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
