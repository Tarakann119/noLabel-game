import React, { FC } from 'react';

import { ButtonImg } from '@/ui/ButtonImg';
import { uuid } from '@/utils/generateId';

import './index.scss';

type link = {
  type: 'github' | 'telegram';
  url: string;
};

type AuthorItemProps = {
  title: string;
  link?: link[];
};

const AuthorItem: FC<AuthorItemProps> = ({ title, link }) => {
  const links = link?.map((item) => {
    return (
      <ButtonImg
        key={uuid()}
        variant={item.type}
        onClick={() => window.open(item.url)}
        style={{ margin: 10 }}
      />
    );
  });

  return (
    <div className='author-item__container'>
      <span className='author-item__header'>{title}</span>
      <div className='author-item__container_link'>{links}</div>
    </div>
  );
};

export default AuthorItem;
