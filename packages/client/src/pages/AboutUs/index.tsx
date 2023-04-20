import { AuthorItem } from '@/components/AuthorItem';
import { Title } from '@/components/Title';

import './index.scss';

export const AboutUs = () => {
  return (
    <main className='container about main main-h main-bg bg-image_base'>
      <Title level='1' className='about__title'>
        Наша команда
      </Title>

      <div className='about__links'>
        <AuthorItem
          className='about__item'
          img='/img/about/arkadiy.png'
          name='Аркадий Самохвалов'
          links={[
            { type: 'github', url: 'https://github.com/ArkadiySamokhvalov' },
            { type: 'telegram', url: 'https://t.me/ArkadySamokhvalov' },
          ]}
        />
        <AuthorItem
          className='about__item'
          img='/img/about/tatyana.png'
          name='Татьяна'
          links={[
            { type: 'github', url: 'https://github.com/tmj1' },
            { type: 'telegram', url: 'https://t.me/tomr753' },
          ]}
        />
        <AuthorItem
          className='about__item'
          img='/img/about/tamerlan.png'
          name='Тамерлан'
          links={[
            { type: 'github', url: 'https://github.com/tamerlan2451' },
            { type: 'telegram', url: 'https://t.me/Tamerlan2451' },
          ]}
        />
        <AuthorItem
          className='about__item'
          img='/img/about/dmitriy.png'
          name='Дмитрий Циммер'
          links={[
            { type: 'github', url: 'https://github.com/Zimer-D' },
            { type: 'telegram', url: 'https://t.me/Tarakann' },
          ]}
        />
        <AuthorItem
          className='about__item'
          img='/img/about/andrey.png'
          name='Андрей Стрельцов'
          links={[
            { type: 'github', url: 'https://github.com/Antidods' },
            { type: 'telegram', url: 'https://t.me/Andrey_Strelt' },
          ]}
        />
      </div>
    </main>
  );
};
