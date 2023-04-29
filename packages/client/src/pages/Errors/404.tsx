import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button';
import { Title } from '@/components/Title';

import './index.scss';

export const Error404 = () => {
  const navigate = useNavigate();
  return (
    <div className='container-content bg-image_404 error-page'>
      <Title text='Ошибка 404' />
      <Button onClick={() => navigate(-1)} text='Вернуться назад' />
    </div>
  );
};
