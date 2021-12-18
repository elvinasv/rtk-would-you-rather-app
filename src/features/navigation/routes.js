import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from '../authorization/login';
import Dashboard from '../dashboard/dashboard';
import Leaderboard from '../leaderboard/leaderboard';
import AddQuestionForm from '../question/add-question-form';
import QuestionPage from '../question/question-page';

import { PrivateRoute } from './private-route';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/leaderboard">
        <Leaderboard />
      </Route>
      <PrivateRoute exact path="/">
        <Dashboard />
      </PrivateRoute>
      <PrivateRoute exact path="/add">
        <AddQuestionForm />
      </PrivateRoute>
      <PrivateRoute exact path="/questions/:questionId">
        <QuestionPage />
      </PrivateRoute>
      <Redirect to="/login" />
    </Switch>
  );
}
