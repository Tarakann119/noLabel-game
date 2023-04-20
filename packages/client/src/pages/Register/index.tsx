import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { TSignupRequest } from '@typings/app.typings';
import { Field, FieldProps, Form, Formik } from 'formik';

import { Button } from '@/components/Button';
import { InputValidate } from '@/components/InputValidate';
import { Link } from '@/components/Link';
import { Loader } from '@/components/Loader';
import { Title } from '@/components/Title';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { useLoading } from '@/hooks/useLoading';
import { currentUser } from '@/store/selectors';
import { handleSubmitRegistration } from '@/store/slices/Autification';
import { showError, showSuccess } from '@/utils/toastifyNotifications';
import { SignupSchema } from '@/validationSchemas';

export const Register = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const user = useSelector(currentUser);
  const { loading, showLoading, hideLoading } = useLoading();
  const initialValues: TSignupRequest = {
    first_name: '',
    second_name: '',
    login: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
  };
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleLogin = async (cb: any) => {
    showLoading();

    try {
      await dispatch(cb);
      showSuccess('Вы успешно зарегистрированы.');
    } catch (error) {
      showError(error as string);
    } finally {
      hideLoading();
    }
  };
  const formFields: {
    name: string;
    label: string;
    type: 'text' | 'password' | 'email' | 'tel' | 'search';
  }[] = [
    {
      name: 'first_name',
      label: 'Имя',
      type: 'text',
    },
    {
      name: 'second_name',
      label: 'Фамилия',
      type: 'text',
    },
    {
      name: 'login',
      label: 'Логин',
      type: 'text',
    },
    {
      name: 'email',
      label: 'Email',
      type: 'email',
    },
    {
      name: 'phone',
      label: 'Номер телефона',
      type: 'tel',
    },
    {
      name: 'password',
      label: 'Пароль',
      type: 'password',
    },
    {
      name: 'confirmPassword',
      label: 'Подтвердите пароль',
      type: 'password',
    },
  ];

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
            Регистрация
          </Title>

          <Formik
            initialValues={initialValues}
            validationSchema={SignupSchema}
            onSubmit={(values: TSignupRequest) =>
              handleLogin(handleSubmitRegistration({ values }))
            }>
            {() => (
              <Form className='form form-page__form'>
                {loading && <Loader />}

                {formFields.map(({ name, type, label }) => (
                  <Field key={name} name={name}>
                    {({ field, meta }: FieldProps) => (
                      <InputValidate label={label} type={type} field={field} meta={meta} />
                    )}
                  </Field>
                ))}

                <Button view='primary' type='submit' className='form-page__button'>
                  Регистрация
                </Button>

                <div className='form-page__links'>
                  <Link className='form-page__link' to='/login'>
                    Уже зарегистрированы? Войти.
                  </Link>
                </div>
              </Form>
            )}
          </Formik>
        </div>
      </div>
    </main>
  );
};
