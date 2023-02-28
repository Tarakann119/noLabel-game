import {useNavigate} from 'react-router-dom'

const MainMenu = () =>{
    const navigate = useNavigate()
    return (
        <>
        <button>Новая игра</button>
        <button onClick={()=>navigate('/rating')}>Рейтинг игроков</button>
        <button onClick={()=>navigate('/profile')}>Профиль</button>
        <button>Форум</button>
        <button>Выйти</button>
        </>
    )
}
export default MainMenu