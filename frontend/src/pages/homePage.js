import React from "react";
import "../css/App.css";
import SummaryBox from "../components/homePage/summaryBox";
import TaskList from "../components/homePage/taskList";
import HeaderInfo from "../components/homePage/headerInfo";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Container, CssBaseline, Grid } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2, 8),
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
  console.log(props);

  return (
    <React.Fragment>
      {user !== undefined ? (
        <UserContext.Provider value={user}>
          <Container component="main" maxWidth="md">
            <CssBaseline />
            <Paper className={classes.root}>
              <HeaderInfo />
              <Grid container className={classes.paper} justify="center">
                <Grid item xs={4}>
                  <SummaryBox />
                </Grid>
                <Grid item xs={8}>
                  <TaskList />
                </Grid>
              </Grid>
            </Paper>
          </Container>
        </UserContext.Provider>
      ) : (
        <div> loading...</div>
      )}
    </React.Fragment>
  );
};

const homePage = (props) => {
  const user = props.location.query.user.user;

  return (
    <div className="App">
      {/* <pre>{JSON.stringify(email)}</pre> */}
      <Home user={user} />
    </div>
  );
};
export default homePage;
