import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ForumMessageType } from '@typings/app.typings';
import { SERVER_URL } from '@typings/constants';
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
      state.forumMessages = action.payload;
    });
  },
});

export const { setForumMessages } = forumMessagesReducer.actions;
export default forumMessagesReducer.reducer;

export const getMessagesForTopic = createAsyncThunk(
  'forumMessages/messagesForTopic',
  async ({ id }: { id: string | number | undefined }) => {
    const response = await axios(`${SERVER_URL}api/forum/messages/topic/${id}`, {
      withCredentials: true,
    });
    return response.data;
  }
);

export const deleteCurrentMessage = createAsyncThunk(
  'forumMessages/deleteMessages',
  async ({ id, fetchData }: { id: string | number | undefined; fetchData: () => void }) => {
    await axios(`${SERVER_URL}api/forum/messages/${id}`, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      responseType: 'json',
      withCredentials: true,
    })
      .then(() => fetchData())
      .catch(() => {
        showError();
      });
  }
);

export const postTopicMessage = createAsyncThunk(
  'forumMessages/postMessage',
  async ({
    text,
    author_id,
    topic_id,
    fetchData,
    setMessageContent,
  }: {
    text: string;
    author_id: string | null;
    topic_id: string | number | undefined;
    fetchData: () => void;
    setMessageContent: React.Dispatch<React.SetStateAction<string>>;
  }) => {
    const data = JSON.stringify({
      text: text,
      author_id: author_id,
      topic_id: topic_id,
    });
    await axios(`${SERVER_URL}api/forum/messages`, {
      method: 'post',
      data: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      responseType: 'json',
      withCredentials: true,
    })
      .then(() => {
        fetchData();
      })
      .catch(() => {
        showError();
      });
    setMessageContent('');
  }
);
