import express, { Router } from 'express';

import * as userController from '../controllers/userController';

export const users = Router();

users
  .use(express.json())
  .use(express.urlencoded({ extended: true }))

  /** Запрос на получение всех пользователей */
  .get('/all', userController.getAllUsers)

  /** Запрос на получение пользователя по id
   * req.params.user_id - id пользователя, данные которого нужно получить
   */
  .get('/:user_id', userController.getUser)

  /** Запрос на добавление или изменение пользователя
   * модель пользователя в теле запроса
   *  User{
   *   user_id: number;
   *   last_name: string;
   *   second_name: string;
   *   login: string;
   *   email: string | null;
   *   phone: string | null;
   *   avatar: string | null;
   *   created_at: Date; // дата создания, заполняется автоматически
   *   updated_at: Date; // дата изменения, заполняется автоматически
   * }
   */
  .post('/', userController.createOrUpdateUser);
