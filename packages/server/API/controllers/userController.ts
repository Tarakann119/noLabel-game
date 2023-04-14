import type { Request, Response } from 'express';

import { Leaderboard } from '../models/Leaderboard';
import { Theme } from '../models/Theme';
import { User } from '../models/User';

/** Запрос на получение пользователя
 * req.params.user_id - id пользователя, данные которого нужно получить
 * @param req
 * @param res
 */
export const getUser = async (req: Request, res: Response) => {
  try {
    const user: User | null = await User.findOne({
      where: {
        user_id: req.params.user_id,
      },
      include: [{ model: Leaderboard }, { model: Theme }],
    });
    if (!user) {
      res.status(200).json({ message: 'Пользователь не найден' });
    } else {
      res.status(200).json(user);
    }
  } catch (e) {
    res.status(400).json(e);
  }
};

/** Запрос на создание пользователя или изменение данных существующего пользователя
 * req.body.user_id - id пользователя, которого нужно создать или изменить
 * @param req
 * @param res
 */
export const createOrUpdateUser = async (req: Request, res: Response) => {
  try {
    const reqUser: User = req.body;
    let user: User | null = await User.findByPk(reqUser.user_id);
    if (!user) {
      user = await User.create(reqUser);
    } else {
      user = await user.update(reqUser);
    }
    res.status(200).json(user);
  } catch (e) {
    res.status(400).json(e);
  }
};

/** Запрос на получение всех пользователей */
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users: User[] = await User.findAll();
    res.status(200).json(users);
  } catch (e) {
    res.status(400).json(e);
  }
};
