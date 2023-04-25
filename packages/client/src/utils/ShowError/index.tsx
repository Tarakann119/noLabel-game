import { toast } from 'react-toastify';

export const showError = () => {
  return toast.error('Что-то не так...');
};

export const showSuccess = (text: string) => {
  return toast.success(`${text}`);
};
