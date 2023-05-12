import { NavigateFunction } from 'react-router';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ForumTopicType } from '@typings/app.typings';
import axios from 'axios';

import { showError } from '@/utils/ShowError';

const initialState = {
  forumTopic: <ForumTopicType[]>[],
};
export const forumTopicReducer = createSlice({
  name: 'forumTopic',
  initialState,

  reducers: {
    setForumTopic(state, { payload }) {
      state.forumTopic = payload;
    },
    setTopicData(state, { payload }) {
      state.forumTopic = payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(getForumTopics.fulfilled, (state, action) => {
      state.forumTopic.push(action.payload);
    }),
      builder.addCase(getCurrentTopic.fulfilled, (state, action) => {
        state.forumTopic.push(action.payload);
      });
  },
});
export const { setForumTopic, setTopicData } = forumTopicReducer.actions;
export default forumTopicReducer.reducer;

export const getForumTopics = createAsyncThunk('forumTopic/getTopics', async () => {
  const response = await axios(`http://localhost:3001/api/forum/topics/all`);
  return response.data;
});
export const getCurrentTopic = createAsyncThunk(
  'forumTopic/getCurrentTopic',
  async ({ id }: { id: number | string | undefined }) => {
    const response = await axios(`http://localhost:3001/api/forum/topics/${id}`);
    return response.data;
  }
);
export const deleteForumTopic = createAsyncThunk(
  'forumTopic/deleteTopic',
  async ({ id, navigate }: { id: number; navigate: NavigateFunction }) => {
    axios(`http://localhost:3001/api/forum/topics/${id}`, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      responseType: 'json',
    })
      .catch(() => {
        showError();
      })
      .finally(() => {
        navigate('/forum');
      });
  }
);

export const postEmojies = createAsyncThunk(
  'forumTopic/addEmojies',
  async ({ data }: { data: string }) => {
    axios('http://localhost:3001/api/forum/emoji', {
      method: 'post',
      data: data,
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
