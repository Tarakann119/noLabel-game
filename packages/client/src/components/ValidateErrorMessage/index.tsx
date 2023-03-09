import React, { FC, useState } from 'react';
import ButtonImg from '../../ui/ButtonImg';
import './index.scss';
import classNames from 'classnames';

type ValErrMesProps = {
  title: string;
  message: string;
  visible: boolean;
};

const ValidateErrorMessage: FC<ValErrMesProps> = ({ title, message, visible }) => {
  // Можно ограничить длину заголовка или текста сообщения ошибки
  const titleLength = 26;
  const messageLength = 600;

  title = title.length > titleLength ? title.substring(0, titleLength - 3) + '...' : title;
  message =
    message.length > messageLength ? message.substring(0, messageLength - 3) + '...' : message;

  const [hidden, setHidden] = useState(!visible);

  // hidden={hidden}
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
