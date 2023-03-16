import React, { FC, useState } from 'react';
import ButtonImg from '../../ui/ButtonImg';
import './index.scss';
import classNames from 'classnames';

type ValErrMesProps = {
  title: string;
  message: string | undefined;
  visible: boolean;
};

const ValidateErrorMessage: FC<ValErrMesProps> = ({ title, message, visible }) => {
  const titleLength = 26;
  const messageLength = 600;

  title = title.length > titleLength ? title.substring(0, titleLength - 3) + '...' : title;
  message =
    message && message.length > messageLength
      ? message.substring(0, messageLength - 3) + '...'
      : message;

  const [hidden, setHidden] = useState(!visible);

  return (
    <div
      className={classNames('validate-error-message__container', { hidden: !visible && hidden })}>
      <div className='validate-error-message__container_title'>
        <span className='validate-error-message__title'>{title}</span>
        <ButtonImg variant='close' onClick={() => setHidden(true)} />
      </div>
      <div className='validate-error-message__error-text'>{message}</div>
    </div>
  );
};

export default ValidateErrorMessage;
