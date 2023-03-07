import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: {
    id: null,
    first_name: null,
    second_name: null,
    display_name: null,
    login: null,
    avatar: null,
    email: null,
    phone: null,
  },
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.user.id = action.payload.id;
      state.user.first_name = action.payload.first_name;
      state.user.second_name = action.payload.second_name;
      state.user.display_name = action.payload.display_name;
      state.user.login = action.payload.login;
      state.user.avatar = action.payload.avatar;
      state.user.email = action.payload.email;
      state.user.phone = action.payload.phone;
    },
    removeUser(state) {
      state.user.id = null;
      state.user.first_name = null;
      state.user.second_name = null;
      state.user.display_name = null;
      state.user.login = null;
      state.user.avatar = null;
      state.user.email = null;
      state.user.phone = null;
    },
  },
});

export const { setUser, removeUser } = userSlice.actions;

export default userSlice.reducer;
