import { UserInfo } from '@typings/app.typings';

export interface User {
  id: number;
  first_name: string;
  second_name: string;
  display_name: string;
  login: string;
  avatar: string | null;
  email: string;
  phone: string | null;
}

export type TUserRepository = {
  getCurrent(): Promise<UserInfo>;
};

export type TUserService = {
  getCurrentUser(): Promise<User>;
};
