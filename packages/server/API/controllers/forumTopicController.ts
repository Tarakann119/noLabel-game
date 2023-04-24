import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { Op } from 'sequelize';
import { Sequelize } from 'sequelize-typescript';

import { ForumMessage } from '../models/ForumMessage';
import { ForumTopic } from '../models/ForumTopic';
import { User } from '../models/User';

import { deleteAllEmojiByMessageId } from './emojiController';

/**
 * Получения всех тем форума по id
 * @param req {params {topic_id: number}} - id темы форума
 * @param res {ForumTopic} - тема форума или сообщение об ошибке
 */
export const getForumTopic = async (req: Request, res: Response) => {
  try {
    const topic: ForumTopic | null = await ForumTopic.findByPk(req.params.topic_id, {
      include: [
        { model: User },
        {
          model: ForumMessage,
          // Сортировка тем по id в порядке убывания
          order: [['id', 'ASC']],
          where: {
            id: {
              [Op.in]: Sequelize.literal('(SELECT MAX(id) FROM forum_messages GROUP BY topic_id)'),
            },
          },
        },
      ],
    });
    if (!topic) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ reason: `Тема форума c id ${req.params.topic_id} не найдена` });
    } else {
      res.status(StatusCodes.OK).json(topic);
    }
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json(e);
  }
};

/**
 * Получения всех тем форума
 * @param req {offset : number, limit : number} - смещение и лимит, по умолчанию 0 и Infinity
 * @param res {ForumTopic[]} - массив тем форума или сообщение об ошибке
 */
export const getAllForumTopic = async (req: Request, res: Response) => {
  try {
    if (req.body.offset < 0 || req.body.limit < 0) {
      res.status(StatusCodes.BAD_REQUEST).json({ reason: 'Некорректный запрос' });
    }
    const topics: ForumTopic[] = await ForumTopic.findAll({
      include: [
        { model: User },
        {
          model: ForumMessage,
          // Сортировка тем по id в порядке убывания
          order: [['id', 'ASC']],
          where: {
            id: {
              [Op.in]: Sequelize.literal('(SELECT MAX(id) FROM forum_messages GROUP BY topic_id)'),
            },
          },
        },
      ],
      order: [['id', 'DESC']],
      offset: req.body.offset,
      limit: req.body.limit,
    });
    res.status(StatusCodes.OK).json(topics);
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json(e);
  }
};

/**
 * Создания или обновление темы форума
 * @param req {ForumTopic} - тема форума, если id не указан, то создается новая тема, иначе обновляется
 * @param res {ForumTopic} - тема форума, которая была создана или обновлена в БД или сообщение об ошибке
 */
export const createOrUpdateForumTopic = async (req: Request, res: Response) => {
  try {
    const reqTopic: ForumTopic = req.body;
    const user: User | null = await User.findByPk(reqTopic.author_id);
    if (!user) {
      res.status(StatusCodes.BAD_REQUEST).json({ reason: 'Пользователь не найден' });
      return;
    }
    const topic: ForumTopic | null = await ForumTopic.findByPk(reqTopic.id);
    if (!topic) {
      const newTopic: ForumTopic = await ForumTopic.create(reqTopic);
      const author: User | null = await User.findByPk(reqTopic.author_id);
      await ForumMessage.create({
        topic_id: newTopic.id,
        author_id: reqTopic.author_id,
        text: `Пользователь ${author?.first_name} ${author?.second_name} создал тему`,
      } as ForumMessage);
      res.status(StatusCodes.CREATED).json(newTopic);
    } else {
      await topic.update(reqTopic);
      res.status(StatusCodes.ACCEPTED).json(topic);
    }
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json(e);
  }
};

/**
 * Удаления темы форума
 * @param req {params {topic_id: number}} - id темы форума
 * @param res {message: string} - сообщение об успешном удалении, или об ошибке
 */
export const deleteForumTopic = async (req: Request, res: Response) => {
  try {
    const topic: ForumTopic | null = await ForumTopic.findByPk(req.params.topic_id);
    if (!topic) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ message: `Тема форума c id ${req.params.topic_id} не найдена` });
    } else {
      const messages = await ForumMessage.findAll({
        where: {
          topic_id: req.params.topic_id,
        },
      });
      if (messages) {
        for (const forumMessage of messages) {
          await deleteAllEmojiByMessageId(forumMessage.id);
          await forumMessage.destroy();
        }
      }
      await topic.destroy();
      res
        .status(StatusCodes.OK)
        .json({ reason: `Тема форума c id ${req.params.topic_id} и все сообщения удалены` });
    }
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json(e);
  }
};
