import { memo, useEffect, useState } from 'react';
import { EmojiType, ForumThemeType } from '@typings/app.typings';
import axios from 'axios';
import moment from 'moment';

import { Avatar } from '@/components/Avatar';
import { EmoteMenu } from '@/components/Emoji/EmoteMenu';
import { showError } from '@/utils/ShowError';

import 'moment/locale/ru';

import './index.scss';

moment.locale('ru');
export const Message = memo(({ data, topic }: { data: ForumThemeType; topic: boolean }) => {
  const [messageReactions, setMessageReactions] = useState<EmojiType>();
  const pasteEmojiHandler = (emoji: string) => {
    const requestData = JSON.stringify({
      message_id: data.id,
      author_id: data.author.id,
      emoji: emoji,
    });
    axios('http://localhost:3001/api/forum/emoji', {
      method: 'post',
      data: requestData,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      responseType: 'json',
    }).catch(() => {
      showError();
    });
  };

  const reactions = data.emojis;

  if (reactions) {
    useEffect(() => {
      let counter = 1;
      const idArray = reactions.map((elem) => elem.id);
      const namesTraversed: unknown[] = [];
      let len = 0;
      reactions.forEach((elem) => {
        len = idArray.filter((id) => id === elem.id).length;
        if (len > 1) {
          if (namesTraversed.includes(elem.id)) {
            namesTraversed.push(elem.id);
            counter = namesTraversed.filter((id) => id === elem.id).length;
            elem.counter = counter;
          } else {
            namesTraversed.push(elem.id);
            counter = 1;
            elem.counter = counter;
          }
        }
      });
      setMessageReactions({ ...reactions, counter });
    }, []);
  }

  return (
    <div className='message-wrapper'>
      <div className='user-wrapper'>
        <Avatar size='small' src={data.author?.avatar?.toString()} />
        <p className='user-name'>
          {data.author?.second_name} {data.author?.first_name}
        </p>
        <p className='send-time'>{moment(data.updated_at).format('YYYY-MM-DD HH:mm:ss')}</p>
      </div>
      <p className='message'>{data.text || data.title}</p>
      {!topic && (
        <div className='reactions'>
          <div>
            <EmoteMenu onEmojiSelect={pasteEmojiHandler} />
          </div>
          <ul>
            {data.emojis?.map((i) => (
              <li className='reaction-wrapper' key={i.id}>
                <div>{i.emoji}</div>
                {messageReactions?.counter && messageReactions?.counter > 1 && (
                  <div className='reaction-counter'>{messageReactions?.counter}</div>
                )}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
});
