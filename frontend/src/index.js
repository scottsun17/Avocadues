import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./assets/theme";
import * as serviceWorker from "./serviceWorker";

import Alert from '@material-ui/lab/Alert';
import { positions, Provider, transitions } from "react-alert";
// import AlertTemplate from "react-alert-template-basic";

import "./css/index.css";

const AlertTemplate = ({ style, options, message, close }) => (
  <div style={style}>
    {options.type === 'info' && <Alert severity="info" variant="filled" onClose={close}>{message}</Alert>}
    {options.type === 'success' && <Alert severity="success" variant="filled" onClose={close}>{message}</Alert>}
    {options.type === 'error' && <Alert severity="error" variant="filled" onClose={close}>{message}</Alert>}
  </div>
)

const options = {
  position: positions.BOTTOM_CENTER,
  timeout: 5000,
  transition: transitions.FADE
};

ReactDOM.render(
    <ThemeProvider theme={theme}>
      <Provider template={AlertTemplate} {...options}>
        <App />
      </Provider>
    </ThemeProvider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
