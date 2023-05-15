import type { RequestHandler } from 'express';

import { User } from '../API/models/User';

export const addUserDBMiddleware: RequestHandler = async (_req, res, next) => {
  try {
    if (res.locals?.user?.id) {
      try {
        const user = res.locals.user as User;
        await User.upsert(user);
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
