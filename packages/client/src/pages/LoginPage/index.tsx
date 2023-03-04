import { Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react';
import '../../components/Button/index.css'
import '../../components/Header/index.css'
import '../../components/Input/index.css'
import '../StartScreen/index.css'
import './index.css'
import { Button } from '../../components/Button'
import { Title } from '../../components/Title'

type LoginType ={
    login: string,
    password: string
}

const SigninSchema = Yup.object().shape({
    login: Yup.string()
    .min(2, 'Слишком короткий!')
    .max(10, 'Слишком длинный!')
        .matches(/^[a-z0-9_-]{2,19}$/, 'Поле зполнено некорректно')
        .required('Required'),
    password: Yup.string()
    .min(2, 'Слишком короткий!')
    .max(10, 'Слишком длинный!')
        .matches(/(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,40}/g, 'Поле зполнено некорректно')
        .required('Required'),
});


const LoginPage = () => {
    const navigate = useNavigate()
    const handleSubmit = async(values: LoginType) => {
        const data = JSON.stringify(values)
        axios('https://ya-praktikum.tech/api/v2/auth/signin', {
            method: "post",
            data: data,
            headers: {
                "Accept": "application/json",
                "Content-Type": "application/json"
            }
        }
        )
        .then(()=>{toast.success('Успешно!');navigate('/profile')})
        .then(()=>fetch(`https://ya-praktikum.tech/api/v2/auth/user`))
        .then((response: any) => {
            console.log(response)
          const user = response;
          localStorage.setItem("userId", user.id)
        localStorage.setItem("user", user);
        })
        .catch(()=>toast.error('Что-то не так...'))

    }

    return (
      <div className="main-page-wrapper">
          <div className="main-wrapper"
               style={{
                   backgroundImage: `url(https://mobimg.b-cdn.net/v3/fetch/1d/1da7e32dc534959fa6a4f5aedc7e5729.jpeg)`,
               }}>
        <div className="form-login">
            <div>
                <Formik
                    initialValues={{
                        login: '',
                        password: ''
                    }}
                    validationSchema={SigninSchema}
                    onSubmit={values => {
                        console.log(JSON.stringify(values));
                        handleSubmit(values)
                    }}
                >
                    {({ errors, touched }) => (
                        <Form>
                          <Title className="form-login-title" text="Вход" />
                            <Field name="login" type='text' className="input__control" placeholder="login" />
                            {errors.login && touched.login ? (
                                <div>{errors.login}</div>
                            ) : null}
                            <Field
                            type= "password"
                            placeholder="*****"
                            name= "password"
                            className="input__control" />
                            {errors.password && touched.password ? (
                                <div>{errors.password}</div>
                            ) : null}
                            <Button
                              text="Войти"
                              type={'submit'}
                              onClick={()=>navigate('/login')}
                              className="button button_view_primary"
                            />
                            <div>
                                <Link className="plane-link" to={'/registration'}>Зарегистрироваться</Link>
                            </div>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
          </div>
      </div>
    )
}
export default LoginPage
