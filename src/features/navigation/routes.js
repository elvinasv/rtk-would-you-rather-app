import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import LoginPage from '../authorization/login';
import Dashboard from '../dashboard/dashboard';
import Leaderboard from '../leaderboard/leaderboard';
import AddQuestionForm from '../question/add-question-form';
import QuestionPage from '../question/question-page';

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
        <QuestionPage />
      </Route>
      <Redirect to="/" />
    </Switch>
  );
}
