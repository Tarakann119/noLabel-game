import React, { FC, memo, useEffect, useState } from 'react';
import { FacebookSelector } from '@charkour/react-reactions';
import { ForumMessageType, UserInfo } from '@typings/app.typings';
import axios from 'axios';

import { Avatar } from '@/components/Avatar';

import './index.scss';

// export type MessageProps = {
//   userName: string;
//   text: string;
//   date: string;
// } & React.HTMLAttributes<HTMLDivElement>;
export const Message: FC<ForumMessageType> = memo(({ author_id, text, created_at }) => {
  const [author, setAuthor] = useState<UserInfo>();
  const [emojiMenuVisible, setEmojiMenuVisible] = useState(false);
  const [emojies, setEmojies] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios(`http://localhost:3001/api/user/${author_id}`);
        setAuthor(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchData();
  }, []);
  function handleEmojiClick(e: unknown) {
    setEmojies([...emojies]);
    console.log(e);
    setEmojiMenuVisible(false);
  }

  return (
    <div className='message-wrapper'>
      <div className='user-wrapper'>
        <Avatar size='small' src={author?.avatar?.toString()} />
        <p className='user-name'>{author?.login}</p>
      </div>
      <p className='message'>{text}</p>
      <p className='send-time'>{created_at.toDateString()}</p>
      <div onClick={() => setEmojiMenuVisible(true)}>☹️</div>
      {emojiMenuVisible && (
        <div>
          {emojies?.map((i) => (
            <div>{i}</div>
          ))}
          <FacebookSelector onSelect={(e) => handleEmojiClick(e)} />
        </div>
      )}
    </div>
  );
});
