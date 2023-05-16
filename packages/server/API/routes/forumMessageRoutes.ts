import express from 'express';

import { addUserDBMiddleware } from '../../middlewares/addUserDB';
import { checkAuthMiddleware } from '../../middlewares/checkAuth';
import * as forumMessageController from '../controllers/forumMessageController';

export const forumMessage = express.Router();

forumMessage
  .use(express.urlencoded({ extended: true }))
  .use(express.json())
  .use(checkAuthMiddleware)

  /** получение всех сообщений форума для тестирования, в продакшене вряд-ли будет полезен */
  .get('/all', forumMessageController.getAllForumMessage)

  /** получение сообщения форума по id сообщения */
  .get('/:message_id', forumMessageController.getForumMessageById)

  /** получение всех сообщений форума по id темы */
  .get('/topic/:topic_id', forumMessageController.getForumMessageByTopicId)

  /** создание или обновление сообщения форума */
  .post('/', addUserDBMiddleware, forumMessageController.createOrUpdateForumMessage)

  /** удаление сообщения форума по id */
  .delete('/:message_id', forumMessageController.deleteForumMessageById)

  /** удаление всех сообщений форума по id темы */
  .delete('/topic/:topic_id', forumMessageController.deleteForumMessageByTopicId);
