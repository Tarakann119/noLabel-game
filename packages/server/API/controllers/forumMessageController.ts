import type { Request, Response } from 'express';

import { Emoji } from '../models/Emoji';
import { ForumMessage } from '../models/ForumMessage';
import { ForumTopic } from '../models/ForumTopic';
import { User } from '../models/User';

import { deleteAllEmojiByMessageId } from './emojiController';

/**
 * Получение сообщения форума по id сообщения
 * @param req {params: {message_id: number}} - id сообщения, данные которого нужно получить
 * @param res {ForumMessage} - сообщение форума или сообщение об ошибке
 */
export const getForumMessageById = async (req: Request, res: Response) => {
  try {
    const forumMessage = await ForumMessage.findByPk(req.params.message_id, {
      include: [
        {
          model: User,
          attributes: ['user_id', 'first_name', 'second_name', 'avatar'],
        },
        {
          model: Emoji,
          attributes: ['id', 'emoji', 'author'],
        },
      ],
    });
    if (forumMessage) {
      res.status(200).json(forumMessage);
    } else {
      res.status(404).json({ message: 'Сообщение не найдено' });
    }
  } catch (e) {
    res.status(400).json(e);
  }
};

// ----------------------------
/**
 * Получение сообщений форума по id темы
 * @param req {params: {topic_id: number}} - id темы, данные которой нужно получить
 * @param res {ForumMessage[]} - массив сообщений форума или сообщение об ошибке
 */

export const getForumMessageByTopicId = async (req: Request, res: Response) => {
  try {
    const forumMessages = await ForumMessage.findAll({
      where: {
        topic_id: req.params.topic_id,
      },
      include: [
        {
          model: User,
          attributes: ['user_id', 'first_name', 'second_name', 'avatar'],
        },
        {
          model: Emoji,
          attributes: ['id', 'emoji', 'author'],
        },
      ],
    });
    if (forumMessages) {
      res.status(200).json(forumMessages);
    } else {
      res.status(404).json({ message: 'Сообщения не найдены' });
    }
  } catch (e) {
    res.status(400).json(e);
  }
};

/**
 * Получение всех сообщений форума, в продакшене вряд ли будет полезен
 * @param _req
 * @param res {ForumMessage[]} - массив сообщений форума или сообщение об ошибке
 */
export const getAllForumMessage = async (_req: Request, res: Response) => {
  try {
    const forumMessages: ForumMessage[] = await ForumMessage.findAll({
      include: [{ model: User }, { model: ForumTopic }, { model: Emoji }],
    });
    res.status(200).json(forumMessages);
  } catch (e) {
    res.status(400).json(e);
  }
};

/**
 * Создание или обновление сообщения форума
 * @param req {ForumMessage} - данные сообщения форума
 * @param res {ForumMessage} - созданное или обновленное сообщение форума или сообщение об ошибке
 */
export const createOrUpdateForumMessage = async (req: Request, res: Response) => {
  try {
    const reqForumMessage = req.body;
    const forumMessage = await ForumMessage.findByPk(reqForumMessage.message_id);
    if (forumMessage) {
      await forumMessage.update(reqForumMessage);
      res.status(200).json(forumMessage);
    } else {
      const newForumMessage = await ForumMessage.create(reqForumMessage);
      res.status(200).json(newForumMessage);
    }
  } catch (e) {
    res.status(400).json(e);
  }
};

/**
 * Удаление сообщения форума по id сообщения
 * @param req {params: {message_id: number}} - id сообщения, данные которого нужно удалить
 * @param res {message: string} - сообщение об успешном удалении или сообщение об ошибке
 */

export const deleteForumMessageById = async (req: Request, res: Response) => {
  try {
    const forumMessage = await ForumMessage.findByPk(req.params.message_id);
    console.log(forumMessage);
    if (forumMessage) {
      await forumMessage.destroy();
      res.status(200).json({ message: 'Сообщение удалено' });
    } else {
      res.status(400).json({ message: 'Сообщение не найдено' });
    }
  } catch (e) {
    res.status(400).json(e);
  }
};

/** Удаление сообщений форума по id темы
 * @param req {params: {topic_id: number}} - id темы, данные которой нужно удалить
 * @param res {message: string} - сообщение об успешном удалении или сообщение об ошибке
 */

export const deleteForumMessageByTopicId = async (req: Request, res: Response) => {
  try {
    const forumMessages = await ForumMessage.findAll({
      where: {
        topic_id: req.params.topic_id,
      },
    });
    if (forumMessages) {
      for (const forumMessage of forumMessages) {
        await deleteAllEmojiByMessageId(forumMessage.id);
        await forumMessage.destroy();
      }
      res.status(200).json({ message: 'Сообщения удалены' });
    } else {
      res.status(400).json({ message: 'Сообщения не найдены' });
    }
  } catch (e) {
    res.status(400).json(e);
  }
};
