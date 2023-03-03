import { TEnemySettings, EnemyType } from '../../../typings/app.typings';

type TEnemiesSettings = {
  [key in EnemyType]: TEnemySettings;
};

export const settings: TEnemiesSettings = {
  [EnemyType.GOBLIN]: {
    width: 80,
    height: 120,
    radius: 30,
    health: 2,
    speed: 0.7,
    imageSrc: 'enemies/goblin/sprite.png',
    coins: 5,
    points: 5,
  },
  [EnemyType.HOBGOBLIN]: {
    width: 80,
    height: 120,
    radius: 30,
    health: 2,
    speed: 0.6,
    imageSrc: 'enemies/hobgoblin/sprite.png',
    coins: 10,
    points: 10,
  },

  [EnemyType.ORC]: {
    width: 100,
    height: 175,
    radius: 30,
    health: 7,
    speed: 0.5,
    imageSrc: 'enemies/orc/sprite.png',
    coins: 20,
    points: 15,
  },
};
