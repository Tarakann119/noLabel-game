import { Link } from 'react-router-dom';

import './index.scss';

export function AddTopic() {
  return (
    <div className='add-topic'>
      <Link to='/forum/create-topic'>Создать новую тему</Link>
    </div>
  );
}
