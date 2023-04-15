import type { Request, Response } from 'express';

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
      res.status(400).json({ error: 'Пользователь не найден' });
    } else {
      const theme: Theme | null = await Theme.findByPk(user.user_id);
      if (!theme) {
        res.status(400).json({ error: 'Тема не найдена' });
      } else {
        res.status(200).json(theme);
      }
    }
  } catch (e) {
    res.status(400).json(e);
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
    const user: User | null = await User.findByPk(reqTheme.user_id);
    if (!user) {
      res.status(400).json({ error: `Пользователь c id:${reqTheme.user_id} не найден` });
    } else {
      const theme: Theme | null = await Theme.findByPk(reqTheme.user_id);
      if (!theme) {
        await Theme.create(reqTheme);
      } else {
        await theme.update(reqTheme);
        res.status(200).json(theme);
      }
    }
  } catch (e) {
    res.status(400).json(e);
  }
};
