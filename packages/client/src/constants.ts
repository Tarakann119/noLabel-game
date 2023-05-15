import { loadMe } from './components/Autification/slice';
import { AppDispatch } from './store/store';


export type Route = {
  path: string;
  loader?: (dispatch: AppDispatch) => void;
};

export const loadUser = (dispatch: AppDispatch) => dispatch(loadMe());

//routes
export const ROUTES: Record<string, Route> = {
  home: {
    path: "/",
  },
  login: {
    path: "/login",
  },
  registration: {
    path: "/registration",
  },
  profile: {
    path: "/profile",
  },
  rating: {
    path: "/rating",
  },
  forum: {
    path: "/forum",
  },
  game: {
    path: "/game",
  },
};

export const SCHEMA_ERROR_MESSAGE = "Schema response is not valid";

export const IS_SSR = typeof window === "undefined";

export const RATING_FIELD_NAME = "gamesAmount";
