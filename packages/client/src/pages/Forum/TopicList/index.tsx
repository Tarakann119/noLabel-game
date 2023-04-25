import { Link } from '@/components/Link';

import './index.scss';

export function TopicsList() {
  const topisDataArray = [
    { href: '/forum/1', text: 'Моя тактика' },
    { href: '/forum/2', text: 'Не получается пройти уровень' },
    { href: '/forum/3', text: 'Дружелюбное комьюнити миф?' },
    {
      href: '/forum/4',
      text: 'Опыт какой игры поможет при прохождении NarutoRunner',
    },
    { href: '/forum/5', text: 'Моя тактика' },
    { href: '/forum/6', text: 'Не получается пройти уровень' },
    { href: '/forum/7', text: 'Дружелюбное комьюнити миф?' },
    {
      href: '/forum/8',
      text: 'Опыт какой игры поможет при прохождении NarutoRunner',
    },
    { href: '/forum/9', text: 'Моя тактика' },
    { href: '/forum/10', text: 'Не получается пройти уровень' },
    { href: '/forum/11', text: 'Дружелюбное комьюнити миф?' },
    {
      href: '/forum/12',
      text: 'Опыт какой игры поможет при прохождении NarutoRunner',
    },
    { href: '/forum/91', text: 'Моя тактика' },
    { href: '/forum/101', text: 'Не получается пройти уровень' },
    { href: '/forum/111', text: 'Дружелюбное комьюнити миф?' },
    {
      href: '/forum/121',
      text: 'Опыт какой игры поможет при прохождении NarutoRunner',
    },
  ];
  return (
    <ul className='topics-list'>
      {topisDataArray.map((data) => (
        <li className='topics-list__item' key={data.href}>
          <Link {...data} view='ghost' />
        </li>
      ))}
    </ul>
  );
}
