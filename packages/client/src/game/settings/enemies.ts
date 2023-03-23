import { EnemiesList, TEnemySettings } from '@typings/app.typings';

type TEnemiesSettings = {
  [key in EnemiesList]: TEnemySettings;
};

export const settings: TEnemiesSettings = {
  [EnemiesList.GOBLIN]: {
    width: 80,
    height: 120,
    radius: 30,
    health: 3,
    speed: 1,
    imageSrc: 'enemies/goblin/sprite.png',
    coins: 5,
    points: 5,
  },
  [EnemiesList.HOBGOBLIN]: {
    width: 80,
    height: 120,
    radius: 30,
    health: 5,
    speed: 1,
    imageSrc: 'enemies/hobgoblin/sprite.png',
    coins: 10,
    points: 10,
  },
  [EnemiesList.ORC]: {
    width: 100,
    height: 175,
    radius: 30,
    health: 7,
    speed: 1,
    imageSrc: 'enemies/orc/sprite.png',
    coins: 20,
    points: 15,
  },
  [EnemiesList.ORC_WARRIOR]: {
    width: 100,
    height: 175,
    radius: 30,
    health: 10,
    speed: 0.5,
    imageSrc: 'enemies/orc-warrior/sprite.png',
    coins: 20,
    points: 15,
  },
};
