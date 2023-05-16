import { createProxyMiddleware } from 'http-proxy-middleware';

import { YANDEX_API_URL } from '../config/constants';

export const proxyMiddleware = createProxyMiddleware({
  logLevel: 'error',
  changeOrigin: true,
  cookieDomainRewrite: { '*': '' },
  target: YANDEX_API_URL,
});
