import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';

import { mockClient } from 'api/_DATA';
import { REQUEST_STATUS } from 'utils';

const usersAdapter = createEntityAdapter();

const initialState = usersAdapter.getInitialState({
  status: REQUEST_STATUS.idle,
});

export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  const response = await mockClient.getUsers();
  return response;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    addUserAnswer(state, action) {
      const { authorizedUser, questionId, answer } = action.payload;
      state.entities[authorizedUser].answers[questionId] = answer;
    },
    addUserQuestion(state, action) {
      const { authorizedUser, questionId } = action.payload;
      state.entities[authorizedUser].questions.push(questionId);
    },
  },
  extraReducers: {
    [fetchUsers.pending]: (state) => {
      state.status = REQUEST_STATUS.loading;
    },
    [fetchUsers.rejected]: (state) => {
      state.status = REQUEST_STATUS.failed;
    },
    [fetchUsers.fulfilled]: (state, action) => {
      state.status = REQUEST_STATUS.succeeded;
      usersAdapter.setAll(state, action.payload);
    },
  },
});

export default usersSlice.reducer;

export const { addUserAnswer, addUserQuestion } = usersSlice.actions;

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
