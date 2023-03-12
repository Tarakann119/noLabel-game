import './index.scss';
import { LeaderboardView } from './LeaderboardView';
import { Title } from '../Title';
import { leaderboardListMok } from './leaderboardListMok';
import { uuid } from '../../../utils/generateId';

const title = 'Рейтинг';

const Rating = () => {
  return (
    <div className='board'>
      <Title className={'board__title'} text={title} />
      <div className='board__info'>
        <div>№</div>
        <div>Игрок</div>
        <div>Результат</div>
      </div>
      <div className='board__user'>
        <LeaderboardView id={uuid()} order={8} avatar={''} username={'Ваш счет'} score={121} />
      </div>
      <div className='board__list'>
        {leaderboardListMok.map((player) => (
          <LeaderboardView key={player.id} {...player} />
        ))}
      </div>
    </div>
  );
};

export default Rating;
