import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';

import { Theme } from '../models/Theme';
import { User } from '../models/User';

/**
 * Получение темы по id пользователя
 * @param req {params {user_id: number}} - id пользователя, тему которого нужно получить
 * @param res {Theme} - тема пользователя или сообщение об ошибке
 */
export const getTheme = async (req: Request, res: Response) => {
  try {
    const user: User | null = await User.findByPk(req.params.user_id);
    if (!user) {
      res.status(StatusCodes.BAD_REQUEST).json({ reason: 'Пользователь не найден' });
    } else {
      const theme: Theme | null = await Theme.findByPk(user.id);
      if (!theme) {
        res.status(StatusCodes.BAD_REQUEST).json({ reason: 'Тема не найдена' });
      } else {
        res.status(StatusCodes.OK).json(theme);
      }
    }
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json(e);
  }
};

/**
 * Создание или изменение темы пользователя
 * @param req {Theme} - id пользователя и тема
 * @param res {Theme} - тема, если она была создана или изменена или сообщение об ошибке
 */
export const setTheme = async (req: Request, res: Response) => {
  try {
    const reqTheme: Theme = req.body;
    const user: User | null = await User.findByPk(reqTheme.id);
    if (!user) {
      res
        .status(StatusCodes.BAD_REQUEST)
        .json({ error: `Пользователь c id:${reqTheme.id} не найден` });
    } else {
      let theme: Theme | null = await Theme.findByPk(reqTheme.id);
      if (!theme) {
        await Theme.create(reqTheme);
      } else {
        await theme.update(reqTheme);
      }
      theme = await Theme.findByPk(reqTheme.id);
      res.status(StatusCodes.ACCEPTED).json(theme);
    }
  } catch (e) {
    res.status(StatusCodes.BAD_REQUEST).json(e);
  }
};
