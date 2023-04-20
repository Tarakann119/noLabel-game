import * as Yup from 'yup';

import { email, login, onlyLetters, password, phone } from './fields';

export const SigninSchema = Yup.object().shape({
  login: login('Введите ваш логин.'),
  password: password('Введите ваш пароль.'),
});

export const SignupSchema = Yup.object().shape({
  first_name: onlyLetters('Введите ваше имя.'),
  second_name: onlyLetters('Введите вашу фамилию.'),
  login: login('Введите ваш логин.'),
  email: email('Введите ваш email.'),
  phone: phone('Введите ваш телефон.'),
  password: password('Введите ваш пароль.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('password')], 'Пароли не совпадают.')
    .required('Повторите пароль.'),
});

export const ProfileSchema = Yup.object().shape({
  first_name: onlyLetters('Введите ваше имя.'),
  second_name: onlyLetters('Введите вашу фамилию.'),
  login: login('Введите ваш логин.'),
  email: email('Введите ваш email.'),
  phone: phone('Введите ваш телефон.'),
});

export const PasswordSchema = Yup.object().shape({
  newPassword: password('Введите новый пароль.'),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref('newPassword')], 'Пароли не совпадают.')
    .required('Повторите пароль.'),
});

export const CreatePostSchema = Yup.object().shape({
  title: Yup.string().required('Введите название темы.'),
  message: Yup.string().min(10, 'Минимум 10 символов.').required('Введите содержание темы.'),
});

export const PostSchema = Yup.object().shape({
  message: Yup.string().required('Введите сообщение.'),
});
