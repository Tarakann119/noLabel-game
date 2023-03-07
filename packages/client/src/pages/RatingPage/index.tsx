import './index.scss';
import { Title } from '../../components/Title';
import classNames from 'classnames';
import rating from '../../../mok/rating';

const RatingPage = () => {
  const ratingList = rating.map((user, index) => {
    return <li>{user.name}</li>;
  });

  return (
    <div className={classNames('container-content', 'container_start', 'bg-image_login')}>
      <div className='form-login'>
        <Title text='Рейтинг игроков' />
        {ratingList}
      </div>
    </div>
  );
};
export default RatingPage;
