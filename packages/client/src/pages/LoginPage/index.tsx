import { Link, useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import InputWrapper from '../../components/InputWrapper';
import './index.scss';

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
      // TODO: Нужно типизировать ответ
      .then((response: any) => {
        console.log(response);
        const user = response;
        localStorage.setItem('userId', user.id);
        localStorage.setItem('user', user);
      })
      .catch(() => toast.error('Что-то не так...'));
  };

  return (
    <div className='container-content container-content_main'>
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
                <>
                  <div className='input__error-message'>{errors.password}</div>
                </>
              ) : null}
            </InputWrapper>

            <button type='submit' className='custom-button'>
              Войти
            </button>
            <Link to={'/register'}>Нет аккаунта?</Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default LoginPage;
