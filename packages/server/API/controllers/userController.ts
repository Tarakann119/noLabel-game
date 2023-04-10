import type { Request, Response } from 'express';

import { User } from '../models/User';

/** Запрос на получение пользователя
 * req.params.user_id - id пользователя, которого нужно получить
 * res.status(200).json(user) - пользователь, если он есть
 * res.status(200).json({message: 'Пользователь не найден'}) - пользователь не найден
 * res.status(400).json(e) - ошибка,
 * @param req
 * @param res
 */
export const fetchUser = async (req: Request, res: Response) => {
  try {
    const user: User | null = await User.findByPk(req.params.user_id);
    if (!user) {
      res.status(200).json({ message: 'Пользователь не найден' });
    } else {
      res.status(200).json(user);
    }
  } catch (e) {
    res.status(400).json(e);
  }
};

/** Запрос на создание пользователя или изменение данных  существующего пользователя
 * req.body.user_id - id пользователя, которого нужно создать или изменить
 * @param req
 * @param res
 */
export const pushUser = async (req: Request, res: Response) => {
  try {
    const reqUser: User = req.body;
    console.log(reqUser);
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
