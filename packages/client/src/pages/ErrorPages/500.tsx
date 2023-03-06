import { useNavigate } from 'react-router-dom';
const Eror500 = () => {
  const navigate = useNavigate();
  return (
    <>
      <div>
        Ошибка 500
        <button onClick={() => navigate(-1)}>Вернуться назад</button>
      </div>
    </>
  );
};
export default Eror500;
