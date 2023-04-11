import express, { Router } from 'express';

import * as emojiController from '../controllers/emojiController';

export const emoji = Router();

emoji
  .use(express.json())
  .use(express.urlencoded({ extended: true }))

  /** Запрос на получение всех эмодзи по id сообщения */
  .get('/all/:message_id', emojiController.getAllEmojiByMessageId)

  /** Запрос на получение эмодзи по id сообщения */
  .get('/:message_id', emojiController.getAllEmojiByMessageId)

  /** Запрос на изменение эмодзи по id эмодзи */
  .post('/', emojiController.createOrUpdateEmojiByMessageId)

  /** Запрос на удаление эмодзи по id эмодзи */
  .delete('/', emojiController.deleteEmoji);
