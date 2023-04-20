import { Link } from '@/components/Link';
import { Title } from '@/components/Title';

import './index.scss';

export const Error500 = () => (
  <main className='main main-bg main-h container bg-image_error error-page'>
    <Title level='1'>50?: </Title>
    <Link className='button button_outline' to='/'>
      Вернуться на главную
    </Link>
  </main>
);
