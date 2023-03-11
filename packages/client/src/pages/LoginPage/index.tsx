import { Link, useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios, { AxiosResponse } from 'axios';
import { toast } from 'react-toastify';
import InputWrapper from '../../components/InputWrapper';
import './index.scss';
import classNames from 'classnames';
import HeaderH1 from '../../ui/HeaderH1';
import { Button } from '../../components/Button';
import ValidateErrorMessage from '../../components/ValidateErrorMessage';
import { useState } from 'react';
import { UserInfo } from '../../../typings/app.typings';
import { useAppDispatch } from '../../../utils/hooks/reduxHooks';
import { useLoading } from '../../components/LoaderComponent';
import { setUser } from '../../components/Autification/slice';
import Loader from '../../ui/Loader';


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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [fieldError, setFieldError] = useState(null);
  const { loading } = useLoading();
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
      responseType: 'json',
    })
      .then((response) => {
        console.log(response);
        if (response.data === 'OK') {
          try {
            toast.success('Вы успешно вошли в систему!');
            fetchUser(data);
            // navigate('/profile');
          } catch (e) {
            console.log(e);
          }
        }
      })
      .then((response) => {
        // TODO: Обрати внимание на это поведение
        console.log('Этот респонс должен быть пустым ' + response);
      })
      .catch((error) => {
        console.log(error);
        if (error.response.data.reason === 'User already in system') {
          fetchUser(data);
          navigate('/profile');
        }
      });
  };

  const fetchUser = (data: string) => {
    axios(`https://ya-praktikum.tech/api/v2/auth/user`, {
      method: 'get',
      data: data,
      headers: {
        Accept: '*/*',
        'Content-Type': 'application/json; charset=utf-8',
      },
      withCredentials: true,
      timeout: 1000,
    })
      .then((response) => {
        toast.success('Данные пользователя загружены!');
        const user = (response as unknown as AxiosResponse).data as UserInfo;
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
        console.log(error);
        toast.error('Что-то не так...');
        setFieldError(error.response.data.reason);
      });
  };

  // Состояния компонентов ValidateErrorMessage для полей ввода
  const [logErr, setLogErr] = useState(false);
  const [passErr, setPassErr] = useState(false);

  return (
    <div className={classNames('container-content', 'container-content_main', 'bg-image_login')}>
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
        {({ errors }) => (
          <Form className={classNames('colum-5', 'container__login-form')}>
            <HeaderH1 label={'ВХОД'} />
            <InputWrapper error={errors.login} label='Логин'>
              <Field
                name='login'
                type='text'
                className='input__field'
                onFocus={() => setLogErr(true)}
                onBlur={() => setLogErr(false)}
              />
              <ValidateErrorMessage
                title='Ошибка валидации'
                message={`${errors.login}`}
                visible={logErr && !!errors.login}
              />
            </InputWrapper>
            <InputWrapper error={errors.password} label='Пароль'>
              <Field
                name='password'
                type='password'
                className='input__field'
                onFocus={() => setPassErr(true)}
                onBlur={() => setPassErr(false)}
              />
              <ValidateErrorMessage
                title='Ошибка валидации'
                message={`${errors.password}`}
                visible={passErr && !!errors.password}
              />
            </InputWrapper>
            <Button text='Вход' type='submit' className='custom-button' />
            <Link className='plane-link' to={'/registration'}>
              Нет аккаунта?
            </Link>
            <div className='input__error-message'>{fieldError}</div>
          </Form>
        )}
      </Formik>
    </div>
  );
};

export default LoginPage;
