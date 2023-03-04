import { useNavigate } from 'react-router-dom';
import { Field, Form, Formik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import InputWrapper from '../../components/InputWrapper';

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
    })
      .then(() => {
        toast.success('Успешно!');
        navigate('/profile');
      })
      .then(() => fetch(`https://ya-praktikum.tech/api/v2/auth/user`))
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
    <div>
      <div>
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
            <Form>
              <InputWrapper error={errors.login} label='Логин'>
                <Field name='login' type='text' className='input' />
                {errors.login && touched.login ? (
                  <div className='input__error-message'>{errors.login}</div>
                ) : null}
              </InputWrapper>
              <InputWrapper error={errors.login} label='Пароль'>
                <Field name='password' type='password' className='input' />
                {errors.password && touched.password ? (
                  <>
                    <div className='input__error-message'>{errors.password}</div>
                  </>
                ) : null}
              </InputWrapper>

              <button type='submit' className='button'>
                Войти
              </button>
              {/*<Link to={'/register'}>Зарегистрироваться</Link>*/}
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default LoginPage;
