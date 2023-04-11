import type { Request, Response } from 'express';

import { Emoji } from '../models/Emoji';
import { ForumMessage } from '../models/ForumMessage';
import { User } from '../models/User';

/** Получение эмодзи по id сообщения */
export const getAllEmojiByMessageId = async (req: Request, res: Response) => {
  try {
    const emoji = await Emoji.findAll({
      where: {
        message_id: req.params.message_id,
      },
    });
    if (emoji) {
      res.status(200).json(emoji);
    } else {
      res.status(400).json({ message: `Сообщение c id:${req.params.message_id} не найдено` });
    }
  } catch (e) {
    res.status(400).json(e);
  }
};

/** Создание или обновление эмодзи по id сообщения и id автора */
export const createOrUpdateEmojiByMessageId = async (req: Request, res: Response) => {
  try {
    const message = await ForumMessage.findByPk(req.body.message_id);
    const user = await User.findByPk(req.body.user_id);
    if (message && user) {
      let emoji = await Emoji.findOne({
        where: {
          message_id: req.body.message_id,
          user_id: req.body.user_id,
        },
      });
      if (emoji) {
        await Emoji.update(req.body, {
          where: {
            message_id: req.body.message_id,
            user_id: req.body.user_id,
          },
        });
      } else {
        emoji = await Emoji.create(req.body);
      }
      res.status(201).json(emoji);
    } else if (!message) {
      res.status(400).json({ message: `Сообщение c id:${req.body.message_id} не найдено` });
    } else if (!user) {
      res.status(400).json({ message: `Пользователь c id:${req.body.user_id} не найден` });
    }
  } catch (e) {
    res.status(400).json(e);
  }
};

/** Удаление эмодзи по id сообщения и id автора */
export const deleteEmoji = async (req: Request, res: Response) => {
  try {
    const emoji = await Emoji.findOne({
      where: {
        message_id: req.body.message_id,
        user_id: req.body.user_id,
      },
    });
    if (emoji) {
      await Emoji.destroy({ where: { id: emoji.id } });
      res.status(200).json({ message: `Эмодзи c id:${emoji.id} удалено` });
    } else {
      res.status(400).json({
        message: `Эмодзи для сообщения с id:${req.body.message_id} и пользователя с id:${req.body.user_id} не найдено`,
      });
    }
  } catch (e) {
    res.status(400).json(e);
  }
};

/** Удаление всех эмодзи по id сообщения
 * ВНИМАНИЕ! Функция для использования в других контроллерах
 * */
export const deleteAllEmojiByMessageId = async (message_id: number) => {
  try {
    await Emoji.destroy({ where: { message_id } });
  } catch (e) {
    console.log(e);
  }
};
