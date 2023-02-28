import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom"


const Header = () => {
    const location = useLocation();
    return (
        <div className="header">
            <div>
                <Link to={'/'}>Главная</Link>
                <Link to={'/game'}>Игра</Link>
                <Link to={'/rating'}>Рейтинг</Link>
                <Link to={'/forum'}>Форум</Link>
                <Link to={'/aboutUs'}>О нас</Link>
                
            </div>
            <div>
                {location.pathname==='/'&&
                <Fragment>
                    <Link to={'/login'}>Вход</Link>
                    <Link to={'/registration'}>Регистрация</Link>
                </Fragment>
                }
            </div>
        </div>
    )
}
export default Header