import classNames from 'classnames';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { Button } from '@/components/Button';
import { InputValidate } from '@/components/InputValidate';
import { Title } from '@/components/Title';

const CreatePostSchema = Yup.object().shape({
  title: Yup.string().required('Введите название темы.'),
  message: Yup.string().min(10, 'Минимум 10 символов.').required('Введите содержание темы.'),
});

export const CreateTopic = () => {
  return (
    <main className={classNames('container-content', 'container-content_main', 'bg-image_login')}>
      <div className='forum__container'>
        <Formik
          initialValues={{
            title: '',
            message: '',
          }}
          validationSchema={CreatePostSchema}
          onSubmit={(values) => {
            console.log(values);
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
              <InputValidate
                handleChange={handleChange}
                name='message'
                type='text'
                label='Текст темы'
                value={values.message}
                error={errors.message}
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
