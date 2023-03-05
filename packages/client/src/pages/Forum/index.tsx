import { useNavigate } from "react-router"
import { Title } from '../../components/Title';
import { Link } from 'react-router-dom';
import '../../components/Button/index.css'
import '../../components/Header/index.css'
import '../../components/Input/index.css'
import '../StartScreen/index.css'
import './index.css'
import { Button } from '../../components/Button'

const Forum = () => {
    const navigate = useNavigate()
    return (
        <>
          <div className="main-page-wrapper">
            <div className="main-wrapper"
                 style={{
                   backgroundImage: `url(https://mobimg.b-cdn.net/v3/fetch/1d/1da7e32dc534959fa6a4f5aedc7e5729.jpeg)`,
                 }}>
              <div className="form-login">
                <Title className="form-login-title" text="Форум" />
                <Link className="navigation-link profile-navigation-link" to={'/theme1'}>Тема 1</Link>
              </div>
            </div>
          </div>

        </>
    )
}
export default Forum
