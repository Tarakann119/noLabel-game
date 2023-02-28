import {useNavigate} from 'react-router-dom'
const Eror404 = () =>{
    const navigate = useNavigate()
    return(
        <>
        <div>
            Ошибка 404
            <button onClick={() => navigate(-1)}>Вернуться назад</button>
        </div>
        </>
    )
}

export default Eror404