import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Leaderboard } from '../models/Leaderboard';
import { Theme } from '../models/Theme';
import { User } from '../models/User';

/**
 * Получение данных пользователя по id
 * @param req {params {user_id : number}} - id пользователя, которого нужно получить
 * @param res {User} - данные пользователя с таблицей лидеров и таблицей тем или сообщение об ошибке
 */
export const getUser = async (req: Request, res: Response) => {
  try {
    const user: User | null = await User.findOne({
      where: {
        id: req.params.user_id,
      },
      include: [{ model: Leaderboard }, { model: Theme }],
    });
    if (!user) {
      res.status(StatusCodes.NOT_FOUND).json({ reason: 'Пользователь не найден' });
    } else {
      res.status(StatusCodes.OK).json(user);
    }
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json(e);
  }
};

/**
 * Создание пользователя или изменение данных существующего пользователя
 * @param req {User} - данные пользователя
 * @param res {User} - данные пользователя или сообщение об ошибке
 */
export const createOrUpdateUser = async (req: Request, res: Response) => {
  try {
    const reqUser: User = req.body;
    const user = await User.upsert(reqUser);
    res.status(StatusCodes.OK).json(user);
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json(e);
  }
};

/**
 * Получение всех пользователей
 * @param req {offset : number, limit : number} - смещение и лимит, по умолчанию 0 и Infinity
 * @param res {User[]} - массив пользователей или сообщение об ошибке
 * */
export const getAllUsers = async (req: Request, res: Response) => {
  try {
    if (req.body.offset < 0 || req.body.limit < 0) {
      res.status(StatusCodes.BAD_REQUEST).json({ reason: 'Некорректный запрос' });
    }
    const users: User[] = await User.findAll({
      offset: req.body.offset,
      limit: req.body.limit,
    });
    res.status(StatusCodes.OK).json(users);
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json(e);
  }
};
