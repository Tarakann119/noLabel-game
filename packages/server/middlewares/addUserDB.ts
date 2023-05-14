import type { RequestHandler } from 'express';

import { User } from '../API/models/User';

export const addUserDBMiddleware: RequestHandler = async (_req, res, next) => {
  try {
    const user = res.locals.user;
    if (user.id) {
      try {
        await User.upsert({
          id: user.id,
          first_name: user.first_name,
          second_name: user.second_name,
          login: user.login,
          email: user.email,
          phone: user.phone,
          avatar: user.avatar,
        } as User);
        console.log('➕  Данные пользователя обновлены или добавлены в БД');
      } catch (error) {
        console.log('❌  Ошибка добавления пользователя в БД');
      }
    }
    next();
  } catch (error) {
    console.log('❌  Ошибка запроса данных пользователя с сервера Яндекс.Практикума');
    next();
  }
};
