import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';
import '../../components/Button/index.scss';
import '../../components/Header/index.scss';
import '../StartScreen/index.scss';
import './index.scss';
import classNames from 'classnames';
import { Title } from '../../components/Title';

const mockData = [
  {
    id: 1,
    title: 'как играть',
  },
  {
    id: 2,
    title: 'как перестать проигрывать',
  },
  {
    id: 3,
    title: 'как бросить играть',
  },
  {
    id: 4,
    title: 'как найти девушку',
  },
];
const Forum = () => {
  // TODO: Удалить неиспользуемую переменную
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const navigate = useNavigate();
  return (
    <div className={classNames('container-content', 'container-content_main', 'bg-image_login')}>
      <div className='forum__container'>
        <Title text='Актуальные темы' />
        {mockData.map((data) => (
          <Link className='plane-link' to={`./${data.id}`}>
            {data.title}
          </Link>
        ))}
        {/* <Title className='form-login-title' text='Форум' />
            <Link className='navigation-link profile-navigation-link' to={'/theme1'}>
              Тема 1
            </Link> */}
      </div>
    </div>
  );
};
export default Forum;
