import { TGameSettings } from '@typings/app.typings';

export type TGameScreen = {
  className?: string;
};

export type TGameMap = {
  mapName: string;
  mapSettings: TGameSettings;
};
