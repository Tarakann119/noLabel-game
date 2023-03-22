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
