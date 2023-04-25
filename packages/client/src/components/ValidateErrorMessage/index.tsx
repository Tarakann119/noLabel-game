import { FC, useState } from 'react';
import classNames from 'classnames';

import { ButtonImg } from '@/ui/ButtonImg';

import { ValidateErrorMessageProps } from './ValidateErrorMessage.typings';

import './index.scss';

export const ValidateErrorMessage: FC<ValidateErrorMessageProps> = ({
  title,
  message,
  visible,
}) => {
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
