import { useEffect, useState } from 'react';

import { AddTopic } from '../AddTopic';
import { SearchTopic } from '../SearchTopic';

import './index.scss';

export function ForumHeader({ setSearchInfo }: { setSearchInfo: (search: string) => void }) {
  const [search, setSearh] = useState('');
  useEffect(() => {
    setSearchInfo(search);
  }, [search]);

  return (
    <div className='forum-header'>
      <AddTopic />
      <SearchTopic setSearch={setSearh} />
    </div>
  );
}
