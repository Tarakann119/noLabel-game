import { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { TChangeProfile } from '@typings/app.typings';
import classNames from 'classnames';
import { Field, FieldProps, Form, Formik } from 'formik';
import { isEqual } from 'lodash';

import { Avatar } from '@/components/Avatar';
import { Button } from '@/components/Button';
import { InputValidate } from '@/components/InputValidate';
import { Loader } from '@/components/Loader';
import { Title } from '@/components/Title';
import { useAppDispatch } from '@/hooks/reduxHooks';
import { useLoading } from '@/hooks/useLoading';
import { currentUser } from '@/store/selectors';
import { changeUserProfile, uploadAvatar } from '@/store/slices/Autification';
import { showError, showSuccess } from '@/utils/toastifyNotifications';
import { ProfileSchema } from '@/validationSchemas';

import { TFile } from './Profile.typings';

import './index.scss';

export const Profile = () => {
  const dispatch = useAppDispatch();
  const { avatar, first_name, second_name, login, email, phone } = useSelector(currentUser);
  const { loading, showLoading, hideLoading } = useLoading();
  const [isEdit, setIsEdit] = useState(false);
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
  const initialValues: TChangeProfile = {
    display_name: '',
    first_name: first_name ?? '',
    second_name: second_name ?? '',
    login: login ?? '',
    email: email ?? '',
    phone: phone ?? '',
  };
  const handleSubmit = async (values: TChangeProfile) => {
    showLoading();
    const errors = [];
    let avatarResponse = null;
    let profileResponse = null;

    if (files.length) {
      const image = new FormData();
      image.append('avatar', files[0] as unknown as string | Blob);
      avatarResponse = await dispatch(uploadAvatar({ image }));

      if (avatarResponse.meta.requestStatus === 'rejected') {
        errors.push(avatarResponse.payload);
      }
    }

    if (!isEqual(values, initialValues)) {
      profileResponse = await dispatch(changeUserProfile({ values }));

      if (profileResponse.meta.requestStatus === 'rejected') {
        errors.push(profileResponse.payload);
      }
    }

    if (errors.length) {
      const string = errors.reduce((acc, error) => `${acc} + ${error}`);
      showError(string);
    } else if (profileResponse || avatarResponse) {
      showSuccess('Данные профиля обновлены.');
    }

    setIsEdit(false);
    hideLoading();
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
  ];

  return (
    <main className='main main-h main-bg form-page bg-image_form container'>
      <div className='form-page__wrapper main-h'>
        <div className='form-page__content'>
          <Title level='1' className='form-page__title'>
            Профиль
          </Title>

          <Formik
            initialValues={initialValues}
            validationSchema={ProfileSchema}
            onSubmit={handleSubmit}>
            {() => (
              <Form className='form form-page__form'>
                {loading && <Loader />}

                <Button
                  className='form-page__edit button_outline'
                  view='icon'
                  icon={isEdit ? 'arrow-left2' : 'edit'}
                  onClick={() => setIsEdit(!isEdit)}
                />

                {!isEdit ? (
                  <Avatar
                    className='form-page__avatar avatar_disabled'
                    src={avatar ? avatar : undefined}
                    size='default'
                  />
                ) : (
                  <label
                    htmlFor='changeAvatar'
                    className={classNames('avatar avatar_default form-dropzone form-page__avatar', {
                      'form-dropzone_empty': !files.length,
                    })}
                    {...getRootProps}>
                    {files.length ? (
                      <img className='form-dropzone__preview' src={files[0].preview} alt='' />
                    ) : (
                      <div className='form-dropzone__text'>
                        Нажмите для выбора или перетащите сюда изображение
                      </div>
                    )}
                    <input name='avatar' id='changeAvatar' {...getInputProps()} />
                  </label>
                )}

                {formFields.map(({ name, type, label }) => (
                  <Field key={name} name={name}>
                    {({ field, meta }: FieldProps) => (
                      <InputValidate
                        disabled={!isEdit}
                        label={label}
                        type={type}
                        field={field}
                        meta={meta}
                      />
                    )}
                  </Field>
                ))}

                {isEdit && (
                  <Button
                    view='primary'
                    type='submit'
                    className='form-page__button'
                    disabled={loading}>
                    Обновить данные
                  </Button>
                )}

                <div className='form-page__links'>
                  <Link className='form-page__link' to='/profile/change-password'>
                    Изменить пароль
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
