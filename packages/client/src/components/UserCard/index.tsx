import React from 'react';
import { Avatar } from '../Avatar';
import { toast } from 'react-toastify';
import ButtonImg from '../../ui/ButtonImg';
import './index.scss';

type UserCardProps = {
  variant: 'header' | 'leaderboard';
  buttonVariant?: string;
  avatarUrl?: string;
  userName: string;
  clickCard?: () => void;
  clickButton?: () => void;
};

const UserCard: React.FC<UserCardProps> = ({
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

export default UserCard;
