import './index.scss';
import { Title } from '../../components/Title';
import classNames from 'classnames';
import rating from '../../../mock/rating';
import { useSelector } from 'react-redux';
import { getDataForLeaderBoard } from '../../Store/selectors';

const RatingPage = () => {
  // Минимальное и максимальная ширина в % отдельного столбца в гистограмме рейтинга пользователей
  const minWidth = 20;
  const maxWidth = 100;

  const currUser = useSelector(getDataForLeaderBoard);

  let userNumber = 0;

  // Переменные для хранения мин и макс значений в рейтинге пользователей
  let maxValue = 0;
  let minValue = 1000000;

  // Перебираем массив пользователей для поиска макс и мин значений рейтинга
  rating.forEach((item) => {
    if (item.money > maxValue) maxValue = item.money;
    if (item.money < minValue) minValue = item.money;
  });

  // Коэффициент для конвертации очков рейтинга юзеров в высоту столбца гистограммы
  const correction = (minValue / maxValue) * maxWidth;

  // Сортируем массив юзеров по очкам рейтинга
  rating.sort((a, b) => Number(b.money) - Number(a.money));

  const ratingList = rating.map((user) => {
    // Ограничиваем минимальную ширину столбца гистограммы
    const width = user.money * correction > minWidth ? user.money * correction : minWidth;
    userNumber++;

    // Класс leaderboard__user_current служит для выделения очков залогиненного юзера
    return (
      <li
        key={user.id}
        className={classNames('leaderboard__user', {
          leaderboard__user_current: user.id === currUser.id,
        })}
        style={{ width: `${width}%` }}>
        {`${userNumber}.  ${user.name}`}
      </li>
    );
  });

  return (
    <div className={classNames('container-content', 'container_start', 'bg-image_login')}>
      <div className='container_center colum-7'>
        <Title text='Рейтинг игроков' />
        <div className='leaderboard__user-container'>{ratingList}</div>
      </div>
    </div>
  );
};
export default RatingPage;
