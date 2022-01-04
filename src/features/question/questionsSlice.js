import {
  createSlice,
  createAsyncThunk,
  createEntityAdapter,
  createSelector,
} from '@reduxjs/toolkit';
import { decimalToPercentString, REQUEST_STATUS } from 'utils';
import { mockClient } from 'api/_DATA';
import { selectUserById } from 'features/users/usersSlice';

const questionAdapter = createEntityAdapter({
  // Sort in descending order; newer -> older (in timestamp term)
  sortComparer: (a, b) => b.timestamp - a.timestamp,
});

const initialState = questionAdapter.getInitialState({
  status: REQUEST_STATUS.idle,
});

export const fetchQuestions = createAsyncThunk(
  'questions/fetchQuestions',
  async () => {
    const response = await mockClient.getQuestions();
    return response;
  }
);

export const addQuestion = createAsyncThunk(
  'questions/addQuestion',
  async ({ authorizedUser, optionOneText, optionTwoText }) => {
    const response = await mockClient.saveQuestion({
      author: authorizedUser,
      optionOneText,
      optionTwoText,
    });

    return response;
  }
);

export const addQuestionAnswer = createAsyncThunk(
  'questions/addQuestionAnswer',
  async ({ questionId, answer, authorizedUser }) => {
    await mockClient.saveQuestionAnswer({
      authedUser: authorizedUser,
      qid: questionId,
      answer,
    });

    return {
      authedUser: authorizedUser,
      qid: questionId,
      answer,
    };
  }
);

const questionsSlice = createSlice({
  name: 'questions',
  initialState,
  extraReducers: {
    [fetchQuestions.pending]: (state) => {
      state.status = REQUEST_STATUS.loading;
    },
    [fetchQuestions.rejected]: (state) => {
      state.status = REQUEST_STATUS.failed;
    },
    [fetchQuestions.fulfilled]: (state, action) => {
      state.status = REQUEST_STATUS.succeeded;
      questionAdapter.setAll(state, action.payload);
    },
    [addQuestion.fulfilled]: questionAdapter.addOne,
    [addQuestionAnswer.fulfilled]: (state, action) => {
      const { qid, answer, authedUser } = action.payload;
      state.entities[qid][answer].votes.push(authedUser);
    },
  },
});

export default questionsSlice.reducer;

export const {
  selectAll: selectAllQuestions,
  selectById: selectQuestionById,
  selectIds: selectQuestionIds,
} = questionAdapter.getSelectors((state) => state.questions);

export const selectAnsweredQuestionIds = createSelector(
  [selectQuestionIds, selectUserById],
  (allQuestionIds, authorizedUserEntity) => {
    const answeredIds = Object.keys(authorizedUserEntity.answers || {});
    // Filtering to have answered ids in newer -> older order.
    return allQuestionIds.filter((id) => answeredIds.includes(id));
  }
);

export const selectUnansweredQuestionIds = createSelector(
  [selectQuestionIds, selectUserById],
  (allQuestionIds, authorizedUserEntity) => {
    const answeredIds = Object.keys(authorizedUserEntity.answers || {});
    return allQuestionIds.filter((id) => !answeredIds.includes(id));
  }
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
