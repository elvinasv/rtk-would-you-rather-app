import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
} from '@reduxjs/toolkit';

import { mockClient } from 'api/_DATA';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState();

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await mockClient.getUsers();
  return response;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  extraReducers: {
    [fetchUsers.fulfilled]: usersAdapter.setAll,
  },
});

export default usersSlice.reducer;

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => state.users);
