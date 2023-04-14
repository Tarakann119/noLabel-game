import { useNavigate } from 'react-router-dom';
import { changeUserPassword } from '@components/Autification/slice';
import { Button } from '@components/Button';
import { InputValidate } from '@components/InputValidate';
import { Link } from '@components/Link';
import { Title } from '@components/Title';
import { useAppDispatch } from '@utils/hooks/reduxHooks';
import { Field, FieldProps, Form, Formik } from 'formik';
import * as Yup from 'yup';

const PasswordSchema = Yup.object().shape({
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

export const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <main className='main main-h main-bg form-page bg-image_form container'>
      <div className='form-page__wrapper main-h'>
        <div className='form-page__content'>
          <Title level='1' className='form-page__title'>
            Сменить пароль
          </Title>

          <Formik
            initialValues={{
              oldPassword: '',
              newPassword: '',
              confirmPassword: '',
            }}
            validationSchema={PasswordSchema}
            onSubmit={(values) => {
              dispatch(changeUserPassword({ navigate: navigate, values: values }));
            }}>
            {() => (
              <Form className='form form-page__form'>
                <Field name='oldPassword'>
                  {({ field, meta }: FieldProps) => (
                    <InputValidate
                      label='Старый пароль'
                      type='password'
                      field={field}
                      meta={meta}
                    />
                  )}
                </Field>
                <Field name='newPassword'>
                  {({ field, meta }: FieldProps) => (
                    <InputValidate label='Новый пароль' type='password' field={field} meta={meta} />
                  )}
                </Field>
                <Field name='confirmPassword'>
                  {({ field, meta }: FieldProps) => (
                    <InputValidate
                      label='Подтвердите новый пароль'
                      type='password'
                      field={field}
                      meta={meta}
                    />
                  )}
                </Field>
                <Button view='primary' type='submit' className='form-page__button'>
                  Сменить пароль
                </Button>{' '}
              </Form>
            )}
          </Formik>

          <div className='form-page__links'>
            <Link className='form-page__link' to='/profile'>
              Вернуться к профилю
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
