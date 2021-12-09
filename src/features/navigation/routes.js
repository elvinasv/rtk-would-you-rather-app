import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from '../authorization/login';
import Dashboard from '../dashboard/dashboard';
import Leaderboard from '../leaderboard/leaderboard';
import AddQuestionForm from '../questions/add-question-form';
import SingleQuestionPage from '../questions/single-question-page';

export default function Routes() {
  return (
    <Switch>
      <Route exact path="/">
        <Dashboard />
      </Route>
      <Route exact path="/login">
        <LoginPage />
      </Route>
      <Route exact path="/leaderboard">
        <Leaderboard />
      </Route>
      <Route exact path="/add">
        <AddQuestionForm />
      </Route>
      <Route exact path="/questions/:questionId">
        <SingleQuestionPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}
