import { Link } from '@components/Link';
import { Title } from '@components/Title';

import './index.scss';

export const Error500 = () => (
  <main className='main main-bg main-h container  bg-image_404 error-page'>
    <Title level='1'>50?: </Title>
    <Link className='button' to='/'>
      Вернуться на главную
    </Link>
  </main>
);
