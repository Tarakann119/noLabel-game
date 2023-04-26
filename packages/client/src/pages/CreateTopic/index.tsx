import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { Button } from '@/components/Button';
import { InputValidate } from '@/components/InputValidate';
import { Title } from '@/components/Title';
import { currentUser } from '@/store/selectors';
import { showError } from '@/utils/ShowError';

const CreatePostSchema = Yup.object().shape({
  title: Yup.string().required('Введите название темы.'),
});

export const CreateTopic = () => {
  const user = useSelector(currentUser);
  return (
    <main className='container-content container-content_main bg-image_login'>
      <div className='forum__container'>
        <Formik
          initialValues={{
            title: '',
          }}
          validationSchema={CreatePostSchema}
          onSubmit={(values) => {
            const data = JSON.stringify({ title: values.title, author_id: user.id });
            axios('http://localhost:3001/api/forum/topics', {
              method: 'post',
              data: data,
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              responseType: 'json',
            })
              .then((response) => {
                if (response.data === 'OK') {
                  try {
                    toast.success('Тема успешно создана!');
                  } catch {
                    showError();
                  }
                }
              })
              .catch(() => {
                showError();
              });
          }}>
          {({ errors, values, handleChange }) => (
            <Form>
              <Title text='Создать новую тему' />
              <InputValidate
                handleChange={handleChange}
                name='title'
                type='text'
                label='Заголовок темы'
                value={values.title}
                error={errors.title}
              />

              <Button
                text='Создать'
                className='button button_view_primary custom-button'
                type='submit'
              />
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};
