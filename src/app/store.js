import { configureStore } from '@reduxjs/toolkit';

import usersReducer from 'features/users/usersSlice';
import authReducer from 'features/authorization/authSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: usersReducer,
  },
});
