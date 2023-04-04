import express, { Router } from 'express';

import * as userController from '../controllers/userController';

export const users = Router();

users
  .use(express.json())
  .use(express.urlencoded({ extended: true }))

  // Эти роуты нужны исключительно для тестирования
  .get('/fetchUser', userController.fetchUser)
  .post('/addUser', userController.addUser);
