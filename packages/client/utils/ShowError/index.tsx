import { toast } from 'react-toastify';

export const showError = () => {
  return toast.error('Что-то не так...');
};
