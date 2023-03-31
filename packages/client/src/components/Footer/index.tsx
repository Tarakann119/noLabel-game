import React from 'react';
import { Link } from 'react-router-dom';
import { FooterProps } from '@components/Footer/Footer.typings';

import AudioPlayer from '../AudioPlayer';

import './index.scss';

export const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <>
      <div className='footer'>
        <div className='footer__logo'></div>
        <div className='footer__children-container'>
          {children}
          <AudioPlayer />
        </div>
        <div className='footer__link-container'>
          <Link to={'/aboutUs'} className='custom-link'>
            О нас
          </Link>
        </div>
      </div>
    </>
  );
};
