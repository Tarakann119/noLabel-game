import { useSelector } from 'react-redux';
import { Title } from '@components/Title';
import { getDataForLeaderBoard, leaderboard } from '@store/selectors';
import { LeaderboardType } from '@typings/app.typings';
import { uuid } from '@utils/generateId';
import classNames from 'classnames';

import './index.scss';

export const Rating = () => {
  const leaderboardList = useSelector(leaderboard) as LeaderboardType;
  const currUser = useSelector(getDataForLeaderBoard);

  // Минимальное и максимальная ширина в % отдельного столбца в гистограмме рейтинга пользователей
  const minWidth = 20;
  const maxWidth = 100;
  let userNumber = 0;

  // Переменные для хранения мин и макс значений в рейтинге пользователей
  const maxValue = leaderboardList[0].noLabelScore;

  // Коэффициент для конвертации очков рейтинга юзеров в высоту столбца гистограммы
  const correction = maxWidth / maxValue;

  const ratingList = leaderboardList.map((user) => {
    // Ограничиваем минимальную ширину столбца гистограммы
    const width = Math.floor(
      user.noLabelScore * correction > minWidth ? user.noLabelScore * correction : minWidth
    );
    userNumber++;

    // Класс leaderboard__user_current служит для выделения очков залогиненного юзера
    return (
      <li
        key={uuid()}
        className={classNames('leaderboard__user', {
          leaderboard__user_current: user.id === currUser.id,
        })}
        style={{ width: `${width}%` }}>
        <span className='leaderboard__user-text'>
          {`${userNumber}.  ${user.first_name} ${user.second_name}  ${user.noLabelScore}`}
        </span>
      </li>
    );
  });

  return (
    <div className='container-content bg-image_login container_start'>
      <div className='container_center colum-7'>
        <Title text='Рейтинг игроков' />
        <div className='leaderboard__user-container'>{ratingList}</div>
      </div>
    </div>
  );
};
