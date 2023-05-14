import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Editor, EditorState } from 'draft-js';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

import { Button } from '@/components/Button';
import { InputValidate } from '@/components/InputValidate';
import { currentUser } from '@/store/selectors';
import { showError } from '@/utils/ShowError';

import './index.scss';

const MessageSchema = Yup.object().shape({
  login: Yup.string()
    .min(2, 'Сообщение слишком короткое!')
    .max(2000, 'Сообщение слишком длинное!')
    // .matches(/[^\s\t\r\n\v\f]$/, 'Поле содержит недопустимые символы')
    .required('Required'),
});

export function TypingPlace({ topic_id }: { topic_id: number | undefined }) {
  const [editorState, setEditorState] = useState(() => EditorState.createEmpty());
  const user = useSelector(currentUser);
  return (
    <Formik
      initialValues={{
        message: '',
      }}
      // validationSchema={MessageSchema}
      onSubmit={(values) => {
        console.log(values);
        const data = JSON.stringify({
          text: values.message,
          author_id: user.id,
          topic_id: topic_id,
        });
        axios('http://localhost:3001/api/forum/messages', {
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
                toast.success('Сообщение добавлено!');
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
        <Form className='typing-place'>
          <InputValidate
            name='message'
            type='text'
            label='Сообщение'
            value={values.message}
            error={errors.message}
            handleChange={handleChange}
          />
          {/* <Editor editorState={editorState} onChange={setEditorState} /> */}
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
