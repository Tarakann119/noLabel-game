import { TBuildingSettings, TowerType } from '../../../typings/app.typings';

type TBuldingsSettings = {
  [key in TowerType]: TBuildingSettings;
};

export const settings: TBuldingsSettings = {
  [TowerType.ARCHER]: {
    radius: 250,
    delay: 6,
    imageSrc: 'towers/archer/sprite.png',
    cost: 25,
    projectile: {
      damage: 1,
      radius: 3,
      imageSrc: 'towers/archer/projectile/sprite.png',
    },
  },
  [TowerType.STONE]: {
    radius: 150,
    delay: 10,
    cost: 40,
    imageSrc: 'towers/stone/sprite.png',
    projectile: {
      imageSrc: 'towers/stone/projectile/sprite.png',
      radius: 8,
      damage: 2,
    },
  },
};
