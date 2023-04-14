import { useSelector } from 'react-redux';
import { Button } from '@components/Button';
import { Rating } from '@components/Leaderboard';
import { Title } from '@components/Title';
import { getLeaderboard } from '@store/selectors';

import './index.scss';

export const StartScreen = () => {
  const leaderboard = useSelector(getLeaderboard);

  return (
    <main className='start-screen'>
      <div className='start-screen__face bg-image_hero container'>
        <Button view='primary' className='start-screen__button'>
          Играть
        </Button>
      </div>

      <div className='start-screen__content main-bg container'>
        <Title className='start-screen__title' level='1'>
          Об игре
        </Title>

        <div className='start-screen__block'>
          <div className='start-screen__description'>
            <div className='start-screen__block start-screen__block_reverse'>
              <div className='start-screen__text-group'>
                <Title level='2'>Заголовок</Title>
                <p className='start-screen__text'>
                  Далеко-далеко за словесными горами в стране гласных, и согласных живут рыбные
                  тексты. Взобравшись что ты раз назад безопасную, на берегу не своего буквенных
                  осталось силуэт пустился рекламных себя большой свой всемогущая, над власти, его
                  имени одна свое алфавит пояс щеке снова домах? Точках, свой парадигматическая если
                  несколько лучше что использовало моей предупреждал раз, рыбного подпоясал! Домах
                  назад имеет даже пустился рот страну языкового грустный решила до вдали, толку
                  залетают взгляд речью правилами пояс?
                </p>
              </div>
              <picture className='start-screen__picture'>
                <img src='img/main/main-1.jpg' alt='' />
              </picture>
            </div>

            <div className='start-screen__block '>
              <div className='start-screen__text-group'>
                <Title level='2'>Заголовок</Title>
                <div className='start-screen__text'>
                  Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные
                  тексты. Переписывается маленький живет свой о, щеке несколько власти всемогущая
                  ему возвращайся сбить свою дал, оксмокс, ты однажды сих пор! О, прямо! Бросил
                  возвращайся щеке сих образ необходимыми языком назад безорфографичный семь до
                  ручеек но реторический ведущими имени пор, которое вершину.
                </div>
              </div>
              <picture className='start-screen__picture'>
                <img src='img/main/main-2.jpg' alt='' />
              </picture>
            </div>

            <div className='start-screen__block start-screen__block_full'>
              <div className='start-screen__text-group'>
                <Title level='2'>Заголовок</Title>
                <p className='start-screen__text'>
                  Далеко-далеко за словесными горами в стране гласных и согласных живут рыбные
                  тексты. Великий пунктуация языкового текст обеспечивает, переписали пор родного
                  путь жизни коварный злых которой грамматики предупреждал рекламных снова последний
                  послушавшись. Агентство все грустный которое свою всемогущая использовало, жизни,
                  семь продолжил журчит предложения свой алфавит. Власти образ последний языком
                  решила заглавных лучше.
                </p>
              </div>
              <picture className='start-screen__picture'>
                <img src='/img/main/main-3.jpg' alt='' />
              </picture>
            </div>
          </div>

          {leaderboard.length > 0 && (
            <aside className='start-screen__aside'>
              <Title level='2'>Топ игроков</Title>

              <Rating />
            </aside>
          )}
        </div>
      </div>
    </main>
  );
};
