import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ForumMessageType } from '@typings/app.typings';
import axios from 'axios';

import { showError } from '@/utils/ShowError';

const initialState = {
  forumMessages: <ForumMessageType[]>[],
};

export const forumMessagesReducer = createSlice({
  name: 'forumMessages',
  initialState,

  reducers: {
    setForumMessages(state, { payload }) {
      state.forumMessages = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getMessagesForTopic.fulfilled, (state, action) => {
      state.forumMessages.push(action.payload);
    });
  },
});

export const { setForumMessages } = forumMessagesReducer.actions;
export default forumMessagesReducer.reducer;

export const getMessagesForTopic = createAsyncThunk(
  'forumMessages/messagesForTopic',
  async ({ id }: { id: string | number | undefined }) => {
    const response = await axios(`http://localhost:3001/api/forum/messages/topic/${id}`);
    return response.data;
  }
);

export const deleteCurrentMessage = createAsyncThunk(
  'forumMessages/deleteMessages',
  async ({ id }: { id: string | number | undefined }) => {
    await axios(`http://localhost:3001/api/forum/messages/${id}`, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      responseType: 'json',
    }).catch(() => {
      showError();
    });
  }
);
