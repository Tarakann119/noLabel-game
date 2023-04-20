import { toast } from 'react-toastify';

export const showError = (error: string) => {
  const errors: {
    [key: string]: string;
  } = {
    'Cookie is not valid': 'Куки',
    'Not found': 'Не найдено',
    'User already in system': 'Пользователь уже авторизован.',
    'Login or password is incorrect': 'Неверный логин или пароль',
    'Login already exists': 'Введёный логин уже занят.',
    'Email already exists': 'Введеный email уже зарегистрирован. Попробуйте восстановить пароль.',
  };

  return toast.error(`${errors[error]}`);
};

export const showSuccess = (text: string) => {
  return toast.success(`${text}`);
};
