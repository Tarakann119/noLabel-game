import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store';
import InputWrapper from '../../components/InputWrapper';
import { Title } from '../../components/Title';
import { Button } from '../../components/Button';
import classNames from 'classnames';
import ValidateErrorMessage from '../../components/ValidateErrorMessage';
import { changeUserProfile } from '../../components/Autification/slice';
import { useAppDispatch } from '../../../utils/hooks/reduxHooks';

const ProfileSchema = Yup.object().shape({
  first_name: Yup.string()
    .min(2, 'Слишком короткое имя!')
    .max(10, 'Тебя правда так зовут?!')
    .matches(/^[a-zA-Zа-яА-Я][a-zA-Za-яА-Я-\\.]{1,20}$/g)
    .required('Поле не может быть пустым'),
  second_name: Yup.string()
    .min(2, 'Слишком короткое имя!')
    .max(10, 'Тебя правда так зовут?!')
    .matches(/^[a-zA-Zа-яА-Я][a-zA-Za-яА-Я-\\.]{1,20}$/g)
    .required('Поле не может быть пустым'),
  login: Yup.string()
    .min(2, 'Слишком короткий!')
    .max(10, 'Слишком длинный!')
    .matches(/^[a-z0-9_-]{2,19}$/, 'Поле зполнено некорректно')
    .required('Поле не может быть пустым'),
  email: Yup.string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, 'Поле зполнено некорректно')
    .required('Поле не может быть пустым'),
  phone: Yup.string()
    .matches(/^[\d\\+][\d\\(\\)\\ -]{9,14}\d$/, 'Поле зполнено некорректно')
    .required('Поле не может быть пустым'),
});

const ChangeProfile = () => {
  const navigate = useNavigate();
  const user = useSelector((state: RootState) => state.auth.user);
  const [fieldError, setFieldError] = useState(null);
  const dispatch = useAppDispatch();

  return (
    <div className={classNames('container-content', 'bg-image_login', 'container-content_main')}>
      <Title text='Изменение данных пользователя' />
      <Formik
        initialValues={{
          first_name: user.first_name ?? '',
          second_name: user.second_name ?? '',
          login: user.login ?? '',
          email: user.email ?? '',
          phone: user.phone ?? '',
        }}
        validationSchema={ProfileSchema}
        onSubmit={(values) => {
          dispatch(
            changeUserProfile({ navigate: navigate, values: values, setFieldError: setFieldError })
          );
        }}>
        {({ errors, values }) => (
          <Form>
            <InputWrapper error={errors.first_name} label='Имя'>
              <input value={values.first_name} name='first_name' className='input__field' />
              <ValidateErrorMessage
                title='Ошибка валидации'
                message={errors.first_name}
                visible={!!errors.first_name}
              />
            </InputWrapper>
            <InputWrapper error={errors.second_name} label='Фамилия'>
              <input
                value={values.first_name}
                type='text'
                name='second_name'
                className='input__field'
              />
              <ValidateErrorMessage
                title='Ошибка валидации'
                message={errors.second_name}
                visible={!!errors.second_name}
              />
            </InputWrapper>
            <InputWrapper error={errors.login} label='Логин'>
              <input value={values.login} type='text' name='login' className='input__field' />
              <ValidateErrorMessage
                title='Ошибка валидации'
                message={errors.login}
                visible={!!errors.login}
              />
            </InputWrapper>
            <InputWrapper error={errors.email} label='Ваша почта'>
              <input value={values.email} type='text' name='email' className='input__field' />
              <ValidateErrorMessage
                title='Ошибка валидации'
                message={errors.email}
                visible={!!errors.email}
              />
            </InputWrapper>
            <InputWrapper error={errors.phone} label='Телефон'>
              <input value={values.phone} name='phone' className='input__field' />
              <ValidateErrorMessage
                title='Ошибка валидации'
                message={errors.phone}
                visible={!!errors.phone}
              />
            </InputWrapper>
            <div>{fieldError}</div>
            <Button text='Изменить данные' type='submit' className='custom-button' />
          </Form>
        )}
      </Formik>
    </div>
  );
};
export default ChangeProfile;
