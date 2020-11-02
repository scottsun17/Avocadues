import React, { useEffect } from "react";
import "../css/App.css";
import HeaderInfo from "../components/homePage/headerInfo";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Container, CssBaseline, Hidden } from "@material-ui/core";

import CategoryList from "../components/homePage/categoryList";
import useLocalStorage from "../components/useLocalStorage";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(2),
    height: "78vh",
    minHeight: 580,
    [theme.breakpoints.up('md')]: {
      margin: '0 14%',
    },
    [theme.breakpoints.down('md')]: {
      height: "80vh",
      margin: '0 8%',
    },
    [theme.breakpoints.down('xs')]: {
      height: "81vh",
      margin: 8,
    },
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
  const [user, setUser] = useLocalStorage("user", null);

  return (
    <React.Fragment>
      <UserContext.Provider value={user}>
        <CssBaseline />
        <Paper className={classes.root}>
          <HeaderInfo />
          <CategoryList />
        </Paper>
      </UserContext.Provider>
    </React.Fragment>
  );
};

const homePage = () => {
  return (
    <div className="App">
      <Home />
    </div>
  );
};
export default homePage;
