import React from 'react';
import { Avatar } from '../Avatar';

type UserCardProps = {
  variant: 'header' | 'leaderboard';
  buttonVariant: 'exit';
  avatarUrl?: string;
  userName: string;
  clickCard: () => void;
  clickButton: () => void;
};

const UserCard: React.FC<UserCardProps> = ({ avatarUrl, variant = 'header', userName }) => {
  const avatarSize = variant === 'header' ? 'default' : 'small';
  return (
    <div>
      <Avatar src={avatarUrl} size={avatarSize} />
      <div
        className=''
        onClick={() => {
          console.log('click card');
        }}>
        {userName}
      </div>
    </div>
  );
};

export default UserCard;
