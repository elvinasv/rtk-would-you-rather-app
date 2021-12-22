import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
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

const answeredQuestionCount = (userEntity) =>
  (userEntity.answers && Object.keys(userEntity.answers)?.length) || 0;

const askedQuestionCount = (userEntity) => userEntity?.questions?.length || 0;

export const { selectAll: selectAllUsers, selectById: selectUserById } =
  usersAdapter.getSelectors((state) => state.users);

export const selectLeaders = createSelector([selectAllUsers], (allUsers) => {
  const scores = allUsers.reduce(
    (userScores, userEntity) => [
      ...userScores,
      {
        id: userEntity.id,
        score:
          askedQuestionCount(userEntity) + answeredQuestionCount(userEntity),
      },
    ],
    []
  );

  return scores.sort((first, second) => second.score - first.score);
});

export const selectAnsweredCountByUser = createSelector(
  selectUserById,
  (userEntity) => answeredQuestionCount(userEntity)
);

export const selectAskedCountByUser = createSelector(
  selectUserById,
  (userEntity) => askedQuestionCount(userEntity)
);
