import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import errorPage from './pages/errorPage';
import landingPage from './pages/landingPage';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/signin" component={landingPage} />
        <Route path="*" component={errorPage} />
      </Switch>
    </Router>
  );
}

export default App;
