import type { RequestHandler } from 'express';

export const checkAuthMiddleware: RequestHandler = async (req, res, next) => {
  console.log('🔐  Проверка авторизации');
  try {
    await fetch('https://ya-praktikum.tech/api/v2/auth/user', {
      method: 'GET',
      headers: {
        Cookie: req.headers.cookie || '',
      },
    }).then(async (response) => {
      if (response.status === 200) {
        console.log('✅  Пользователь авторизован');
        next();
      } else {
        console.log('❌  Пользователь не авторизован');
        res.redirect('/login');
      }
    });
  } catch (error) {
    console.log('❌  Ошибка проверки авторизации');
    res.redirect('/login');
  }
};
