import type { Request, Response } from 'express';

import { Theme } from '../models/Theme';
import { User } from '../models/User';

// ----------------------------
/** Контроллер на получение темы по id пользователя
 * req.params.user_id - id пользователя, тему которого нужно получить
 * res.status(200).json(theme) - тема, если она есть для
 * res.status(400).json({error:''}) - ошибка, если пользователь не найден
 * res.status(400).json(e) - ошибка
 * @param req
 * @param res
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

// ----------------------------
/** Контроллер на создание или изменение темы пользователя
 * req.body.user_id - id пользователя, тему которого нужно изменить
 * req.body.theme - тема
 * res.status(200).json(theme) - тема, если она есть
 * res.status(400).json({error:''}) - ошибка, если пользователь не найден
 * res.status(400).json(e) - ошибка
 * @param req
 * @param res
 */
export const setTheme = async (req: Request, res: Response) => {
  try {
    const reqTheme: Theme = req.body;
    const user: User | null = await User.findByPk(reqTheme.user_id);
    if (!user) {
      res.status(400).json({ error: 'Пользователь не найден' });
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
