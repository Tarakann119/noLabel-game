import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { useLoading } from '../../components/LoaderComponent';
import Loader from '../../ui/Loader';
import { useSelector } from 'react-redux';
import { RootState } from '../../Store/store';
type ChangeProfileType = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
};
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
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { loading, setLoading } = useLoading();
  const handleSubmit = async (values: ChangeProfileType) => {
    const data = JSON.stringify(values);
    axios('https://ya-praktikum.tech/api/v2/user/profile', {
      method: 'put',
      data: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        toast.success('Пользователь создан!');
        navigate('/profile');
      })
      .catch((error) => {
        toast.error('Что-то не так...');
        setFieldError(error.response?.data.reason);
      });
  };
  return (
    <>
      <h2>Изменение данных пользователя</h2>
      {loading && <Loader />}
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
          console.log(values);
          handleSubmit(values);
        }}>
        {({ errors, touched, values }) => (
          <Form>
            <label htmlFor='first_name'>Имя</label>
            <input value={values.first_name} name='first_name' />
            {errors.first_name && touched.first_name ? <div>{errors.first_name}</div> : null}
            <label htmlFor='second_name'>Фамилия</label>
            <input value={values.first_name} type='text' name='second_name' />
            {errors.second_name && touched.second_name ? <div>{errors.second_name}</div> : null}
            <label htmlFor='login'>Логин</label>
            <input value={values.login} type='text' name='login' />
            {errors.login && touched.login ? <div>{errors.login}</div> : null}
            <label htmlFor='email'>Email</label>
            <input value={values.email} type='text' name='email' />
            {errors.email && touched.email ? <div>{errors.email}</div> : null}
            <label htmlFor='phone'>Телефон</label>
            <input value={values.phone} name='phone' />
            {errors.phone && touched.phone ? <div>{errors.phone}</div> : null}
            <div>{fieldError}</div>
            <button type='submit'>Изменить данные</button>
          </Form>
        )}
      </Formik>
    </>
  );
};
export default ChangeProfile;
