import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';
import { decimalToPercentString } from 'utils';
import { mockClient } from 'api/_DATA';

const questionAdapter = createEntityAdapter();

const initialState = questionAdapter.getInitialState();

export const fetchQuestions = createAsyncThunk('questions', async () => {
  const response = await mockClient.getQuestions();
  return response;
});

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  extraReducers: {
    [fetchQuestions.fulfilled]: questionAdapter.setAll,
  },
});

export default questionsSlice.reducer;

export const {
  selectAll: selectAllQuestions,
  selectById: selectQuestionById,
  selectIds: selectQuestionIds,
} = questionAdapter.getSelectors((state) => state.questions);

export const selectAnsweredQuestionIds = (state) =>
  Object.keys(state.users.entities?.[state.auth.authorizedUser]?.answers || {});

export const selectUnansweredQuestionIds = createSelector(
  [selectQuestionIds, selectAnsweredQuestionIds],
  (allIds, answeredIds) => allIds.filter((id) => !answeredIds.includes(id))
);

export const selectQuestionVoteStats = createSelector(
  [selectQuestionById],
  (questionEntity) => {
    const optionOneVotes = questionEntity.optionOne.votes.length;
    const optionTwoVotes = questionEntity.optionTwo.votes.length;

    return {
      optionOne: {
        count: optionOneVotes,
        percentage: decimalToPercentString(
          optionOneVotes / (optionOneVotes + optionTwoVotes)
        ),
      },
      optionTwo: {
        count: optionTwoVotes,
        percentage: decimalToPercentString(
          optionTwoVotes / (optionOneVotes + optionTwoVotes)
        ),
      },
      totalVotes: {
        count: optionOneVotes + optionTwoVotes,
        percentage: `100%`,
      },
    };
  }
);
