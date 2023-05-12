import { TBuildingSettings, TowersList } from '@typings/app.typings';

type TBuldingsSettings = {
  [key in TowersList]: TBuildingSettings;
};

export const settings: TBuldingsSettings = {
  [TowersList.ARCHER]: {
    radius: 250,
    // задержка при стрельбе, чем выше, тем медленнее стреляет
    delay: 6,
    imageSrc: 'towers/archer/sprite.png',
    cost: 25,
    maxFrames: 13,
    projectile: {
      damage: 1,
      radius: 3,
      imageSrc: 'towers/archer/projectile/sprite.png',
    },
  },
  [TowersList.MAGICTOWER]: {
    radius: 150,
    // задержка при стрельбе, чем выше, тем медленнее стреляет
    delay: 4,
    imageSrc: 'towers/magicTower/sprite.png',
    cost: 25,
    maxFrames: 13,
    projectile: {
      damage: 6,
      radius: 3,
      imageSrc: 'towers/magicTower/projectile/sprite.png',
    },
  },
  [TowersList.CROSSBOWMAN]: {
    radius: 300,
    // задержка при стрельбе, чем выше, тем медленнее стреляет
    delay: 8,
    imageSrc: 'towers/crossbowman/sprite.png',
    cost: 25,
    maxFrames: 13,
    projectile: {
      damage: 3,
      radius: 3,
      imageSrc: 'towers/archer/projectile/sprite.png',
    },
  },
  [TowersList.STONE]: {
    radius: 150,
    delay: 10,
    cost: 40,
    imageSrc: 'towers/stone/sprite.png',
    maxFrames: 19,
    projectile: {
      imageSrc: 'towers/stone/projectile/sprite.png',
      radius: 8,
      damage: 2,
    },
  },
};
