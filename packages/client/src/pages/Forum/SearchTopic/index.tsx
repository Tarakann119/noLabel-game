import { ChangeEvent, useMemo, useState } from 'react';
import { debounce } from 'lodash';

import { InputValidate } from '@/components/InputValidate';

export function SearchTopic({ setSearch }: { setSearch: (value: string) => void }) {
  const [value, setValue] = useState('');
  const debounceFn = useMemo(() => debounce(handleDebounceFn, 1000), []);

  function handleDebounceFn(inputValue: string) {
    console.log(inputValue);
  }

  function handleChange(event: ChangeEvent) {
    const { value } = event.currentTarget as HTMLInputElement;

    setValue(value);
    setSearch(value);
    debounceFn(value);
  }

  return (
    <InputValidate
      handleChange={handleChange}
      name='title'
      type='search'
      placeholder='Поиск'
      value={value}
    />
  );
}
