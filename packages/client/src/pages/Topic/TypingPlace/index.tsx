import { useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import axios from 'axios';
import { Form, Formik } from 'formik';

import { Button } from '@/components/Button';
import { EmoteMenu } from '@/components/Emoji/EmoteMenu';
import { MyTextArea } from '@/components/TextArea';
import { currentUser } from '@/store/selectors';
import { showError } from '@/utils/ShowError';

import './index.scss';

export function TypingPlace({ topic_id }: { topic_id: number | undefined }) {
  const [messageContent, setMessageContent] = useState<string>('');

  const pasteEmojiHandler = (emoji: string) => {
    setMessageContent(messageContent + emoji);
  };
  const user = useSelector(currentUser);
  return (
    <Formik
      initialValues={{
        message: '',
      }}
      onSubmit={() => {
        const data = JSON.stringify({
          text: messageContent,
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
        setMessageContent('');
      }}>
      {() => (
        <Form className='typing-place'>
          <MyTextArea
            name='message'
            type='text'
            label='Сообщение'
            value={messageContent}
            handleChange={(e) => setMessageContent(e.target.value)}
          />
          <EmoteMenu onEmojiSelect={pasteEmojiHandler} />
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
