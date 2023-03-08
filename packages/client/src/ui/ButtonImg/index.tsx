import React, { FC } from 'react';
import './index.scss';
import classNames from 'classnames';

type ButtonImgProps = {
  variant: 'close' | 'logout';
  onClick?: () => void;
};

const ButtonImg: FC<ButtonImgProps> = ({ variant = 'close', onClick }) => {
  return (
    <div className={classNames('button-img', 'button-img_' + variant)} onClick={onClick}></div>
  );
};

export default ButtonImg;
