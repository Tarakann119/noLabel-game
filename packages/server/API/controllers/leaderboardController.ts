import type { Request, Response } from 'express';

import { Leaderboard } from '../models/Leaderboard';
import { User } from '../models/User';

/**
 * Получение всей таблицы лидеров
 * @param req {offset : number, limit : number} - смещение и лимит, по умолчанию 0 и Infinity
 * @param res {Leaderboard[]} - таблица лидеров с данными пользователя или сообщение об ошибке
 */
export const getLeaderboard = async (req: Request, res: Response) => {
  try {
    if (req.body.offset < 0 || req.body.limit < 0) {
      res.status(400).json({ message: 'Некорректный запрос' });
    }
    const leaderboard: Leaderboard[] = await Leaderboard.findAll({
      attributes: ['score'],
      include: [{ model: User, attributes: ['user_id', 'first_name', 'second_name', 'avatar'] }],
      order: [['score', 'DESC']],
      offset: req.body.offset,
      limit: req.body.limit,
    });
    res.status(200).json(leaderboard);
  } catch (e) {
    res.status(400).json(e);
  }
};

/**
 * Получение значения из таблицы лидеров по id пользователя
 * @param req {params {user_id : number}} - id пользователя
 * @param res {Leaderboard} - значение из таблицы лидеров с данными пользователя или сообщение об ошибке
 */
export const getLeaderboardByUserId = async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.findOne({
      where: {
        user_id: req.params.user_id,
      },
      include: [{ model: User }],
    });
    if (leaderboard) {
      res.status(200).json(leaderboard);
    } else {
      res
        .status(404)
        .json({ message: `Пользователь c id:${req.params.user_id} не найден в таблице лидеров` });
    }
  } catch (e) {
    res.status(400).json(e);
  }
};

/**
 * Создание или обновление значения в таблице лидеров
 * @param req {Leaderboard} - id пользователя и счет
 * @param res {message : string} - сообщение об успешном создании или обновлении или сообщение об ошибке
 */
export const createOrUpdateLeaderboard = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user_id;
    const user = await User.findByPk(userId);
    const leaderboard = await Leaderboard.findByPk(userId);
    if (leaderboard) {
      await Leaderboard.update(
        {
          // Если новый счет больше старого, то обновляем, иначе оставляем старый
          score: req.body.score > leaderboard.score ? req.body.score : leaderboard.score,
          user_id: userId,
        },
        {
          where: {
            user_id: userId,
          },
        }
      );
      res.status(200).json({ message: 'Лидерборд обновлен' });
    } else if (user) {
      await Leaderboard.create(req.body);
      res.status(201).json({ message: 'Лидерборд создан' });
    } else {
      res.status(404).json({ message: `Пользователь c id:${userId} не зарегистрирован` });
    }
  } catch (e) {
    res.status(400).json(e);
  }
};
