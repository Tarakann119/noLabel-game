import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { Button } from '@/components/Button';
import { createTopic } from '@/components/ForumSlice/forumSlice';
import { InputValidate } from '@/components/InputValidate';
import { Title } from '@/components/Title';
import { currentUser } from '@/store/selectors';
import { useAppDispatch } from '@/utils/hooks/reduxHooks';

const CreatePostSchema = Yup.object().shape({
  title: Yup.string().required('Введите название темы.'),
});

export const CreateTopic = () => {
  const user = useSelector(currentUser);
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  return (
    <main className='container-content container-content_main bg-image_login'>
      <div className='forum__container'>
        <Formik
          initialValues={{
            title: '',
          }}
          validationSchema={CreatePostSchema}
          onSubmit={(values) => {
            dispatch(createTopic({ values: values.title, userId: user.id, navigate: navigate }));
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
