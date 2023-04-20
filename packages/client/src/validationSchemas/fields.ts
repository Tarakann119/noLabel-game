import * as Yup from 'yup';

export const onlyLetters = (requiredText: string) =>
  Yup.string()
    .matches(/^[a-zA-Zа-яА-Я]*$/, 'Допустима только латиница и кириллица.')
    .required(`${requiredText}`);

export const login = (requiredText: string) =>
  Yup.string()
    .matches(
      /^[\w_-]*$/,
      'Допустимы: латиница, цифры, дефис и нижнее подчёркивание. Не используйте пробелы и другие спецсимволы.'
    )
    .min(2, 'Минимум 2 символа.')
    .max(20, 'Максмум 20 символов.')
    .required(`${requiredText}`);

export const password = (requiredText: string) =>
  Yup.string()
    .matches(/^[\w\-!@#$%^&*]*$/, 'Допустимы: латиница, цифры, спецсимволы.')
    .min(8, 'Минимум 8 символов.')
    .max(20, 'Максимум 20 символов')
    .matches(/[0-9]/, 'Должен содержать хотя бы одну цифру.')
    .matches(/[A-Z]/, 'Должен содержать хотя бы одну заглавную букву.')
    .required(`${requiredText}`);

export const email = (requiredText: string) =>
  Yup.string()
    .matches(/^[A-Z0-9._%+-]+@[A-Z0-9-]+.+.[A-Z]{2,4}$/i, 'Введите корректный email.')
    .required(`${requiredText}`);

export const phone = (requiredText: string) =>
  Yup.string()
    .matches(/^[\d\\+][\d\\(\\)\\ -]{9,14}\d$/, 'Введите корректный номер.')
    .required(`${requiredText}`);
