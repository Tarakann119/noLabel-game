import { loadMe } from '@/components/Autification/slice';
import { AppDispatch } from '@/store/store';

export const loadUser = (dispatch: AppDispatch) => dispatch(loadMe());
