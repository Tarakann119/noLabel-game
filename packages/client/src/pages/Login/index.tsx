import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TLogin } from '@typings/app.typings';
import { Field, FieldProps, Form, Formik } from 'formik';

import { Button } from '@/components/Button';
import { InputValidate } from '@/components/InputValidate';
import { Link } from '@/components/Link';
import { Loader } from '@/components/Loader';
import { Title } from '@/components/Title';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { useLoading } from '@/hooks/useLoading';
import { currentUser } from '@/store/selectors';
import { handleSubmitLogin, loginWithToken } from '@/store/slices/Autification';
import { showError, showSuccess } from '@/utils/toastifyNotifications';
import { SigninSchema } from '@/validationSchemas';

import './index.scss';

export const Login = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const user = useSelector(currentUser);
  const { loading, showLoading, hideLoading } = useLoading();
  const initialValues: TLogin = {
    login: '',
    password: '',
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogin = async (cb: any) => {
    showLoading();

    try {
      await dispatch(cb);
      showSuccess('Вы успешно авторизованы.');
    } catch (error) {
      showError(error as string);
    } finally {
      hideLoading();
    }
  };

  useEffect(() => {
    if (user.id) {
      const path = window.localStorage.getItem('destinationPath') ?? '/';
      navigate(`${path}`);
    }
  }, [user]);

  return (
    <main className='main main-h main-bg form-page bg-image_form container'>
      <div className='form-page__wrapper main-h'>
        <div className='form-page__content'>
          <Title level='1' className='form-page__title'>
            Вход
          </Title>

          <Formik
            initialValues={initialValues}
            validationSchema={SigninSchema}
            onSubmit={(values) => handleLogin(handleSubmitLogin({ values }))}>
            {() => (
              <Form className='form form-page__form'>
                {loading && <Loader />}

                <Field name='login'>
                  {({ field, meta }: FieldProps) => (
                    <InputValidate label='Логин' type='text' field={field} meta={meta} />
                  )}
                </Field>

                <Field name='password'>
                  {({ field, meta }: FieldProps) => (
                    <InputValidate label='Пароль' type='password' field={field} meta={meta} />
                  )}
                </Field>

                <Button view='primary' type='submit' className='form-page__button'>
                  {loading} Войти
                </Button>

                <div className='form-page__links'>
                  <Link className='form-page__link' to='/recover-password'>
                    Забыли пароль?
                  </Link>

                  <Link className='form-page__link' to='/registration'>
                    Нет аккаунта?
                  </Link>
                </div>
              </Form>
            )}
          </Formik>

          <div className='form-page-methodts'>
            <div className='form-page-methodts__title'>Или войдите с помощью</div>

            <div className='form-page-methodts__buttons'>
              <Button
                className='form-page-methodts__button'
                view='icon'
                icon='yandex'
                onClick={() => handleLogin(loginWithToken())}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
