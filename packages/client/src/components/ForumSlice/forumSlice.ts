import { NavigateFunction } from 'react-router';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { ForumTopicType } from '@typings/app.typings';
import { SERVER_URL } from '@typings/constants';
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
      state.forumTopic = action.payload;
    });
    builder.addCase(getCurrentTopic.fulfilled, (state, action) => {
      state.forumTopic.push(action.payload);
    });
  },
});
export const { setForumTopic, setTopicData } = forumTopicReducer.actions;
export default forumTopicReducer.reducer;

export const getForumTopics = createAsyncThunk('forumTopic/getTopics', async () => {
  const response = await axios(`${SERVER_URL}api/forum/topics/all`, {
    withCredentials: true,
  });
  return response.data;
});
export const getCurrentTopic = createAsyncThunk(
  'forumTopic/getCurrentTopic',
  async ({ id }: { id: number | string | undefined }) => {
    const response = await axios(`${SERVER_URL}api/forum/topics/${id}`, {
      withCredentials: true,
    });
    return response.data;
  }
);
export const deleteForumTopic = createAsyncThunk(
  'forumTopic/deleteTopic',
  async ({ id, navigate }: { id: number; navigate: NavigateFunction; fetchData: () => void }) => {
    axios(`${SERVER_URL}api/forum/topics/${id}`, {
      method: 'delete',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      responseType: 'json',
      withCredentials: true,
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
  async ({
    dataId,
    authorId,
    emoji,
    fetchData,
  }: {
    dataId: string | number;
    authorId: string | number;
    emoji: string;
    fetchData: () => void;
  }) => {
    const requestData = JSON.stringify({
      message_id: dataId,
      author_id: authorId,
      emoji: emoji,
    });
    axios(`${SERVER_URL}api/forum/emoji`, {
      method: 'post',
      data: requestData,
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

export const createTopic = createAsyncThunk(
  'forumTopic/createTopic',
  async ({
    values,
    userId,
    navigate,
  }: {
    navigate: NavigateFunction;
    userId: number | string | null;
    values: string;
  }) => {
    const data = JSON.stringify({ title: values, author_id: userId });
    axios(`${SERVER_URL}api/forum/topics`, {
      method: 'post',
      data: data,
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      responseType: 'json',
      withCredentials: true,
    })
      .then((response) => {
        if (response.data.id) {
          try {
            navigate('/forum');
          } catch {
            showError();
          }
        }
      })
      .catch(() => {
        showError();
      });
  }
);
