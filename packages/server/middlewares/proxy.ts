import type { RequestHandler } from 'express';
import { createProxyMiddleware, responseInterceptor } from 'http-proxy-middleware';

import { User } from '../API/models/User';
import { YANDEX_API_URL } from '../config/constants';

export const proxyMiddleware: RequestHandler = (req, res, next) => {
  return createProxyMiddleware({
    logLevel: 'debug',
    changeOrigin: true,
    cookieDomainRewrite: { 'ya-praktikum.tech': req.hostname },
    selfHandleResponse: true,
    target: YANDEX_API_URL,
    onProxyRes: responseInterceptor(async (responseBuffer, proxyRes) => {
      const buffer = responseBuffer;
      if (req.url.includes('/auth/user')) {
        if (!responseBuffer || !responseBuffer.length) {
          console.log('❌  Пустой ответ от Яндекса');
          console.log(proxyRes.statusCode); // Возвращает 304, вообще не понятно почему
        }
        const response = buffer.toString();
        let user;
        try {
          user = JSON.parse(response);
        } catch (e) {
          user = null;
        }
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
