import type { RequestHandler } from 'express';
import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware';

import { User } from '../API/models/User';
import { YANDEX_API_URL } from '../config/constants';

export const proxyMiddleware: RequestHandler = (req, res, next) => {
  console.log(`🔥  Проксируем запрос ${req.url}`);
  return createProxyMiddleware({
    changeOrigin: true,
    cookieDomainRewrite: { '*': '' },
    selfHandleResponse: true,
    target: YANDEX_API_URL,
    onProxyRes: responseInterceptor(async (buffer) => {
      if (req.url.includes('/auth/user') && req.method === 'GET') {
        console.log(`🔥  Получен ответ от ${req.url}`);
        const response = buffer.toString();
        let user;
        try {
          user = JSON.parse(response);
        } catch (e) {
          user = null;
        }
        console.log(`🔥  ${user}`);
        if (user && user.id) {
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
            console.log(`✅  Пользователь ${user.login} добавлен в БД`);
          } catch (e) {
            console.error(e);
          }
        }
      }
      return buffer;
    }),
  })(req, res, next);
};
