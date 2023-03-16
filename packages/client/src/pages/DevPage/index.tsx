import { Field, Form, Formik } from 'formik';
import classNames from 'classnames';
import HeaderH1 from '../../ui/HeaderH1';
import InputWrapper from '../../components/InputWrapper';
import { Button } from '../../components/Button';
import { Link } from 'react-router-dom';
import ValidateErrorMessage from '../../components/ValidateErrorMessage';

const DevPage = () => {
  return (
    <div className='container-content container-content_main'>
      <Formik
        initialValues={{
          login: '',
          password: '',
        }}
        onSubmit={(values) => {
          console.log(JSON.stringify(values));
        }}>
        {({ errors, touched }) => (
          <Form className={classNames('colum-5', 'container__login-form')}>
            <HeaderH1 label={'ВХОД'} />
            <InputWrapper error={errors.login} label='Логин'>
              <Field name='login' type='text' className='input__field' />
              {errors.login && touched.login ? (
                <div className='input__error-message'>{errors.login}</div>
              ) : null}
            </InputWrapper>
            <InputWrapper error={true} label='Пароль'>
              <Field name='password' type='password' className='input__field' />

              <>
                <ValidateErrorMessage
                  title='Ошибкавававававававввававававаавав'
                  message='Текст ошибкиааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааааававававав'
                  visible={true}
                />
              </>
            </InputWrapper>

            <Button text='Вход' type='submit' className='custom-button' />
            <Link className='plane-link' to={'/registration'}>
              Нет аккаунта?
            </Link>
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default DevPage;
