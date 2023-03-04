import { useNavigate } from 'react-router-dom';

const StartScreen = () => {
  const navigate = useNavigate();
  console.log(location);
  return (
    <div>
      <div>ТУТ ОПИСАНИЕ ИГРЫ</div>
      <button onClick={() => navigate('/login')}>ИГРАТЬ</button>
    </div>
  );
};
export default StartScreen;
