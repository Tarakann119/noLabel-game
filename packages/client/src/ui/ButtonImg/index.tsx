import { FC } from 'react';
import classNames from 'classnames';

import './index.scss';

type ButtonImgProps = {
  variant: 'close' | 'logout';
  onClick?: () => void;
};

export const ButtonImg: FC<ButtonImgProps> = ({ variant = 'close', onClick }) => {
  return (
    <div className={classNames('button-img', 'button-img_' + variant)} onClick={onClick}></div>
  );
};
