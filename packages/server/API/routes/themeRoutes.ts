import express, { Router } from 'express';

import * as themeController from '../controllers/themeController';

export const themes = Router();

themes
  .use(express.urlencoded({ extended: true }))
  .use(express.json())

  /** получение темы пользователя по id пользователя */
  .get('/:user_id', themeController.getTheme)

  /** установка темы пользователя
   * модель темы в теле запроса
   * Theme {
   *  user_id: number;
   *  theme: 'dark' || 'light';
   *  }
   * */
  .post('/', themeController.setTheme);
