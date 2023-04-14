import { Link } from '@components/Link';

export const HeaderNav = () => (
  <nav className='header__nav'>
    <ol className='header__nav-menu'>
      {/* <li className='header__item'>
        <Link className='button header__link' to={'/'}>
          Об игре
        </Link>
      </li> */}
      <li className='header__item'>
        <Link className='button header__link' to={'/game'}>
          Игра
        </Link>
      </li>
      <li className='header__item'>
        <Link className='button header__link' to={'/rating'}>
          Рейтинг
        </Link>
      </li>
      <li className='header__item'>
        <Link className='button header__link' to={'/forum'}>
          Форум
        </Link>
      </li>
      <li className='header__item'>
        <Link className='button header__link' to={'/about'}>
          О нас
        </Link>
      </li>
    </ol>
  </nav>
);
