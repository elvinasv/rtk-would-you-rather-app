import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { mockClient } from 'api/_DATA';

const initialState = { authorizedUser: null, status: 'idle', error: null };

export const authorizeUser = createAsyncThunk(
  'auth/authorizeUser',
  async ({ username, password }) => {
    const response = await mockClient.authUser({ username, password });
    return response;
  }
);

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setAuthorizedUser(state, action) {
      const { username } = action.payload;
      state.authorizedUser = username;
    },
    logoutUser(state) {
      state.authorizedUser = null;
    },
  },
  extraReducers: {
    [authorizeUser.pending]: (state) => {
      state.status = 'loading';
    },
    [authorizeUser.fulfilled]: (state, action) => {
      state.status = 'succeeded';
      state.authorizedUser = action.payload.username || null;
    },
    [authorizeUser.rejected]: (state, action) => {
      state.status = 'failed';
      state.authorizedUser = null;
      state.error = action.error.message;
    },
  },
});

export const { setAuthorizedUser, logoutUser } = authSlice.actions;

export const isAuthorizedUser = (state) => Boolean(state.auth.authorizedUser);

export const authorizedUsername = (state) => state.auth.authorizedUser;

export default authSlice.reducer;
