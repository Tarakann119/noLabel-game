import { useEffect, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';
import { changeUserProfile } from '@components/Autification/slice';
import { uploadAvatar } from '@components/Autification/slice';
import { Button } from '@components/Button';
import { InputValidate } from '@components/InputValidate';
import { fetchLeaderboard } from '@components/Leaderboard/slice';
import { Title } from '@components/Title';
import { currentUser } from '@store/selectors';
import { useAppDispatch } from '@utils/hooks/reduxHooks';
import { Field, FieldProps, Form, Formik } from 'formik';
import * as Yup from 'yup';

import { TFile } from './Profile.typings';

import './index.scss';

const ProfileSchema = Yup.object().shape({
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
});

export const Profile = () => {
  const user = useSelector(currentUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const [isEdit, setIsEdit] = useState(false);
  const [fieldError, setFieldError] = useState(null);
  const [files, setFiles] = useState<TFile[]>([]);
  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': [],
    },
    onDrop: (acceptedFiles) => {
      setFiles(
        acceptedFiles.map((file) =>
          Object.assign(file, {
            preview: URL.createObjectURL(file),
          })
        ) as unknown as TFile[]
      );
    },
  });

  const updateAvatar = async () => {
    const image = new FormData();
    image.append('avatar', files[0] as unknown as string | Blob);
    dispatch(uploadAvatar({ navigate: navigate, image: image }));
  };
  const removeFile = (file: TFile) => {
    const newFiles = [...files];
    newFiles.splice(newFiles.indexOf(file), 1);
    setFiles(newFiles);
  };

  useEffect(() => {
    dispatch(fetchLeaderboard());
  }, [dispatch]);

  return (
    <main className='main main-h main-bg form-page bg-image_form container'>
      <div className='form-page__wrapper main-h'>
        <div className='form-page__content'>
          <Title level='1' className='form-page__title'>
            Профиль
          </Title>

          {!isEdit && (
            <Button
              className='form-page__edit button_outline'
              view='icon'
              icon='edit'
              onClick={() => setIsEdit(true)}
            />
          )}

          <Formik
            initialValues={{
              avatar: user.avatar ?? '',
              first_name: user.first_name ?? '',
              second_name: user.second_name ?? '',
              login: user.login ?? '',
              email: user.email ?? '',
              phone: user.phone ?? '',
            }}
            validationSchema={ProfileSchema}
            onSubmit={(values) => {
              delete values.avatar;
              dispatch(
                changeUserProfile({
                  navigate: navigate,
                  values: values,
                  setFieldError: setFieldError,
                })
              );
            }}>
            {() => (
              <Form className='form form-page__form'>
                <Field name='first_name'>
                  {({ field, meta }: FieldProps) => (
                    <InputValidate
                      disabled={!isEdit ? 'disabled' : ''}
                      label='Имя'
                      type='text'
                      field={field}
                      meta={meta}
                    />
                  )}
                </Field>

                <Field name='second_name'>
                  {({ field, meta }: FieldProps) => (
                    <InputValidate
                      disabled={!isEdit ? 'disabled' : ''}
                      label='Фамилия'
                      type='text'
                      field={field}
                      meta={meta}
                    />
                  )}
                </Field>

                <Field name='login'>
                  {({ field, meta }: FieldProps) => (
                    <InputValidate
                      disabled={!isEdit ? 'disabled' : ''}
                      label='Логин'
                      type='text'
                      field={field}
                      meta={meta}
                    />
                  )}
                </Field>

                <Field name='email'>
                  {({ field, meta }: FieldProps) => (
                    <InputValidate
                      disabled={!isEdit ? 'disabled' : ''}
                      label='Email'
                      type='email'
                      field={field}
                      meta={meta}
                    />
                  )}
                </Field>

                <Field name='phone'>
                  {({ field, meta }: FieldProps) => (
                    <InputValidate
                      disabled={!isEdit ? 'disabled' : ''}
                      label='Номер телефона'
                      type='tel'
                      field={field}
                      meta={meta}
                    />
                  )}
                </Field>

                {isEdit && (
                  <Button view='primary' type='submit' className='form-page__button'>
                    Обновить данные
                  </Button>
                )}
              </Form>
            )}
          </Formik>

          <div className='form-page__links'>
            <Link className='form-page__link' to='/profile/change-password'>
              Изменить пароль
            </Link>
          </div>
        </div>
      </div>
    </main>
  );
};
