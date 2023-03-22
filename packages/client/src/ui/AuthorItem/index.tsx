import React, { FC } from 'react';
import { ButtonImg } from '@ui/ButtonImg';

import './index.scss';

type link = {
  type: 'github' | 'telegram';
  url: string;
};

type AuthorItemProps = {
  title: string;
  link?: link[];
  text?: string;
};

const AuthorItem: FC<AuthorItemProps> = ({ title, link, text }) => {
  const links = link?.map((item) => {
    return (
      <ButtonImg variant={item.type} onClick={() => window.open(item.url)} style={{ margin: 10 }} />
    );
  });

  return (
    <div className='author-item__container'>
      <span className='author-item__header'>{title}</span>
      <span className=''> {text} </span>
      <div className='author-item__container_link'>{links}</div>
    </div>
  );
};

export default AuthorItem;
