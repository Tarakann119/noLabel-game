import { FC } from 'react';
import { toast } from 'react-toastify';

import { Avatar } from '@/components/Avatar';
import { ButtonImg } from '@/ui/ButtonImg';

import { UserCardProps } from './UserCard.typings';

import './index.scss';

export const UserCard: FC<UserCardProps> = ({
  avatarUrl,
  variant = 'header',
  userName,
  clickCard,
  clickButton,
}) => {
  if (variant === 'header') {
    return (
      <div className='colum-3 user-card__container '>
        <Avatar src={avatarUrl} size='header' onClick={clickCard} />
        <div className='plane-link' onClick={clickCard}>
          {userName}
        </div>
        <ButtonImg variant='logout' onClick={clickButton} />
      </div>
    );
  } else {
    toast.error('Этот вариант компонента UserCard ещё не готов');
    return <div> Заглушка </div>;
  }
};
