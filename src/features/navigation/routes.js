import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { LoginPage } from '../authorization/login';
import { Dashboard } from '../dashboard/dashboard';
import { Leaderboard } from '../leaderboard/leaderboard';
import { AddQuestionForm } from '../question/add-question-form';
import { QuestionPage } from '../question/question-page';
import { PageNotFound } from '../page-not-found/page-not-found';

import { PrivateRoute } from './private-route';

export function Routes() {
  return (
    <Switch>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/404">
        <PageNotFound />
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
      <PrivateRoute path="/questions/:questionId">
        <QuestionPage />
      </PrivateRoute>
      <Redirect to="404" />
    </Switch>
  );
}
