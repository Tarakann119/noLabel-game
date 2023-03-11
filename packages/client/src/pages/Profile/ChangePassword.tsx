import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Title } from '../../components/Title';
import InputWrapper from '../../components/InputWrapper';
import { Button } from '../../components/Button';
type ChangePasswordType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};
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
  const handleSubmit = async (values: ChangePasswordType) => {
    const data = JSON.stringify(values);
    fetch('https://ya-praktikum.tech/api/v2/user/password', {
      method: 'post',
      body: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        toast.success('Пароль изменен!');
        navigate('/profile');
      })
      .catch(() => {
        toast.error('Что-то не так...');
      });
  };
  return (
    <div className={classNames('container-content', 'bg-image_login', 'container-content_main')}>
     <Title text='Смена пароля' />
      <Formik
        initialValues={{
          oldPassword: '',
          newPassword: '',
          confirmPassword: '',
        }}
        validationSchema={PasswordSchema}
        onSubmit={(values) => {
          console.log(values);
          handleSubmit(values);
        }}>
        {({ errors, touched }) => (
          <Form>
            <InputWrapper error={errors.oldPassword} label='Старый пароль'>
            <Field name='oldPassword'  className='input__field'/>
            {errors.oldPassword && touched.oldPassword ? <div>{errors.oldPassword}</div> : null}
            </InputWrapper>
            <InputWrapper error={errors.newPassword} label='Новый пароль'>
            <Field name='newPassword'  className='input__field'/>
            {errors.newPassword && touched.newPassword ? <div>{errors.newPassword}</div> : null}
            </InputWrapper>
            <InputWrapper error={errors.confirmPassword} label='Повторите пароль'>
            <Field name='confirmPassword'  className='input__field'/>
            {errors.confirmPassword && touched.confirmPassword ? (
              <div>{errors.confirmPassword}</div>
            ) : null}
            </InputWrapper>
            <Button text='Сменить пароль' type='submit' className='custom-button' />
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default ChangePassword;
