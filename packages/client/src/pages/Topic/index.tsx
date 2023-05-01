import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { EmojiType, ForumThemeType, ForumTopicType } from '@typings/app.typings';
import axios from 'axios';
import classNames from 'classnames';

import { Title } from '@/components/Title';
import { showError } from '@/utils/ShowError';

import { Message } from './Message';
import { TypingPlace } from './TypingPlace';

import './index.scss';

export function Topic() {
  const { id } = useParams();
  const [messages, setMessages] = useState<ForumThemeType[]>([]);
  const [topic, setTopic] = useState<ForumTopicType>();
  const [messageContent, setMessageContent] = useState<string>('');
  const [messageReactions, setMessageReactions] = useState<EmojiType>();
  const fetchData = async () => {
    try {
      const result = await axios(`http://localhost:3001/api/forum/messages/topic/${id}`);
      setMessages(result.data);
    } catch (error) {
      showError();
    }
  };
  useEffect(() => {
    fetchData();
  }, [messageContent, messageReactions]);

  useEffect(() => {
    const topicData = async () => {
      try {
        const result = await axios(`http://localhost:3001/api/forum/topics/${id}`);
        setTopic(result.data);
      } catch (error) {
        showError();
      }
    };
    topicData();
  }, []);

  const deleteMessage = async (id: number) => {
    await axios(`http://localhost:3001/api/forum/messages/${id}`, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      responseType: 'json',
    }).catch(() => {
      showError();
    });
    fetchData();
  };

  return (
    <div className={classNames('container-content', 'container-content_main', 'bg-image_login')}>
      <div className='forum__container'>
        <Title className='form-login-title' text={topic?.title || ' '} />
        <div className='chat-wrapper'>
          {topic && (
            <div className='topic-message'>
              <Message
                //@ts-expect-error need to pass different data
                data={topic}
                topic={true}
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
                />
              </li>
            ))}
          </ul>
          <TypingPlace
            topic_id={topic?.id}
            messageContent={messageContent}
            setMessageContent={setMessageContent}
          />
        </div>
      </div>
    </div>
  );
}
