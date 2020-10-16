import React from 'react';
import '../css/App.css';
import SummaryBox from '../components/homePage/summaryBox';
import TaskList from '../components/homePage/taskList'
import HeaderInfo from "../components/homePage/headerInfo";

// material ui
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Paper, Typography, Container, CssBaseline, Grid } from '@material-ui/core';



const useStyles = makeStyles((theme) => ({
  root: {
    margin: theme.spacing(0, 10),
    borderRadius: theme.spacing(2),
  },
  paper: {
    padding: theme.spacing(2, 6),
  },
  title: {
    marginTop: theme.spacing(2),
  },
  backBtn: {
    marginTop: theme.spacing(4),
  }
}));

const Home = () => {
  const classes = useStyles();

  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Paper className={classes.root}>
        <HeaderInfo />
        <Grid container className={classes.paper}>
          <Grid item xs={4}>
            <SummaryBox />
          </Grid>
          <Grid item xs={8}>
            <TaskList />
          </Grid>
        </Grid>
      </Paper>
    </Container>

  );
};

const homePage = (props) => {
  // const {email, displayName, uid } = props.location.query.user.user;

  return (
    <div className="App">
      {/* <pre>{JSON.stringify(email)}</pre> */}
      <Home />
    </div>
  )

}
export default homePage;