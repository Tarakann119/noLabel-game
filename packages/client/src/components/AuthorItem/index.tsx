import { FC } from 'react';
import classNames from 'classnames';

import { Icon } from '@/components/Icon';
import { Link } from '@/components/Link';

import { TAuthorItemProps } from './AuthorItem.typings';

import './index.scss';

export const AuthorItem: FC<TAuthorItemProps> = ({ className, name, img, links }) => (
  <div className={classNames('author-item', className)}>
    <picture className='author-item__picture'>
      <img className='author-item__img' src={img} alt='' />
    </picture>

    <span className='author-item__name'>{name}</span>

    <div className='author-item__group'>
      {links.map(({ type, url }) => (
        <Link key={url} className='author-item__link button button_icon' to={url}>
          <Icon icon={type} />
        </Link>
      ))}
    </div>
  </div>
);
