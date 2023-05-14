import express, { Router } from 'express';

import { checkAuthMiddleware } from '../../middlewares/checkAuth';
import * as leaderboardController from '../controllers/leaderboardController';

export const leaderboard = Router();

leaderboard
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use('/', checkAuthMiddleware)

  /** Запрос на получение таблицы лидеров */
  .get('/all', leaderboardController.getLeaderboard)

  /** Запрос на очков получение пользователя из таблицы лидеров по id пользователя */
  .get('/:user_id', leaderboardController.getLeaderboardByUserId)

  /** Запрос на добавление или изменение очков пользователя в таблице лидеров */
  .post('/', leaderboardController.createOrUpdateLeaderboard);
