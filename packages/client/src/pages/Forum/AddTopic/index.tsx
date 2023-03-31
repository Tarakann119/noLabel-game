import { useCallback, useState } from 'react';
import { Button } from '@components/Button';
import { Input } from '@components/Input';

import './index.scss';

export function AddTopic() {
  const inputProps = {
    name: 'add-topic',
    placeholder: 'Введите название темы...',
    className: 'big-box-size',
  };
  const [shouldShowAddTopicForm, setShouldShowAddTopicForm] = useState(false);

  const toggleShowAddTopicForm = useCallback(() => {
    setShouldShowAddTopicForm(!shouldShowAddTopicForm);
  }, [shouldShowAddTopicForm]);

  return (
    <div className='add-topic'>
      {!shouldShowAddTopicForm && (
        <Button
          text='Создать новую тему'
          onClick={toggleShowAddTopicForm}
          className='add-topic__btn'
        />
      )}
      {shouldShowAddTopicForm && (
        <form method='post' className='add-topic__form'>
          <Input {...inputProps} />
          <Button text='Создать тему' onClick={toggleShowAddTopicForm} />
        </form>
      )}
    </div>
  );
}
