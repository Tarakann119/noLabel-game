import { useEffect, useState } from 'react';
import { useParams } from 'react-router';
import { ForumThemeType, ForumTopicType } from '@typings/app.typings';
import axios from 'axios';
import classNames from 'classnames';

import { Title } from '@/components/Title';

import { Message } from './Message';
import { TypingPlace } from './TypingPlace';

import './index.scss';

export function Topic() {
  const { id } = useParams();
  const [messages, setMessages] = useState<ForumThemeType[]>([]);
  const [topic, setTopic] = useState<ForumTopicType>();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(`http://localhost:3001/api/forum/messages/topic/${id}`);
        setMessages(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  console.log(messages);
  useEffect(() => {
    const topicData = async () => {
      try {
        const result = await axios(`http://localhost:3001/api/forum/topics/${id}`);
        setTopic(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    topicData();
  }, []);

  // const messageList: IMessage[] = [
  //   {
  //     userName: 'Ivan',
  //     text: 'Не получается пройти уровень. ',
  //     messageId: 1,
  //     date: '22/02/2022 18.30',
  //   },
  //   {
  //     userName: 'Laila',
  //     text: 'Жми на кнопку сильнее и думай куда ставить башню!',
  //     messageId: 2,
  //     date: '22/02/2022 18.30',
  //   },
  //   {
  //     userName: 'Jonh',
  //     text: 'Check yours ping and connection',
  //     messageId: 3,
  //     date: '22/02/2022 18.30',
  //   },
  //   {
  //     userName: 'Laila',
  //     text: 'Жми на кнопку сильнее и думай куда ставить башню!',
  //     messageId: 4,
  //     date: '22/02/2022 18.30',
  //   },
  //   {
  //     userName: 'Jonh',
  //     text: 'Check yours ping and connection',
  //     messageId: 5,
  //     date: '22/02/2022 18.30',
  //   },
  //   {
  //     userName: 'Laila',
  //     text: 'Жми на кнопку сильнее и думай куда ставить башню!',
  //     messageId: 6,
  //     date: '22/02/2022 18.30',
  //   },
  //   {
  //     userName: 'Jonh',
  //     text: 'Check yours ping and connection',
  //     messageId: 7,
  //     date: '22/02/2022 18.30',
  //   },
  // ];
  // const questionMessage = messageList.shift() as IMessage;
  return (
    <div className={classNames('container-content', 'container-content_main', 'bg-image_login')}>
      <div className='forum__container'>
        <Title className='form-login-title' text={topic?.title || ' '} />
        <div className='chat-wrapper'>
          {topic && (
            <div className='topic-message'>
              <Message
                //@ts-expect-error
                data={topic}
              />
            </div>
          )}
          <ul className='topic-chat'>
            {messages.map((data) => (
              <li key={data.id.toString()}>
                <Message data={data} />
              </li>
            ))}
          </ul>
          <TypingPlace topic_id={topic?.id} />
        </div>
      </div>
    </div>
  );
}
