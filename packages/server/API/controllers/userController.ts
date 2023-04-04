import type { Request, Response } from 'express';

import { User } from '../models/User';

export const fetchUser = async (req: Request, res: Response): Promise<Response> => {
  try {
    const user: User | null = await User.findByPk(req.params.ya_id);
    res.json(user);
    return res.json();
  } catch (e) {
    return res.status(400).json(e);
  }
};

export const addUser = async (req: Request, res: Response) => {
  try {
    const reqUser: User = req.body as User;
    console.log(reqUser);
    const user: User = await User.create(reqUser, {
      fields: ['ya_id', 'login', 'first_name', 'second_name', 'avatar'],
    });
    res.sendStatus(200).json(user);
  } catch (e) {
    console.error(e);
    res.status(400).json(e);
  }
};
