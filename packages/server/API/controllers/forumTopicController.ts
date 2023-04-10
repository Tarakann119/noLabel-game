import type { Request, Response } from 'express';

import { ForumTopic } from '../models/ForumTopic';

/** Контроллер на получение тем форума по id
 * req.params.topic_id - id Topic, данные которого нужно получить
 * res.status(200).json(topic) - Topic, если он есть
 * res.status(400).json({error:''}) - ошибка, если Topic не найден
 * res.status(400).json(e) - ошибка
 * @param req
 * @param res
 */
export const getForumTopic = async (req: Request, res: Response) => {
  try {
    const topic: ForumTopic | null = await ForumTopic.findByPk(req.params.topic_id);
    if (!topic) {
      res.status(400).json({ message: `Тема форума c id ${req.params.topic_id} не найдена` });
    } else {
      res.status(200).json(topic);
    }
  } catch (e) {
    res.status(400).json(e);
  }
};

/** Контроллер на получение всех тем форума
 * res.status(200).json(topics) - массив из всех тем
 * @param res
 * @param _req
 */
// TODO: добавить лимит
export const getAllForumTopic = async (_req: Request, res: Response) => {
  try {
    const topics: ForumTopic[] = await ForumTopic.findAll();
    res.status(200).json(topics);
  } catch (e) {
    res.status(400).json(e);
  }
};

/** Контроллер на создание или обновление темы форума
 * req.body.topic_id - id Topic, данные которого нужно изменить
 * @param req
 * @param res
 */
export const createOrUpdateForumTopic = async (req: Request, res: Response) => {
  try {
    const reqTopic: ForumTopic = req.body;
    const topic: ForumTopic | null = await ForumTopic.findByPk(reqTopic.topic_id);
    if (!topic) {
      const newTopic: ForumTopic = await ForumTopic.create(reqTopic);
      res.status(200).json(newTopic);
    } else {
      await topic.update(reqTopic);
      res.status(200).json(topic);
    }
  } catch (e) {
    res.status(400).json(e);
  }
};

/** Контроллер на удаление темы форума
 * req.params.topic_id - id темы форума, которую нужно удалить
 * @param req
 * @param res
 */
export const deleteForumTopic = async (req: Request, res: Response) => {
  try {
    const topic: ForumTopic | null = await ForumTopic.findByPk(req.params.topic_id);
    if (!topic) {
      res.status(400).json({ message: `Тема форума c id ${req.params.topic_id} не найдена` });
    } else {
      await topic.destroy();
      res.status(200).json({ message: 'Тема форума удалена' });
    }
  } catch (e) {
    res.status(400).json(e);
  }
};
