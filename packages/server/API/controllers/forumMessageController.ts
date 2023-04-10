import type { Request, Response } from 'express';

import { ForumMessage } from '../models/ForumMessage';

// ----------------------------
/** Контроллер на получение сообщения форума по id сообщения
 * req.params.message_id - id сообщения, данные которого нужно получить
 */
export const getForumMessageById = async (req: Request, res: Response) => {
  try {
    const forumMessage = await ForumMessage.findByPk(req.params.message_id);
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
/** Контроллер на получение сообщений форума по id темы
 * req.params.topic_id - id темы, данные которой нужно получить
 */

export const getForumMessageByTopicId = async (req: Request, res: Response) => {
  try {
    const forumMessages = await ForumMessage.findAll({
      where: {
        topic_id: req.params.topic_id,
      },
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

// ----------------------------
/** Контроллер на получение всех сообщений форума, в продакшене вряд ли будет полезен
 * res.status(200).json(forumMessages) - массив из всех сообщений
 */
export const getAllForumMessage = async (_req: Request, res: Response) => {
  try {
    const forumMessages: ForumMessage[] = await ForumMessage.findAll();
    res.status(200).json(forumMessages);
  } catch (e) {
    res.status(400).json(e);
  }
};

// ----------------------------
/** Контроллер на создание или обновление сообщения форума
 * модель ForumMessage
 * {
 *   message_id: number;
 *   topic_id: number;
 *   user_id: number;
 *   message: string;
 *   created_at: Date; // заполняется автоматически при создании
 *   updated_at: Date; // заполняется автоматически при обновлении
 * }
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

// ----------------------------
/** Контроллер на удаление сообщения форума по id сообщения
 * req.params.message_id - id сообщения, данные которого нужно удалить
 */

export const deleteForumMessage = async (req: Request, res: Response) => {
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
