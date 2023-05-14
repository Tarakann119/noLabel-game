import type { RequestHandler } from 'express';

import { User } from '../API/models/User';

export const addUserDBMiddleware: RequestHandler = async (req, _res, next) => {
  try {
    await fetch('https://ya-praktikum.tech/api/v2/auth/user', {
      method: 'GET',
      headers: {
        Cookie: req.headers.cookie || '',
      },
    }).then(async (response) => {
      if (response.status === 200) {
        try {
          const data = await response.json();
          await User.upsert({
            id: data.id,
            first_name: data.first_name,
            second_name: data.second_name,
            login: data.login,
            email: data.email,
            phone: data.phone,
            avatar: data.avatar,
          } as User);
          console.log('✅  Пользователь добавлен в БД');
        } catch (error) {
          console.log('❌  Ошибка добавления пользователя в БД');
        }
      }
      next();
    });
  } catch (error) {
    console.log('❌  Ошибка запроса данных пользователя с сервера Яндекс.Практикума');
  }
};
