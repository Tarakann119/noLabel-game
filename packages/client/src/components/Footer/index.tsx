import React, { ReactElement, ReactNode } from 'react';
import { Link } from 'react-router-dom';
import './index.scss';

interface FooterProps {
  children?: ReactElement | ReactNode | ReactNode[];
}

const Footer: React.FC<FooterProps> = ({ children }) => {
  return (
    <>
      <div className='footer'>
        <div className='footer__logo'></div>
        <div className='footer__children-container'>{children}</div>
        <div className='footer__link-container'>
          <Link to={'/aboutUs'} className='custom-link'>
            О нас
          </Link>
        </div>
      </div>
    </>
  );
};
export default Footer;
