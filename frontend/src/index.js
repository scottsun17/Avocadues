import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./assets/theme";
import * as serviceWorker from "./serviceWorker";

// redux
import { Provider } from "react-redux";
import { createStore, applyMiddleware } from "redux";
import promiseMiddleware from "redux-promise";
import ReduxThunk from "redux-thunk";
import rootReducer from "./redux/reducers";
import FloatingActionButton from "./components/contactUs";

import Alert from "@material-ui/lab/Alert";
import {
  positions,
  Provider as AlertProvider,
  transitions,
} from "react-alert";

import "./css/index.css";

const AlertTemplate = ({ style, options, message, close }) => (
  <div style={style}>
    {options.type === "info" && (
      <Alert severity="info" variant="filled" onClose={close}>
        {message}
      </Alert>
    )}
    {options.type === "success" && (
      <Alert severity="success" variant="filled" onClose={close}>
        {message}
      </Alert>
    )}
    {options.type === "error" && (
      <Alert severity="error" variant="filled" onClose={close}>
        {message}
      </Alert>
    )}
  </div>
);

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  transition: transitions.FADE,
};

const createStoreWithMiddleware = applyMiddleware(
  promiseMiddleware,
  ReduxThunk
)(createStore);

ReactDOM.render(
  <Provider
    store={createStoreWithMiddleware(
      rootReducer,
      window.__REDUX_DEVTOOLS_EXTENSION__ &&
        window.__REDUX_DEVTOOLS_EXTENSION__()
    )}
  >
    <ThemeProvider theme={theme}>
      <AlertProvider template={AlertTemplate} {...options}>
        <App />
        <FloatingActionButton />
      </AlertProvider>
    </ThemeProvider>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
