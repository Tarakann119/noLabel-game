import dotenv from 'dotenv';
import express from 'express';
import helmet from 'helmet';

import { emoji } from './API/routes/emojiRoutes';
import { forumMessage } from './API/routes/forumMessageRoutes';
import { forumTopic } from './API/routes/forumTopicRoutes';
import { leaderboard } from './API/routes/leaderboardRoutes';
import { themes } from './API/routes/themeRoutes';
import { users } from './API/routes/userRoutes';
import { LOCAL_API_URL } from './config/constants';
import { proxyMiddleware } from './middlewares/proxy';
import { initPostgreSQLConnection } from './db';

dotenv.config();

// Инициализация соединения с БД
initPostgreSQLConnection();

// Создание сервера
const app = express();

const port = process.env.SERVER_PORT || 3001;

// Установка заголовков
app
  .use(
    helmet({
      crossOriginResourcePolicy: { policy: 'cross-origin' },
    })
  )
  .use(function (_req, res, next) {
    res.header('Access-Control-Allow-Origin', LOCAL_API_URL);
    res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept');
    next();
  });

// Подключение роутов
app.use('/api/user', users);
app.use('/api/theme', themes);
app.use('/api/forum/topics', forumTopic);
app.use('/api/forum/messages', forumMessage);
app.use('/api/forum/emoji', emoji);
app.use('/api/leaderboard', leaderboard);

// Middleware
app.use('/', proxyMiddleware);

// Запуск сервера
try {
  app.listen(port, () => {
    console.log(`✅  Сервер запущен на порту ${port}`);
  });
} catch (e) {
  console.error('❌  Не удалось запустить сервер');
  console.error(e);
}
