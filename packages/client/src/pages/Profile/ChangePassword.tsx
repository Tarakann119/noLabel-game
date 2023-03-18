import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Title } from '../../components/Title';
import { Button } from '../../components/Button';
import { changeUserPassword } from '../../components/Autification/slice';
import { useAppDispatch } from '../../../utils/hooks/reduxHooks';
import InputValidate from '../../components/InputValidate';

const PasswordSchema = Yup.object().shape({
  newPassword: Yup.string()
    .min(2, 'Too Short!')
    .max(10, 'Too Long!')
    .matches(/(?=.*[0-9])(?=.*[A-Z])[0-9a-zA-Z!@#$%^&*]{8,40}/g, 'Поле зполнено некорректно')
    .required('Required'),
  oldPassword: Yup.string().min(2, 'Too Short!').max(10, 'Too Long!').required('Required'),
  confirmPassword: Yup.string()
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    //@ts-ignore
    .oneOf([Yup.ref('newPassword'), null], 'Пароли не совпадают!')
    .required('Required'),
});

const ChangePassword = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <div className={classNames('container-content', 'bg-image_login', 'container-content_main')}>
      <div className='container_center colum-6'>
        <Title text='Смена пароля' />
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
          {({ errors, values, handleChange }) => (
            <Form className='change-profile__form-container'>
              <div className='change-profile__item-container'>
                <InputValidate
                  handleChange={handleChange}
                  name='oldPassword'
                  type='password'
                  label='Старый пароль'
                  value={values.oldPassword}
                  error={errors.oldPassword}
                />
                <InputValidate
                  handleChange={handleChange}
                  name='newPassword'
                  type='password'
                  label='Новый пароль'
                  value={values.newPassword}
                  error={errors.newPassword}
                />
                <InputValidate
                  handleChange={handleChange}
                  name='confirmPassword'
                  type='password'
                  label='Повторите пароль'
                  value={values.confirmPassword}
                  error={errors.confirmPassword}
                />
              </div>
              <Button text='Сменить пароль' type='submit' className='custom-button' />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
export default ChangePassword;
