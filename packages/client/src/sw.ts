/// <reference lib="WebWorker" />
import { CacheableResponsePlugin } from 'workbox-cacheable-response';
import { ExpirationPlugin } from 'workbox-expiration';
import { cleanupOutdatedCaches, precacheAndRoute } from 'workbox-precaching';
import { registerRoute } from 'workbox-routing';
import { CacheFirst, NetworkFirst, StaleWhileRevalidate } from 'workbox-strategies';

declare let self: ServiceWorkerGlobalScope;

cleanupOutdatedCaches();

precacheAndRoute(self.__WB_MANIFEST);

// Кешируем страницы (`HTML`) с помощью стратегии `Network First` (сначала сеть)
registerRoute(
  // проверяем, что запрос - это переход на новую страницу
  ({ request }) => request.mode === 'navigate',
  new NetworkFirst({
    // помещаем все файлы в кеш с названием 'pages'
    cacheName: 'pages',
    plugins: [
      // кешируем только результаты со статусом 200
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  })
);

// Кешируем запросы на получение `CSS`, `JS` и веб-воркеров с помощью стратегии `Stale While Revalidate` (считается устаревшим после запроса)
registerRoute(
  // проверяем, что цель запроса - это таблица стилей, скрипт или воркер
  ({ request }) =>
    request.destination === 'style' ||
    request.destination === 'script' ||
    request.destination === 'worker',
  new StaleWhileRevalidate({
    // помещаем файлы в кеш с названием 'assets'
    cacheName: 'assets',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
    ],
  })
);

// Кешируем  с помощью стратегии `Cache First` (сначала кеш)
registerRoute(
  // проверяем, что цель запроса - изображение
  ({ request }) => request.destination === 'image',
  new CacheFirst({
    // помещаем файлы в кеш с названием 'images'
    cacheName: 'images',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      // кешируем до 50 изображений в течение 30 дней
      new ExpirationPlugin({
        // Максимальное количество записей в кеше (сохраняемых файлов)
        maxEntries: 50,
        // Срок хранения файлов в кеше
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);

// Кешируем шрифты с помощью стратегии `Cache First` (сначала кеш)
registerRoute(
  // проверяем, что цель запроса - шрифт
  ({ request }) => request.destination === 'font',
  new CacheFirst({
    // помещаем файлы в кеш с названием 'fonts'
    cacheName: 'fonts',
    plugins: [
      new CacheableResponsePlugin({
        statuses: [200],
      }),
      new ExpirationPlugin({
        maxEntries: 10,
        // Срок хранения файлов в кеше
        maxAgeSeconds: 30 * 24 * 60 * 60,
      }),
    ],
  })
);
