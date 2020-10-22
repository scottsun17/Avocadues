import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import errorPage from './pages/errorPage';
import landingPage from './pages/landingPage';
import newPwdPage from './pages/newPwdPage';
import signupPage from './pages/signupPage';
import homePage from './pages/homePage';


export default function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signin" component={landingPage} />
        <Route exact path="/signup" component={signupPage} />
        <Route exact path="/forgotpwd" component={newPwdPage} />
        <Route exact path="/home" component={homePage} />
        <Route path="*" component={errorPage} />
      </Switch>
    </Router>
  );
}

