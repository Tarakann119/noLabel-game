import { Link, useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import './index.scss';
import { Button } from '../../components/Button';
import { Title } from '../../components/Title';
import { useState } from 'react';
import Loader from '../../ui/Loader';
import { useLoading } from '../../components/LoaderComponent';
import classNames from 'classnames';
import InputWrapper from '../../components/InputWrapper';

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

const RegisterPage = () => {
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
    <div className={classNames('container-content', 'bg-image_login', 'container-content_main')}>
      {loading && <Loader />}
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
          <Form className={classNames('colum-6', 'container__reg-form')}>
            <Title text='Регистрация' />
            <InputWrapper error={errors.first_name} label='Ваше имя'>
              <Field name='first_name' type='text' className='input__field' />
              {errors.first_name && touched.first_name ? <div>{errors.first_name}</div> : null}
            </InputWrapper>
            <InputWrapper error={errors.second_name} label='Ваша фамилия'>
              <Field name='second_name' type='text' className='input__field' />
              {errors.second_name && touched.second_name ? <div>{errors.second_name}</div> : null}
            </InputWrapper>
            <InputWrapper error={errors.login} label='Ваш логин'>
              <Field name='login' type='text' className='input__field' />
              {errors.login && touched.login ? <div>{errors.login}</div> : null}
            </InputWrapper>
            <InputWrapper error={errors.email} label='Ваша почта'>
              <Field name='email' type='email' className='input__field' />
              {errors.email && touched.email ? <div>{errors.email}</div> : null}
            </InputWrapper>
            <InputWrapper error={errors.phone} label='Номер телефона'>
              <Field name='phone' type='text' className='input__field' />
              {errors.phone && touched.phone ? <div>{errors.phone}</div> : null}
            </InputWrapper>
            <InputWrapper error={errors.password} label='Пароль'>
              <Field name='password' type='password' className='input__field' />
              {errors.password && touched.password ? <div>{errors.password}</div> : null}
            </InputWrapper>
            <InputWrapper error={errors.confirmPassword} label='Повторите пароль'>
              <Field name='confirmPassword' type='password' className='input__field' />
              {errors.confirmPassword && touched.confirmPassword ? (
                <div>{errors.confirmPassword}</div>
              ) : null}
            </InputWrapper>
            <div>{fieldError}</div>
            <Button text='Регистрация' type='submit' className='custom-button' />
            <Link className='plane-link' to={'/login'}>
              Уже зарегистрированы? Войти!
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default RegisterPage;
