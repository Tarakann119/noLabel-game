import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { handleSubmitRegistration } from '@/components/Autification/slice';
import { Button } from '@/components/Button';
import { InputValidate } from '@/components/InputValidate';
import { Title } from '@/components/Title';
import { useAppDispatch } from '@/utils/hooks/reduxHooks';
import randomClickSound from '@/utils/randomClickSound/randomClickSound';

import './index.scss';

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
    .matches(/^[a-z0-9_-]{2,19}$/, 'Поле заполнено некорректно')
    .required('Поле не может быть пустым'),
  email: Yup.string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, 'Поле заполнено некорректно')
    .required('Поле не может быть пустым'),
  phone: Yup.string()
    .matches(/^[\d\\+][\d\\(\\)\\ -]{9,14}\d$/, 'Поле зполнено некорректно')
    .required('Поле не может быть пустым'),
  password: Yup.string()
    .min(2, 'Слишком короткий!')
    .max(10, 'Слишком длинный!')
    .matches(/(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,40}/g, 'Поле заполнено некорректно')
    .required('Поле не может быть пустым'),
  confirmPassword: Yup.string()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    .oneOf([Yup.ref('password'), null], 'Пароли не совпадают!'),
});

export const Register = () => {
  const navigate = useNavigate();
  const [fieldError, setFieldError] = useState(null);
  const dispatch = useAppDispatch();

  return (
    <div className={classNames('container-content', 'bg-image_login', 'container-content_main')}>
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
          dispatch(
            handleSubmitRegistration({
              navigate: navigate,
              values: values,
              setFieldError: setFieldError,
            })
          );
        }}>
        {({ errors, values, handleChange }) => (
          <Form className={classNames('colum-6', 'container__reg-form')}>
            <Title text='Регистрация' />
            <InputValidate
              handleChange={handleChange}
              name='first_name'
              type='text'
              label='Имя'
              value={values.first_name}
              error={errors.first_name}
            />
            <InputValidate
              handleChange={handleChange}
              name='second_name'
              type='text'
              label='Фамилия'
              value={values.second_name}
              error={errors.second_name}
            />
            <InputValidate
              handleChange={handleChange}
              name='login'
              type='text'
              label='Логин'
              value={values.login}
              error={errors.login}
            />
            <InputValidate
              handleChange={handleChange}
              name='email'
              type='text'
              label='Ваша почта'
              value={values.email}
              error={errors.email}
            />
            <InputValidate
              handleChange={handleChange}
              name='phone'
              type='text'
              label='Номер телефона'
              value={values.phone}
              error={errors.phone}
            />
            <InputValidate
              handleChange={handleChange}
              name='password'
              type='password'
              label='Пароль'
              value={values.password}
              error={errors.password}
            />
            <InputValidate
              handleChange={handleChange}
              name='confirmPassword'
              type='password'
              label='Повторите пароль'
              value={values.confirmPassword}
              error={errors.confirmPassword}
            />
            <div>{fieldError}</div>
            <Button
              text='Регистрация'
              type='submit'
              className='custom-button'
              onClick={randomClickSound}
            />
            <Link className='plane-link' to={'/login'}>
              Уже зарегистрированы? Войти!
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};
