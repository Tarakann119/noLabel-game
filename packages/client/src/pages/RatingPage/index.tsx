import { useSelector } from 'react-redux';
import { State } from '../../../typings/app.typings';

const RatingPage = () => {
  const { points } = useSelector((state: State) => state.game);

  return (
    <ol>
      <li>
        <div className='avatar'></div>
        <div className='nickname'></div>
        <div className='points'>{points}</div>
      </li>
    </ol>
  );
};

export default RatingPage;
