import { TChangePassword } from '@typings/app.typings';
import { Field, FieldProps, Form, Formik } from 'formik';

import { Button } from '@/components/Button';
import { InputValidate } from '@/components/InputValidate';
import { Link } from '@/components/Link';
import { Loader } from '@/components/Loader';
import { Title } from '@/components/Title';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { useLoading } from '@/hooks/useLoading';
import { changeUserPassword } from '@/store/slices/Autification';
import { showError, showSuccess } from '@/utils/toastifyNotifications';
import { PasswordSchema } from '@/validationSchemas';

export const ChangePassword = () => {
  const dispatch = useAppDispatch();
  const { loading, showLoading, hideLoading } = useLoading();
  const onSubmit = async (values: TChangePassword) => {
    showLoading();

    const response = await dispatch(changeUserPassword({ values }));

    if (response.meta.requestStatus === 'rejected') {
      showError(response.payload as string);
    } else {
      showSuccess('Пароль изменён.');
    }

    hideLoading();
  };

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
            onSubmit={onSubmit}>
            {() => (
              <Form className='form form-page__form'>
                {loading && <Loader />}
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
                <div className='form-page__links'>
                  <Link className='form-page__link' to='/profile'>
                    Вернуться к профилю
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
