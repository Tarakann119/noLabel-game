import { type ButtonHTMLAttributes, type MouseEventHandler, type ReactElement } from 'react';

export enum EnemiesList {
  ORC = 'ORC',
  ORC_WARRIOR = 'ORC_WARRIOR',
}

export type EnemyType = keyof typeof EnemiesList;

export enum TowersList {
  ARCHER = 'ARCHER',
  STONE = 'STONE',
  CROSSBOWMAN = 'CROSSBOWMAN',
  MAGICTOWER = 'MAGICTOWER',
}

export type TowerType = keyof typeof TowersList;

export enum GameScreens {
  MAP = 'MAP',
  GAME = 'GAME',
}

export type TGameScreens = keyof typeof GameScreens;

export type TEnemy = keyof typeof EnemiesList;

export type TTower = keyof typeof TowersList;

export type TowerListItemType = {
  x: number;
  y: number;
  width: number;
  height: number;
  fill: string;
  imageSrc: string;
};

export type TGameSettings = {
  width: number;
  height: number;
  hearts: number;
  coins: number;
  waves: {
    enemies: {
      type: EnemyType;
      count: number;
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
    damage: number;
  };
};

export type State = {
  game: GameState;
};
export type GameState = {
  points: number;
};

export type UserInfo = {
  id: number | null;
  first_name: string | null;
  second_name: string | null;
  display_name: string | null;
  login: string | null;
  avatar: string | null;
  email: string | null;
  phone: string | null;
};

export type LoginType = {
  login: string;
  password: string;
};
export type ChangeProfileType = {
  first_name: string;
  second_name: string;
  login: string;
  email: string;
  phone: string;
};

export type ChangePasswordType = {
  oldPassword: string;
  newPassword: string;
  confirmPassword: string;
};

export type ProfileType = {
  first_name: string;
  second_name: string;
  login: string;
  password: string;
  confirmPassword: string;
};

export type LeaderboardResponse = {
  data: Record<'data', LeaderboardUserType>[];
  status: number;
  statusText: string;
};

export type LeaderboardUserType = {
  id: number;
  first_name: string;
  second_name: string;
  towerDefenceScore: number;
  order?: number;
  avatar?: string;
};

export type LeaderboardType = LeaderboardUserType[] | [];

export type pushLeaderboardRequest = {
  score: number;
};

export type APIResponseError = {
  response: {
    data: {
      reason: string;
    };
    status: number;
  };
};

export enum GameButtons {
  PAUSE = 'pause',
  QUICK = 'quick',
  SOUND = 'sound',
  FULLSCREEN = 'fullscreen',
}

export type ForumTopicType = {
  id: number | string | undefined;
  title: string;
  author_id: number;
  created_at: string;
  updated_at: string;
  author: {
    id: number;
    first_name: string;
    second_name: string;
    login: string;
    email: string;
    phone: string;
    avatar: string;
    created_at: string;
    updated_at: string;
  };
  last_message: {
    id: number;
    text: string;
    topic_id: number;
    author_id: number;
    created_at: string;
    updated_at: string;
  };
};

export type ForumMessageType = {
  id: number;
  text: string;
  author_id: number;
  topic_id: number;
  updated_at: string;
  created_at: string;
};

export type EmojiType = {
  id?: number;
  emoji?: string;
  counter?: number;
};

export type ForumThemeType = {
  title?: string;
  author: {
    avatar: string;
    first_name: string;
    id: number;
    second_name: string;
  };
  created_at: string;
  emojis: EmojiType[];
  id: number;
  text: string;
  updated_at: string;
};

export type DropdownMenuItems = {
  title: string;
  onClick: MouseEventHandler<HTMLButtonElement>;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export type DropdownProps = {
  className?: string;
  trigger: ReactElement;
  emoteClass?: string;
  menuItems: DropdownMenuItems[];
};
