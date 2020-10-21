import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import errorPage from './pages/errorPage';
import landingPage from './pages/landingPage';
import newPwdPage from './pages/newPwdPage';
import signupPage from './pages/signupPage';
import homePage from './pages/homePage';
import firebase from './components/firebase';


export default function App() {
  const [firebaseInitialized, setFirebaseInitialized] = useState(false)

  useEffect(()=>{
    firebase.isInitialized().then(val => {
      setFirebaseInitialized(val)
    })
  })
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

