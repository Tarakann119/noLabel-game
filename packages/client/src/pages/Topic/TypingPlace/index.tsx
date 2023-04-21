import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { Button } from '@/components/Button';
import { InputValidate } from '@/components/InputValidate';

import './index.scss';

const MessageSchema = Yup.object().shape({
  login: Yup.string()
    .min(2, 'Сообщение слишком короткое!')
    .max(2000, 'Сообщение слишком длинное!')
    .matches(/[^\s\t\r\n\v\f]$/, 'Поле содержит недопустимые символы')
    .required('Required'),
});

export function TypingPlace() {
  return (
    <Formik
      initialValues={{
        message: '',
      }}
      validationSchema={MessageSchema}
      onSubmit={(values) => {
        console.log(values);
      }}>
      {({ errors, values, handleChange }) => (
        <Form className='typing-place'>
          <InputValidate
            name='message'
            type='text'
            label='Сообщение'
            value={values.message}
            error={errors.message}
            handleChange={handleChange}
          />
          <Button
            text='Отправить'
            className='button button_view_primary custom-button'
            type='submit'
          />
        </Form>
      )}
    </Formik>
  );
}
