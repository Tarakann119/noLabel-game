import { Input } from '../../../components/Input'
import { Button } from '../../../components/Button'
import './index.scss'
import InputValidate from '../../../components/InputValidate';

export function TypingPlace() {
  return (
    <form className="typing-place">
      <Input
        name='message'
        type='text'
        label='Сообщение'
      />
      <Button
        text="Отправить"
        className="button button_view_primary custom-button"
        type="submit"
        withSound={true}
      />
    </form>
  )
}
