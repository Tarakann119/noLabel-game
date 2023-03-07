import { useAppSelector } from './reduxHooks';

export function useAuth() {
  const { email, id, login, first_name, second_name, display_name, avatar, phone } = useAppSelector(
    (state) => state.auth.user
  );
  return {
    isAuth: !!id,
    email,
    login,
    id,
    first_name,
    second_name,
    display_name,
    avatar,
    phone,
  };
}
