import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import errorPage from './pages/errorPage';
import landingPage from './pages/landingPage';
import newPwdPage from './pages/newPwdPage';
import signupPage from './pages/signupPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signin" component={landingPage} />
        <Route exact path="/signup" component={signupPage} />
        <Route exact path="/forgotpwd" component={newPwdPage} />
        <Route path="*" component={errorPage} />
      </Switch>
    </Router>
  );
}

export default App;
