import '../../components/Button/index.css'
import '../../components/Header/index.css'
import '../../components/Input/index.css'
import '../StartScreen/index.css'
import './index.css'
import { Button } from '../../components/Button'
import { Title } from '../../components/Title'
import { Link } from 'react-router-dom';
const RatingPage = () =>{
    return(
      <div className="main-page-wrapper">
        <div className="main-wrapper"
             style={{
                 backgroundImage: `url(https://mobimg.b-cdn.net/v3/fetch/1d/1da7e32dc534959fa6a4f5aedc7e5729.jpeg)`,
             }}>
            <div className="form-login">
              <Title className="form-login-title" text="Рейтинг игроков" />
              <div className="profile-image-name">
                <Link className="navigation-link profile-navigation-link" to={'/profile'}><div className="profile-link-page"></div></Link>
                <div  className="navigation-link-invert">Джон Доу</div>
                <div  className="navigation-link raiting-money">278</div>
              </div>
</div>
        </div>
      </div>
    )
}
export default RatingPage
