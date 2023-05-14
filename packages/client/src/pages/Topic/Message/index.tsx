import { memo, useState } from 'react';
import { FacebookSelector } from '@charkour/react-reactions';
import { ForumThemeType, ForumTopicType } from '@typings/app.typings';
import axios from 'axios';
import moment from 'moment';

import { Avatar } from '@/components/Avatar';
import { showError } from '@/utils/ShowError';

import 'moment/locale/ru';

import './index.scss';

moment.locale('ru');
export const Message = memo(({ data }: { data: ForumThemeType }) => {
  const [emojiMenuVisible, setEmojiMenuVisible] = useState(false);

  function handleEmojiClick(e: unknown) {
    const requestData = JSON.stringify({
      message_id: data.id,
      author_id: data.author.id,
      emoji: e,
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
    setEmojiMenuVisible(false);
  }

  return (
    <div className='message-wrapper'>
      <div className='user-wrapper'>
        <Avatar size='small' src={data.author?.avatar?.toString()} />
        <p className='user-name'>
          {data.author?.second_name} {data.author?.first_name}
        </p>
      </div>
      <p className='message'>{data.text}</p>
      <p className='send-time'>{moment(data.updated_at).format('YYYY-MM-DD HH:mm:ss')}</p>
      <div>
        {' '}
        {data.emojis?.map((i) => (
          <div>{i.emoji}</div>
        ))}
      </div>
      <div onClick={() => setEmojiMenuVisible(!emojiMenuVisible)} style={{ cursor: 'pointer' }}>
        ☹️
      </div>
      {emojiMenuVisible && (
        <div>
          <FacebookSelector onSelect={(e) => handleEmojiClick(e)} iconSize={20} />
        </div>
      )}
    </div>
  );
});
