import { useNavigate } from 'react-router-dom';

import { Button } from '@/components/Button';

export const Error500 = () => {
  const navigate = useNavigate();
  return (
    <div className='container-content bg-image_404 error-page'>
      Ошибка 500
      <Button onClick={() => navigate(-1)} text='Вернуться назад' />
    </div>
  );
};
