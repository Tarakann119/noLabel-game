export enum EnemiesList {
  GOBLIN = 'GOBLIN',
  HOBGOBLIN = 'HOBGOBLIN',
  ORC = 'ORC',
  ORC_WARRIOR = 'ORC_WARRIOR',
}

export enum TowersList {
  ARCHER = 'ARCHER',
  STONE = 'STONE',
}

export type TEnemy = keyof typeof EnemiesList;

export type TTower = keyof typeof TowersList;

export type TTowerListItem = {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  isDragging: boolean;
  imageSrc: string;
  type: TowersList;
};

export type TGameSettings = {
  tileSize: number;
  width: number;
  height: number;
  hearts: number;
  coins: number;
  waves: {
    enemies: {
      type: TEnemy;
      count: number;
      waveCount: number;
    }[];
  }[];
  towers: TTower[];
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
  maxFrames: number;
  projectile: {
    imageSrc: string;
    radius: number;
    damage: number;
  };
};

export type TUser = {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string | null;
  login: string;
  avatar: string | null;
  email: string | null;
  phone: string | null;
};

export type TLogin = {
  login: string;
  password: string;
};

export type TChangeProfile = {
  display_name: string;
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
};

export type TChangePassword = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type TSignupRequest = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
};

export type TLeaderboardResponse = {
  data: Record<'data', TLeaderboardUser>[];
  status: number;
  statusText: string;
};

export type TLeaderboardUser = {
  id: number;
  first_name: string;
  second_name: string;
  towerDefenceScore: number;
  order?: number;
  avatar?: string;
};

export type TLeaderboard = TLeaderboardUser[] | [];

export type TLeaderboardRequest = {
  score: number;
};

export type TAPIResponseError = {
  response: {
    data: {
      reason: string;
    };
    status: number;
  };
};
