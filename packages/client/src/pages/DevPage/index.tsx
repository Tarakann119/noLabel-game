import AuthorItem from '@ui/AuthorItem';

export const DevPage = () => {
  return (
    <div className='container-content container-content_main'>
      <AuthorItem
        title='Андрей Стрельцов'
        link={[
          { type: 'github', url: 'https://github.com/Antidods' },
          { type: 'telegram', url: 'https://t.me/Andrey_Strelt' },
        ]}
      />
    </div>
  );
};
