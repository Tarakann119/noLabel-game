import type { Request, Response } from 'express';

import { Emoji } from '../models/Emoji';
import { ForumMessage } from '../models/ForumMessage';
import { User } from '../models/User';

/**
 * Получение эмодзи по id сообщения
 * @param req {params {message_id: number}} - id сообщения, эмодзи которого нужно получить
 * @param res {Emoji[]} - массив эмодзи или сообщение об ошибке
 */
export const getAllEmojiByMessageId = async (req: Request, res: Response) => {
  try {
    const emoji = await Emoji.findAll({
      where: {
        message_id: req.params.message_id,
      },
      include: [
        {
          model: User,
          attributes: ['user_id', 'first_name', 'second_name', 'avatar'],
        },
      ],
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

/**
 * Создание или обновление эмодзи по id сообщения и id автора
 * @param req {Emoji} - эмодзи, которую нужно создать или обновить
 * @param res {Emoji} - созданная или обновленная эмодзи, или сообщение об ошибке
 */
export const createOrUpdateEmoji = async (req: Request, res: Response) => {
  try {
    const message = await ForumMessage.findByPk(req.body.message_id);
    const user = await User.findByPk(req.body.author);
    if (message && user) {
      let emoji = await Emoji.findOne({
        where: {
          message_id: req.body.message_id,
          author: req.body.author,
        },
      });
      if (emoji) {
        await Emoji.update(req.body, {
          where: {
            message_id: req.body.message_id,
            author: req.body.author,
          },
        });
      } else {
        emoji = await Emoji.create(req.body);
      }
      emoji = await Emoji.findByPk(emoji.id, {
        include: [
          {
            model: User,
            attributes: ['user_id', 'first_name', 'second_name', 'avatar'],
          },
          {
            model: ForumMessage,
          },
        ],
      });
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

/**
 * Удаление эмодзи по id сообщения и id автора
 * @param req {body {message_id: number, user_id: number}} - id сообщения и id автора, эмодзи которого нужно удалить
 * @param res {message: string} - сообщение об успешном удалении эмодзи, или сообщение об ошибке
 * */
export const deleteEmoji = async (req: Request, res: Response) => {
  try {
    const emoji = await Emoji.findOne({
      where: {
        message_id: req.body.message_id,
        author: req.body.user_id,
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

/**
 * Удаление эмодзи по id
 * @param req {params {id: number}} - id эмодзи, которую нужно удалить
 * @param res {message: string} - сообщение об успешном удалении эмодзи, или сообщение об ошибке
 */
export const deleteEmojiById = async (req: Request, res: Response) => {
  try {
    const emoji = await Emoji.findByPk(req.params.id);
    if (emoji) {
      await Emoji.destroy({ where: { id: emoji.id } });
      res.status(200).json({ message: `Эмодзи c id:${emoji.id} удалено` });
    } else {
      res.status(400).json({ message: `Эмодзи c id:${req.params.id} не найдено` });
    }
  } catch (e) {
    res.status(400).json(e);
  }
};

/** Удаление всех эмодзи по id сообщения
 * ВНИМАНИЕ! Функция для использования в других контроллерах
 * @param message_id {number} - id сообщения, эмодзи которого нужно удалить
 * */
export const deleteAllEmojiByMessageId = async (message_id: number) => {
  try {
    await Emoji.destroy({ where: { message_id } });
  } catch (e) {
    console.log(e);
  }
};
