import { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { changeUserProfile } from '@/components/Autification/slice';
import { Button } from '@/components/Button';
import { InputValidate } from '@/components/InputValidate';
import { Title } from '@/components/Title';
import { currentUser } from '@/store/selectors';
import { useAppDispatch } from '@/utils/hooks/reduxHooks';

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
    .matches(/^[a-z0-9_-]{2,19}$/, 'Поле заполнено некорректно')
    .required('Поле не может быть пустым'),
  email: Yup.string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, 'Поле заполнено некорректно')
    .required('Поле не может быть пустым'),
  phone: Yup.string()
    .matches(/^[\d\\+][\d\\(\\)\\ -]{9,14}\d$/, 'Поле зполнено некорректно')
    .required('Поле не может быть пустым'),
});

export const ChangeProfile = () => {
  const navigate = useNavigate();
  const user = useSelector(currentUser);
  const [fieldError, setFieldError] = useState(null);
  const dispatch = useAppDispatch();

  return (
    <div className={classNames('container-content', 'bg-image_login', 'container-content_main')}>
      <div className='container_center colum-6'>
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
              changeUserProfile({
                navigate: navigate,
                values: values,
                setFieldError: setFieldError,
              })
            );
          }}>
          {({ errors, values, handleChange }) => (
            <Form className='change-profile__form-container'>
              <div className='change-profile__item-container'>
                <InputValidate
                  handleChange={handleChange}
                  name='first_name'
                  type='text'
                  label='Имя'
                  value={values.first_name}
                  error={errors.first_name}
                />
                <InputValidate
                  handleChange={handleChange}
                  name='second_name'
                  type='text'
                  label='Фамилия'
                  value={values.second_name}
                  error={errors.second_name}
                />
                <InputValidate
                  handleChange={handleChange}
                  name='login'
                  type='text'
                  label='Логин'
                  value={values.login}
                  error={errors.login}
                />
                <InputValidate
                  handleChange={handleChange}
                  name='email'
                  type='text'
                  label='Ваша почта'
                  value={values.email}
                  error={errors.email}
                />
                <InputValidate
                  handleChange={handleChange}
                  name='phone'
                  type='text'
                  label='Телефон'
                  value={values.phone}
                  error={errors.phone}
                />
              </div>
              <div>{fieldError}</div>
              <Button text='Изменить данные' type='submit' className='custom-button' />
            </Form>
          )}
        </Formik>
      </div>
    </div>
  );
};
