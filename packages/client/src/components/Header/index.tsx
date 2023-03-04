import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom"


const Header = () => {
    const location = useLocation();
    return (


      <header className="header-component">
        <div className="logo"></div>
        <nav className="navigation-wrapper">
          <div className="navigation-list">
                <Link className="navigation-link" to={'/'}>Главная</Link>
                <Link className="navigation-link" to={'/game'}>Игра</Link>
                <Link className="navigation-link" to={'/rating'}>Рейтинг</Link>
                <Link className="navigation-link" to={'/forum'}>Форум</Link>
                <Link className="navigation-link" to={'/aboutUs'}>О нас</Link>

            </div>
         </nav>
            <div className="navigation-side">
              <div>
                <Link className="navigation-link-profile" to={'/profile'}><div className="profile-link"></div></Link>
              </div>
              <div>
                <Link className="navigation-link" to={'/logout'}><div className="exit-link"></div></Link>
              </div>
                {location.pathname==='/'&&
                <Fragment>

                </Fragment>
                }
            </div>
      </header>
    )
}
export default Header
