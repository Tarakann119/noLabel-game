import { useNavigate } from 'react-router-dom';

const StartScreen = () => {
  const navigate = useNavigate();
  console.log(location);
  return (
    <div className='container-content container-content_main'>
      <div>ТУТ ОПИСАНИЕ ИГРЫ</div>
      <button onClick={() => navigate('/login')} className='custom-button'>
        ИГРАТЬ
      </button>
    </div>
  );
};
export default StartScreen;
