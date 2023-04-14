import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { handleSubmitRegistration } from '@components/Autification/slice';
import { Button } from '@components/Button';
import { InputValidate } from '@components/InputValidate';
import { Link } from '@components/Link';
import { Title } from '@components/Title';
import { useAppDispatch } from '@utils/hooks/reduxHooks';
import { Field, FieldProps, Form, Formik } from 'formik';
import * as Yup from 'yup';

const SignupSchema = Yup.object().shape({
  first_name: Yup.string()
    .matches(/^[a-zA-Zа-яА-Я]*$/, 'Допустима только латиница и кириллица.')
    .required('Введите ваше имя.'),
  second_name: Yup.string()
    .matches(/^[a-zA-Zа-яА-Я]*$/, 'Допустима только латиница и кириллица.')
    .required('Введите вашу фамилию'),
  login: Yup.string()
    .matches(
      /^[\w_-]$/,
      'Допустимы: латиница, цифры, дефис и нижнее подчёркивание. Не используйте пробелы и другие спецсимволы.'
    )
    .min(2, 'Минимум 2 символа.')
    .max(20, 'Максмум 20 символов.')
    .required('Введите ваш логин.'),
  email: Yup.string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, 'Введите корректный email.')
    .required('Введите ваш email.'),
  phone: Yup.string()
    .matches(/^[\d\\+][\d\\(\\)\\ -]{9,14}\d$/, 'Введите корректный номер.')
    .required('Введите ваш телефон.'),
  password: Yup.string()
    .matches(/[\w\-!@#$%^&*]/, 'Допустимы: латиница, цифры, спецсимволы.')
    .min(8, 'Минимум 8 символов.')
    .max(20, 'Максимум 20 символов')
    .matches(/[0-9]/, 'Должен содержать хотя бы одну цифру.')
    .matches(/[A-Z]/, 'Должен содержать хотя бы одну заглавную букву.')
    .required('Введите ваш пароль.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли не совпадают.')
    .required('Повторите пароль.'),
});

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [fieldError, setFieldError] = useState(null);

  return (
    <main className='main main-h main-bg form-page bg-image_form container'>
      <div className='form-page__wrapper main-h'>
        <div className='form-page__content'>
          <Title level='1' className='form-page__title'>
            Регистрация
          </Title>

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
              dispatch(handleSubmitRegistration({ navigate, values, setFieldError }));
            }}>
            {() => (
              <Form className='form form-page__form'>
                <Field name='first_name'>
                  {({ field, meta }: FieldProps) => (
                    <InputValidate label='Имя' type='text' field={field} meta={meta} />
                  )}
                </Field>

                <Field name='second_name'>
                  {({ field, meta }: FieldProps) => (
                    <InputValidate label='Фамилия' type='text' field={field} meta={meta} />
                  )}
                </Field>

                <Field name='login'>
                  {({ field, meta }: FieldProps) => (
                    <InputValidate label='Логин' type='text' field={field} meta={meta} />
                  )}
                </Field>

                <Field name='email'>
                  {({ field, meta }: FieldProps) => (
                    <InputValidate label='Email' type='email' field={field} meta={meta} />
                  )}
                </Field>

                <Field name='phone'>
                  {({ field, meta }: FieldProps) => (
                    <InputValidate label='Номер телефона' type='tel' field={field} meta={meta} />
                  )}
                </Field>

                <Field name='password'>
                  {({ field, meta }: FieldProps) => (
                    <InputValidate label='Пароль' type='password' field={field} meta={meta} />
                  )}
                </Field>

                <Field name='confirmPassword'>
                  {({ field, meta }: FieldProps) => (
                    <InputValidate
                      label='Подтвердите пароль'
                      type='password'
                      field={field}
                      meta={meta}
                    />
                  )}
                </Field>

                {fieldError && <div className='form-page__error'>{fieldError}</div>}

                <Button view='primary' type='submit' className='form-page__button'>
                  Регистрация
                </Button>
              </Form>
            )}
          </Formik>

          <div className='form-page__links'>
            <Link className='form-page__link' to='/login'>
              Уже зарегистрированы? Войти.
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
