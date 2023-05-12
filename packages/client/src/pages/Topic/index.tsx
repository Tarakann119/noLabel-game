import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { useNavigate } from 'react-router-dom';
import { EmojiType, ForumThemeType, ForumTopicType } from '@typings/app.typings';
import classNames from 'classnames';

import { deleteForumTopic, getCurrentTopic } from '@/components/ForumSlice/forumSlice';
import { deleteCurrentMessage, getMessagesForTopic } from '@/components/ForumSlice/messagesSlice';
import { Title } from '@/components/Title';
import { useAppDispatch } from '@/utils/hooks/reduxHooks';

import { Message } from './Message';
import { TypingPlace } from './TypingPlace';

import './index.scss';

export function Topic() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [messages, setMessages] = useState<ForumThemeType[]>([]);
  const [topic, setTopic] = useState<ForumTopicType>();
  const [messageContent, setMessageContent] = useState<string>('');
  const [messageReactions, setMessageReactions] = useState<EmojiType>();
  const dispatch = useAppDispatch();

  const fetchData = () => {
    dispatch(getMessagesForTopic({ id })).then((e) => setMessages(e.payload));
  };
  useEffect(() => {
    fetchData();
  }, [messageReactions]);

  useEffect(() => {
    dispatch(getCurrentTopic({ id })).then((e) => setTopic(e.payload));
  }, [dispatch]);

  const deleteMessage = (id: number) => {
    dispatch(deleteCurrentMessage({ id })).then(() => fetchData());
  };

  const deleteTopic = async (id: number) => {
    await dispatch(deleteForumTopic({ id, navigate })).then(() => fetchData());
  };

  return (
    <div className={classNames('container-content', 'container-content_main', 'bg-image_login')}>
      <div className='forum__container'>
        <Title className='form-login-title' text={topic?.title || ' '} />
        <div className='chat-wrapper'>
          {topic && (
            <div className='topic-message'>
              <Message
                //@ts-expect-error need to pass different types of data
                data={topic}
                topic={true}
                deleteMessage={deleteTopic}
              />
            </div>
          )}
          <ul className='topic-chat'>
            {messages.map((data) => (
              <li key={data.id.toString()} className='message-list'>
                <Message
                  data={data}
                  topic={false}
                  messageReactions={messageReactions}
                  setMessageReactions={setMessageReactions}
                  deleteMessage={deleteMessage}
                  fetchData={fetchData}
                />
              </li>
            ))}
          </ul>
          <TypingPlace
            topic_id={topic?.id}
            messageContent={messageContent}
            setMessageContent={setMessageContent}
            fetchData={fetchData}
          />
        </div>
      </div>
    </div>
  );
}
