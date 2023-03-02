import { Link } from 'react-router-dom'
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from "react-toastify";
import {useNavigate} from 'react-router-dom'
import { useEffect } from 'react';


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
        <div>
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
                            <Field name="login" type='text' />
                            {errors.login && touched.login ? (
                                <div>{errors.login}</div>
                            ) : null}
                            <Field 
                            type= "password"
                            name= "password" />
                            {errors.password && touched.password ? (
                                <div>{errors.password}</div>
                            ) : null}
                            <button type="submit">Войти</button>
                            <Link to={'/register'}>Зарегистрироваться</Link>
                        </Form>
                    )}
                </Formik>
            </div>
        </div>
    )
}
export default LoginPage