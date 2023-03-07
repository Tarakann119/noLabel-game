import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios, { AxiosResponse } from 'axios';

import { toast } from 'react-toastify';
import InputWrapper from '../../components/InputWrapper';
import { Button } from '../../components/Button';
import { UserInfo } from '../../../typings/app.typings';
import { useState } from 'react';
import { useLoading } from '../../components/LoaderComponent';
import Loader from '../../ui/Loader';
import { useAppDispatch } from '../../../utils/hooks/reduxHooks';
import { setUser } from '../../components/Autification/slice';

type LoginType = {
  login: string;
  password: string;
};

const SigninSchema = Yup.object().shape({
  login: Yup.string()
    .min(2, 'Слишком короткий!')
    .max(10, 'Слишком длинный!')
    .matches(/^[a-z0-9_-]{2,19}$/, 'Поле зполнено некорректно')
    .required('Required'),
  password: Yup.string()
    .min(2, 'Слишком короткий!')
    .max(10, 'Слишком длинный!')
    .matches(/(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,40}/g, 'Поле заполнено некорректно')
    .required('Required'),
});

const LoginPage = () => {
  const navigate = useNavigate();
  const [fieldError, setFieldError] = useState(null);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, setLoading } = useLoading();
  const dispatch = useAppDispatch();
  const handleSubmit = async (values: LoginType) => {
    const data = JSON.stringify(values);
    axios('https://ya-praktikum.tech/api/v2/auth/signin', {
      method: 'post',
      data: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      withCredentials: true,
    })
      .then(() => {
        toast.success('Успешно!');
        navigate('/profile');
      })
      .then(() =>
        axios(`https://ya-praktikum.tech/api/v2/auth/user`, {
          method: 'get',
          data: data,
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        })
      )
      .then((response) => {
        console.log(response);
        const user = (response as AxiosResponse).data as UserInfo;
        localStorage.setItem('userId', user.id);
        console.log(22, user);
        dispatch(
          setUser({
            email: user.email,
            id: user.id,
            login: user.login,
            first_name: user.first_name,
            second_name: user.second_name,
            display_name: user.display_name,
            avatar: user.avatar,
            phone: user.phone,
          })
        );
      })
      .catch((error) => {
        toast.error('Что-то не так...');
        setFieldError(error.response.data.reason);
      });
  };

  return (
    <div className='container-content container-content_main'>
      {loading && <Loader />}
      <Formik
        initialValues={{
          login: '',
          password: '',
        }}
        validationSchema={SigninSchema}
        onSubmit={(values) => {
          console.log(JSON.stringify(values));
          handleSubmit(values);
        }}>
        {({ errors, touched }) => (
          <Form className='container__login-form colum-5'>
            <InputWrapper error={errors.login} label='Логин'>
              <Field name='login' type='text' className='input__field' />
              {errors.login && touched.login ? (
                <div className='input__error-message'>{errors.login}</div>
              ) : null}
            </InputWrapper>
            <InputWrapper error={errors.password} label='Пароль'>
              <Field name='password' type='password' className='input__field' />
              {errors.password && touched.password ? (
                <div className='input__error-message'>{errors.password}</div>
              ) : null}
            </InputWrapper>
            <div className='input__error-message'>{fieldError}</div>
            <Button text='Войти' type='submit' />
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default LoginPage;
