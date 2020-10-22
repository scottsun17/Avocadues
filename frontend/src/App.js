import React from "react";
import {
  BrowserRouter as Router,
  Redirect,
  Route,
  Switch,
} from "react-router-dom";
import errorPage from "./pages/errorPage";
import landingPage from "./pages/landingPage";
import newPwdPage from "./pages/newPwdPage";
import signupPage from "./pages/signupPage";
import homePage from "./pages/homePage";
import { useSelector } from "react-redux";

export default function App() {

  return (
    <Router>
      <Switch>
        <Route exact path="/" render={() =>  (<Redirect to="/signin" />)} ></Route>
        <Route exact path="/signin" component={landingPage} />
        <Route exact path="/signup" component={signupPage} />
        <Route exact path="/forgotpwd" component={newPwdPage} />
        <Route exact path="/home" component={homePage} />
        <Route exact path="/404" component={errorPage} />
        <Redirect from="/*" to="/404" />
      </Switch>
    </Router>
  );
}
