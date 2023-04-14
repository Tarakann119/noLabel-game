import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSubmitLogin } from '@components/Autification/slice';
import { Button } from '@components/Button';
import { InputValidate } from '@components/InputValidate';
import { Link } from '@components/Link';
import { useLoading } from '@components/LoaderComponent';
import { useAppDispatch } from '@utils/hooks/reduxHooks';
import { Field, FieldProps, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { Title } from '@/components/Title';

import './index.scss';

const SigninSchema = Yup.object().shape({
  login: Yup.string()
    .matches(
      /^[\w_-]*$/,
      'Допустимы: латиница, цифры, дефис и нижнее подчёркивание. Не используйте пробелы и другие спецсимволы.'
    )
    .min(2, 'Минимум 2 символа.')
    .max(20, 'Максмум 20 символов.')
    .required('Введите ваш логин.'),
  password: Yup.string()
    .matches(/^[\w\-!@#$%^&*]*$/, 'Допустимы: латиница, цифры, спецсимволы.')
    .min(8, 'Минимум 8 символов.')
    .max(20, 'Максимум 20 символов')
    .matches(/[0-9]/, 'Должен содержать хотя бы одну цифру.')
    .matches(/[A-Z]/, 'Должен содержать хотя бы одну заглавную букву.')
    .required('Введите ваш пароль.'),
});

export const Login = () => {
  const navigate = useNavigate();
  const [fieldError, setFieldError] = useState(null);
  const { loading } = useLoading();
  const dispatch = useAppDispatch();

  return (
    <main className='main main-h main-bg form-page bg-image_form container'>
      <div className='form-page__wrapper main-h'>
        <div className='form-page__content'>
          <Title level='1' className='form-page__title'>
            Вход
          </Title>

          <Formik
            initialValues={{
              login: '',
              password: '',
            }}
            validationSchema={SigninSchema}
            onSubmit={(values) => {
              dispatch(handleSubmitLogin({ navigate, values, setFieldError }));
            }}>
            {() => (
              <Form className='form form-page__form'>
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

                {fieldError && <div className='form-page__error'>{fieldError}</div>}

                <Button view='primary' type='submit' className='form-page__button'>
                  {loading} Войти
                </Button>
              </Form>
            )}
          </Formik>

          <div className='form-page__links'>
            <Link className='form-page__link' to='/recover-password'>
              Забыли пароль?
            </Link>

            <Link className='form-page__link' to='/registration'>
              Нет аккаунта?
            </Link>
          </div>

          <div className='form-page-methodts'>
            <div className='form-page-methodts__title'>Или войдите с помощью</div>

            <div className='form-page-methodts__buttons'>
              <Button className='form-page-methodts__button' view='icon' icon='yandex' />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
};
