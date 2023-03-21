import { Avatar } from '@components/Avatar';

import { LeaderboardViewProps } from './LiderboardView.typings';

import './index.scss';

export const LeaderboardView = (props: LeaderboardViewProps) => {
  return (
    <div className='player'>
      <div className='player__number'>{props.order}</div>
      <div className='player__profile'>
        <Avatar src={props.avatar} className={'player__image'} size='small' style={{ margin: 0 }} />
        <div className='player__name'>{props.username}</div>
      </div>
      <div className='player__score'>{props.score}</div>
    </div>
  );
};
