import { Button } from '@components/Button';
import { Input } from '@components/Input';

import './index.scss';

export function TypingPlace() {
  return (
    <form className='typing-place'>
      <Input name='message' type='text' label='Сообщение' />
      <Button
        text='Отправить'
        className='button button_view_primary custom-button'
        type='submit'
        withSound={true}
      />
    </form>
  );
}
