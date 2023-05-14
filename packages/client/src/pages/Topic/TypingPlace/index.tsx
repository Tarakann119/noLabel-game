import { useSelector } from 'react-redux';
import { Form, Formik } from 'formik';

import { Button } from '@/components/Button';
import { EmoteMenu } from '@/components/Emoji/EmoteMenu';
import { postTopicMessage } from '@/components/ForumSlice/messagesSlice';
import { MyTextArea } from '@/components/TextArea';
import { currentUser } from '@/store/selectors';
import { useAppDispatch } from '@/utils/hooks/reduxHooks';

import './index.scss';

export function TypingPlace({
  topic_id,
  messageContent,
  setMessageContent,
  fetchData,
}: {
  topic_id: number | undefined | string;
  messageContent: string;
  setMessageContent: React.Dispatch<React.SetStateAction<string>>;
  fetchData: () => void;
}) {
  const dispatch = useAppDispatch();
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
        dispatch(
          postTopicMessage({
            text: messageContent,
            author_id: user.id,
            topic_id: topic_id,
            fetchData: fetchData,
            setMessageContent: setMessageContent,
          })
        );
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
