import AuthorItem from '@ui/AuthorItem';

import { Title } from '@/components/Title';

import './index.scss';

export const AboutUs = () => {
  return (
    <main className='container main main-h main-bg bg-image_about'>
      <Title level='1' className='about__title'>
        Наша команда
      </Title>
      <div className='about__container_link'>
        <AuthorItem
          title='Аркадий Самохвалов'
          link={[
            { type: 'github', url: 'https://github.com/ArkadiySamokhvalov' },
            { type: 'telegram', url: 'https://t.me/ArkadySamokhvalov' },
          ]}
        />
        <AuthorItem
          title='Дмитрий Циммер'
          link={[
            { type: 'github', url: 'https://github.com/Zimer-D' },
            { type: 'telegram', url: 'https://t.me/Tarakann' },
          ]}
        />
        <AuthorItem
          title='Татьяна'
          link={[
            { type: 'github', url: 'https://github.com/tmj1' },
            { type: 'telegram', url: 'https://t.me/tomr753' },
          ]}
        />
        <AuthorItem
          title='Андрей Стрельцов'
          link={[
            { type: 'github', url: 'https://github.com/Antidods' },
            { type: 'telegram', url: 'https://t.me/Andrey_Strelt' },
          ]}
        />
        <AuthorItem
          title='Тамерлан'
          link={[
            { type: 'github', url: 'https://github.com/tamerlan2451' },
            { type: 'telegram', url: 'https://t.me/Tamerlan2451' },
          ]}
        />
      </div>
    </main>
  );
};
