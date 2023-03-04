import { useNavigate } from 'react-router';

const Forum = () => {
  const navigate = useNavigate();
  return (
    <>
      <h2>Форум</h2>
      Список тем:
      <div onClick={() => navigate(`./id`)}>Тема 1</div>
    </>
  );
};
export default Forum;
