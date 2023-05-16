import express, { Router } from 'express';

import { checkAuthMiddleware } from '../../middlewares/checkAuth';
import * as emojiController from '../controllers/emojiController';

export const emoji = Router();

emoji
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/', checkAuthMiddleware)

  /** Запрос на получение всех эмодзи по id сообщения */
  .get('/all/:message_id', emojiController.getAllEmojiByMessageId)

  /** Запрос на получение эмодзи по id сообщения */
  .get('/:message_id', emojiController.getAllEmojiByMessageId)

  /** Запрос на изменение эмодзи по id эмодзи */
  .post('/', emojiController.createOrUpdateEmoji)

  /** Запрос на удаление эмодзи по id сообщения и id автора */
  .delete('/', emojiController.deleteEmoji)

  /** Запрос на удаление эмодзи по id эмодзи */
  .delete('/id/:id', emojiController.deleteEmojiById);
