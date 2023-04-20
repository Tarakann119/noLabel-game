import { useEffect, useLayoutEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import classNames from 'classnames';

import { Loader } from '@/components/Loader';
import { Pagination } from '@/components/Pagination';
import { Title } from '@/components/Title';
import { useAppDispatch } from '@/hooks/reduxHooks';
import {
  getCurrUserLeaderboardInfo,
  getLeaderboard,
  getLeaderboardIsLoading,
} from '@/store/selectors';
import { fetchLeaderboard } from '@/store/slices/Leaderboard';

import './index.scss';

export const LeaderboardPage = () => {
  const dispatch = useAppDispatch();
  const leaderboardList = useSelector(getLeaderboard);
  const currUserLeaderboardInfo = useSelector(getCurrUserLeaderboardInfo);
  const [size, setSize] = useState(0);
  const isLoading = useSelector(getLeaderboardIsLoading);
  const [itemOffset, setItemOffset] = useState(0);
  const itemsPerPage = 15;
  const breakpoint = 544;

  const endOffset = itemOffset + itemsPerPage;

  const currentItems = leaderboardList.slice(itemOffset, endOffset);
  const pageCount = Math.ceil(leaderboardList.length / itemsPerPage);

  const handlePageClick = (selectedItem: { selected: number }) => {
    const newOffset = (selectedItem.selected * itemsPerPage) % leaderboardList.length;
    setItemOffset(newOffset);
  };

  useLayoutEffect(() => {
    const updateSize = () => {
      setSize(window.innerWidth);
    };

    window.addEventListener('resize', updateSize);
    updateSize();

    return () => window.removeEventListener('resize', updateSize);
  }, []);

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  const calcWidth = (score: number) => {
    const minWidth = 20;
    const maxWidth = 100;
    const maxValue = leaderboardList[0].towerDefenceScore;
    const correction = maxWidth / maxValue;

    return score * correction > minWidth ? Math.floor(score * correction) : minWidth;
  };

  return (
    <main className='container leaderboard main main-bg main-h bg-image_base'>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Title className='leaderboard__title' level='1'>
            Рейтинг игроков
          </Title>

          {currUserLeaderboardInfo && (
            <div className='leaderboard-user'>
              <div className='leaderboard-user__title'>Ваш результат :</div>
              <div className='leaderboard-user__result'>
                {`${currUserLeaderboardInfo.order}. ${currUserLeaderboardInfo.first_name} ${currUserLeaderboardInfo.second_name} ${currUserLeaderboardInfo.towerDefenceScore}`}
              </div>
            </div>
          )}

          <ol className='leaderboard__list'>
            {currentItems.map(({ id, order, first_name, second_name, towerDefenceScore }) => (
              <li
                key={id}
                className={classNames('leaderboard__item', {
                  leaderboard__item_current: id === currUserLeaderboardInfo?.id,
                })}
                style={size >= breakpoint ? { width: `${calcWidth(towerDefenceScore)}%` } : {}}>
                <span className='leaderboard__text'>
                  {`${order}. ${first_name} ${second_name} ${towerDefenceScore}`}
                </span>
              </li>
            ))}
          </ol>

          <Pagination
            className='leaderboard__pagination'
            pageCount={pageCount}
            handlePageClick={handlePageClick}
          />
        </>
      )}
    </main>
  );
};
