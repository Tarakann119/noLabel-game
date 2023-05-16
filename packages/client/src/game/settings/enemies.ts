import { EnemiesList, TEnemySettings } from '@typings/app.typings';

type TEnemiesSettings = {
  [key in EnemiesList]: TEnemySettings;
};

export const settings: TEnemiesSettings = {
  [EnemiesList.ORC]: {
    health: 4,
    speed: 1,
    imageSrc: 'enemies/orc/sprite.png',
    coins: 2,
    points: 5,
  },
  [EnemiesList.ORC_WARRIOR]: {
    health: 6,
    speed: 0.8,
    imageSrc: 'enemies/orc-warrior/sprite.png',
    coins: 3,
    points: 10,
  },
};
