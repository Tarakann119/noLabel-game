import express, { Router } from 'express';

import { addUserDBMiddleware } from '../../middlewares/addUserDB';
import { checkAuthMiddleware } from '../../middlewares/checkAuth';
import * as forumTopicController from '../controllers/forumTopicController';

export const forumTopic = Router();

forumTopic
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(checkAuthMiddleware)

  /** получение всех тем форума */
  .get('/all', forumTopicController.getAllForumTopic)

  /** получение темы форума по id темы */
  .get('/:topic_id', forumTopicController.getForumTopic)

  /** создание или обновление темы форума */
  .post('/', addUserDBMiddleware, forumTopicController.createOrUpdateForumTopic)

  /** удаление темы форума по id темы */
  .delete('/:topic_id', forumTopicController.deleteForumTopic);
