import { Title } from '@components/Title';
import { uuid } from '@utils/generateId';

import { leaderboardListMock } from './leaderboardListMock';
import { LeaderboardView } from './LeaderboardView';

import './index.scss';

const title = 'Рейтинг';

export const Rating = () => {
  return (
    <div className='board'>
      <Title className='board__title' text={title} />
      <div className='board__info'>
        <div>№</div>
        <div>Игрок</div>
        <div>Результат</div>
      </div>
      <div className='board__user'>
        <LeaderboardView id={uuid()} order={8} avatar={''} username={'Ваш счет'} score={121} />
      </div>
      <div className='board__list'>
        {leaderboardListMock.map((player) => (
          <LeaderboardView key={player.id} {...player} />
        ))}
      </div>
    </div>
  );
};
