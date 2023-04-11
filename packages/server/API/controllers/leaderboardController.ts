import type { Request, Response } from 'express';

import { Leaderboard } from '../models/Leaderboard';
import { User } from '../models/User';

export const getLeaderboard = async (_req: Request, res: Response) => {
  try {
    const leaderboard: Leaderboard[] = await Leaderboard.findAll();
    res.status(200).json(leaderboard);
  } catch (e) {
    res.status(400).json(e);
  }
};

export const getLeaderboardByUserId = async (req: Request, res: Response) => {
  try {
    const leaderboard = await Leaderboard.findByPk(req.params.user_id);
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

export const createOrUpdateLeaderboard = async (req: Request, res: Response) => {
  try {
    const userId = req.body.user_id;
    const user = await User.findByPk(userId);
    const leaderboard = await Leaderboard.findByPk(userId);
    if (leaderboard) {
      await Leaderboard.update(req.body, {
        where: {
          user_id: userId,
        },
      });
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
