import React, { useEffect } from "react";
import "../css/App.css";
import HeaderInfo from "../components/homePage/headerInfo";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Container, CssBaseline } from "@material-ui/core";

import CategoryList from "../components/homePage/categoryList";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(2),
    margin: theme.spacing(0, 12),
    height: '72vh',
    minHeight: 580,
    minWidth: 800,
  },
  title: {
    marginTop: theme.spacing(2),
  },
  backBtn: {
    marginTop: theme.spacing(4),
  },
}));

export const UserContext = React.createContext();

const Home = (props) => {
  const classes = useStyles();
  const user = props.user;

  return (
    <React.Fragment>
      <UserContext.Provider value={user}>
        <Container component="main" maxWidth="lg">
          <CssBaseline />
          <Paper className={classes.root}>
            <HeaderInfo />
            <CategoryList />
          </Paper>
        </Container>
      </UserContext.Provider>
    </React.Fragment>
  );
};

const homePage = (props) => {
  const user = props.location.query.user.user;

  return (
    <div className="App">
      {user !== undefined ? <Home user={user} /> : <div> loading...</div>}
    </div>
  );
};
export default homePage;
