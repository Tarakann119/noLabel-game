import { Avatar } from '../../Avatar';
import './index.scss';

export interface ProfileProps {
  id: string|number,
  order: number;
  avatar: string;
  username: string;
  score: number;
}

export function LeaderboardView(props: ProfileProps) {
  return (
    <div className='player'>
      <div className='player__number'>{props.order}</div>
      <div className='player__profile'>
        <Avatar src={props.avatar} className={'player__image'} size='small' />
        <div className='player__name'>{props.username}</div>
      </div>
      <div className='player__score'>{props.score}</div>
    </div>
  );
}
