import { Field, FieldProps, Form, Formik } from 'formik';

import { Button } from '@/components/Button';
import { Title } from '@/components/Title';
import { CreatePostSchema } from '@/validationSchemas';

import './index.scss';

export const CreatePost = () => {
  return (
    <main className='main main-bg main-h container bg-image_base'>
      <div className='post-page__content'>
        <Title size='small' className='post-title' level='1'>
          Создать новую тему
        </Title>

        <Formik
          initialValues={{
            title: '',
            message: '',
          }}
          validationSchema={CreatePostSchema}
          onSubmit={(values) => {
            console.log(values);
          }}>
          {() => (
            <Form className='form post-page__form'>
              <Field name='themeTitle'>
                {({ field }: FieldProps) => (
                  <div className='form-control'>
                    <label htmlFor={field.name} className='form-control__label'>
                      Заголовок темы
                    </label>

                    <input className='form-control__input' type='text' {...field} />
                  </div>
                )}
              </Field>

              <Field name='themeText'>
                {({ field }: FieldProps) => (
                  <div className='form-control'>
                    <label htmlFor={field.name} className='form-control__label'>
                      Текст темы
                    </label>

                    {/* Заменить на редактор сообщений */}
                    <textarea
                      className='post-page__message form-control__input'
                      {...field}></textarea>
                  </div>
                )}
              </Field>

              <Button type='submit' className='post-page__send' view='primary'>
                Создать
              </Button>
            </Form>
          )}
        </Formik>
      </div>
    </main>
  );
};
