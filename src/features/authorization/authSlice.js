import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

import { mockClient } from 'api/_DATA';

const initialState = { authorizedUser: null };

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
    [authorizeUser.fulfilled]: (state, action) => {
      state.authorizedUser = action.payload.username || null;
    },
  },
});

export const { setAuthorizedUser, logoutUser } = authSlice.actions;

export const isAuthorizedUser = (state) => Boolean(state.auth.authorizedUser);

export const authorizedUserId = (state) => state.auth.authorizedUser;

export default authSlice.reducer;
