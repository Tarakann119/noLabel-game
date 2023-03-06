export enum EnemyType {
  GOBLIN,
  HOBGOBLIN,
  ORC,
  ORC_WARRIOR,
}

export enum TowerType {
  ARCHER,
  STONE,
}

export type TGameSettings = {
  tileSize: number;
  width: number;
  height: number;
  hearts: number;
  coins: number;
  waves: {
    enemies: {
      type: EnemyType;
      count: number;
      waveCount: number;
    }[];
  }[];
  towers: TowerType[];
  placementTiles: number[];
  waypoints: {
    x: number;
    y: number;
  }[];
};

export type TEnemySettings = {
  width: number;
  height: number;
  radius: number;
  health: number;
  speed: number;
  imageSrc: string;
  coins: number;
  points: number;
};

export type TBuildingSettings = {
  radius: number;
  delay: number;
  imageSrc: string;
  cost: number;
  projectile: {
    imageSrc: string;
    radius: number;
    damage: number;
  };
};
