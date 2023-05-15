import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

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
          attributes: ['id', 'first_name', 'second_name', 'avatar'],
        },
      ],
    });
    if (emoji) {
      res.status(StatusCodes.OK).json(emoji);
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ reason: `Сообщение c id:${req.params.message_id} не найдено` });
    }
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json(e);
  }
};

/**
 * Создание или обновление эмодзи по id сообщения и id автора
 * @param req {Emoji} - эмодзи, которую нужно создать или обновить
 * @param res {Emoji} - созданная или обновленная эмодзи, или сообщение об ошибке
 */
export const createOrUpdateEmoji = async (req: Request, res: Response) => {
  try {
    if (res.locals?.user?.id !== req.body.author_id) {
      res.status(StatusCodes.BAD_REQUEST).json({ reason: 'Некорректный запрос' });
      return;
    }
    const message = await ForumMessage.findByPk(req.body.message_id);
    const user = res.locals.user as User;
    if (message && user) {
      let emoji = await Emoji.findOne({
        where: {
          ['message_id']: req.body.message_id,
          ['author_id']: req.body.author_id,
        },
      });
      if (emoji) {
        await Emoji.update(req.body, {
          where: {
            ['message_id']: req.body.message_id,
            ['author_id']: req.body.author_id,
          },
        });
      } else {
        emoji = await Emoji.create(req.body);
      }
      emoji = await Emoji.findByPk(emoji.id, {
        include: [
          {
            model: User,
            attributes: ['id', 'first_name', 'second_name', 'avatar'],
          },
          {
            model: ForumMessage,
          },
        ],
      });
      res.status(StatusCodes.CREATED).json(emoji);
    } else if (!message) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ reason: `Сообщение c id:${req.body.message_id} не найдено` });
    } else if (!user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ reason: `Пользователь c id:${req.body.author_id} не найден` });
    }
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json(e);
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
        author_id: req.body.user_id,
      },
    });
    if (emoji) {
      await Emoji.destroy({ where: { id: emoji.id } });
      res.status(StatusCodes.OK).json({ message: `Эмодзи c id:${emoji.id} удалено` });
    } else {
      res.status(StatusCodes.BAD_REQUEST).json({
        message: `Эмодзи для сообщения с id:${req.body.message_id} и пользователя с id:${req.body.user_id} не найдено`,
      });
    }
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json(e);
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
      res.status(StatusCodes.OK).json({ reason: `Эмодзи c id:${emoji.id} удалено` });
    } else {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ reason: `Эмодзи c id:${req.params.id} не найдено` });
    }
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json(e);
  }
};
