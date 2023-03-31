import { Title } from '@components/Title';
import classNames from 'classnames';

import { Message } from './Message';
import { TypingPlace } from './TypingPlace';

import './index.scss';

interface IMessage {
  userName: string;
  text: string;
  messageId: number;
  date: string;
}

export function Topic() {
  const messageList: IMessage[] = [
    {
      userName: 'Ivan',
      text: 'Не получается пройти уровень. ',
      messageId: 1,
      date: '22/02/2022 18.30',
    },
    {
      userName: 'Laila',
      text: 'Жми на кнопку сильнее и думай куда ставить башню!',
      messageId: 2,
      date: '22/02/2022 18.30',
    },
    {
      userName: 'Jonh',
      text: 'Check yours ping and connection',
      messageId: 3,
      date: '22/02/2022 18.30',
    },
    {
      userName: 'Laila',
      text: 'Жми на кнопку сильнее и думай куда ставить башню!',
      messageId: 4,
      date: '22/02/2022 18.30',
    },
    {
      userName: 'Jonh',
      text: 'Check yours ping and connection',
      messageId: 5,
      date: '22/02/2022 18.30',
    },
    {
      userName: 'Laila',
      text: 'Жми на кнопку сильнее и думай куда ставить башню!',
      messageId: 6,
      date: '22/02/2022 18.30',
    },
    {
      userName: 'Jonh',
      text: 'Check yours ping and connection',
      messageId: 7,
      date: '22/02/2022 18.30',
    },
  ];
  const questionMessage = messageList.shift() as IMessage;
  return (
    <div className={classNames('container-content', 'container-content_main', 'bg-image_login')}>
      <div className='forum__container'>
        <Title className='form-login-title' text='Название темы' />
        <div className='chat-wrapper'>
          {questionMessage && (
            <div className='topic-message'>
              <Message
                userName={questionMessage.userName}
                text={questionMessage.text}
                date={questionMessage.date}
              />
            </div>
          )}
          <ul className='topic-chat'>
            {messageList.map((data) => (
              <li key={data.messageId}>
                <Message {...data} />
              </li>
            ))}
          </ul>
          <TypingPlace />
        </div>
      </div>
    </div>
  );
}
