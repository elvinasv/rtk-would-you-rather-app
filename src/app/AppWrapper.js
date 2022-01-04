import { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchQuestions } from 'features/question/questionsSlice';
import { fetchUsers } from 'features/users/usersSlice';

export function AppWrapper({ children }) {
  const dispatch = useDispatch();
  const questionsSliceStatus = useSelector((state) => state.questions.status);
  const usersSliceStatus = useSelector((state) => state.users.status);

  useEffect(() => {
    if (questionsSliceStatus === 'idle') {
      dispatch(fetchQuestions());
    }
  }, [dispatch, questionsSliceStatus]);

  useEffect(() => {
    if (usersSliceStatus === 'idle') {
      dispatch(fetchUsers());
    }
  }, [dispatch, usersSliceStatus]);

  return children;
}
