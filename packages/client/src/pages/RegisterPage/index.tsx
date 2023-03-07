import { Link } from 'react-router-dom';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import './index.scss';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import { useState } from 'react';
import Loader from '../../ui/Loader';
import { useLoading } from '../../components/LoaderComponent';

type ProfileType = {
  first_name: string;
  second_name: string;
  login: string;
  password: string;
  confirmPassword: string;
};

const SignupSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'Слишком короткое имя!')
    .max(10, 'Тебя правда так зовут?!')
    .matches(/^[a-zA-Zа-яА-Я][a-zA-Za-яА-Я-\\.]{1,20}$/g)
    .required('Поле не может быть пустым'),
  second_name: Yup.string()
    .min(2, 'Слишком короткое имя!')
    .max(10, 'Тебя правда так зовут?!')
    .matches(/^[a-zA-Zа-яА-Я][a-zA-Za-яА-Я-\\.]{1,20}$/g)
    .required('Поле не может быть пустым'),
  login: Yup.string()
    .min(2, 'Слишком короткий!')
    .max(10, 'Слишком длинный!')
    .matches(/^[a-z0-9_-]{2,19}$/, 'Поле зполнено некорректно')
    .required('Поле не может быть пустым'),
  email: Yup.string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, 'Поле зполнено некорректно')
    .required('Поле не может быть пустым'),
  phone: Yup.string()
    .matches(/^[\d\\+][\d\\(\\)\\ -]{9,14}\d$/, 'Поле зполнено некорректно')
    .required('Поле не может быть пустым'),
  password: Yup.string()
    .min(2, 'Слишком короткий!')
    .max(10, 'Слишком длинный!')
    .matches(/(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,40}/g, 'Поле зполнено некорректно')
    .required('Поле не может быть пустым'),
  confirmPassword: Yup.string()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    .oneOf([Yup.ref('password'), null], 'Пароли не совпадают!'),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [fieldError, setFieldError] = useState(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, setLoading } = useLoading();
  const handleSubmit = async (values: ProfileType) => {
    const data = JSON.stringify(values);
    axios('https://ya-praktikum.tech/api/v2/auth/signup', {
      method: 'post',
      data: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        toast.success('Пользователь создан!');
        navigate('/login');
      })
      .catch((error) => {
        toast.error('Что-то не так...');
        setFieldError(error.response.data.reason);
      });
  };
  return (
    <div className='main-page-wrapper'>
      {loading && <Loader />}
      <div
        className='main-wrapper'
        style={{
          backgroundImage: `url(https://mobimg.b-cdn.net/v3/fetch/1d/1da7e32dc534959fa6a4f5aedc7e5729.jpeg)`,
        }}>
        <div className='form-login'>
          <div>
            <div>
              <Formik
                initialValues={{
                  first_name: '',
                  second_name: '',
                  login: '',
                  email: '',
                  phone: '',
                  password: '',
                  confirmPassword: '',
                }}
                validationSchema={SignupSchema}
                onSubmit={(values) => {
                  handleSubmit(values);
                }}>
                {({ errors, touched }) => (
                  <Form>
                    <Title className='form-login-title' text='Регистрация' />
                    <Field
                      name='first_name'
                      type='text'
                      className='input__control'
                      placeholder='Ваше имя'
                    />
                    {errors.first_name && touched.first_name ? (
                      <div>{errors.first_name}</div>
                    ) : null}
                    <Field
                      name='second_name'
                      type='text'
                      className='input__control'
                      placeholder='Ваша фамилия'
                    />
                    {errors.second_name && touched.second_name ? (
                      <div>{errors.second_name}</div>
                    ) : null}
                    <Field
                      name='login'
                      type='text'
                      className='input__control'
                      placeholder='Ваш логин'
                    />
                    {errors.login && touched.login ? <div>{errors.login}</div> : null}
                    <Field
                      name='email'
                      type='email'
                      className='input__control'
                      placeholder='Ваша почта'
                    />
                    {errors.email && touched.email ? <div>{errors.email}</div> : null}
                    <Field
                      name='phone'
                      type='text'
                      className='input__control'
                      placeholder='+7000-00-00'
                    />
                    {errors.phone && touched.phone ? <div>{errors.phone}</div> : null}
                    <Field
                      name='password'
                      type='password'
                      className='input__control'
                      placeholder='*****'
                    />
                    {errors.password && touched.password ? <div>{errors.password}</div> : null}
                    <Field
                      name='confirmPassword'
                      type='password'
                      className='input__control'
                      placeholder='*****'
                    />
                    {errors.confirmPassword && touched.confirmPassword ? (
                      <div>{errors.confirmPassword}</div>
                    ) : null}
                    <div>{fieldError}</div>
                    <Button
                      text='Зарегистрироваться'
                      type='submit'
                      className='button button_view_primary'
                    />
                    <Link className='plane-link' to={'/login'}>
                      Уже зарегистрированы? Войти!
                    </Link>
                  </Form>
                )}
              </Formik>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
