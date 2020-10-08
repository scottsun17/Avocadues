import React from 'react';
import '../css/App.css';
import SummaryBox from '../components/homePage/summaryBox';
import TaskList from '../components/homePage/taskList'

// material ui
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Paper, Typography, Container, CssBaseline, Grid } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  paper: {
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      borderRadius: theme.spacing(2),
      padding: theme.spacing(4),
      height: "80vh",
  },
  title: {
      marginTop: theme.spacing(2)
  },
  backBtn: {
      marginTop: theme.spacing(4)
  }
}));

const Home = () => {
  const classes = useStyles();
  return (
    <Container component="main" maxWidth="lg">
      <CssBaseline />
      <Paper className={classes.paper}>
        <Grid container>
          <Grid item xs={3}>
            <SummaryBox/>
          </Grid>
          <Grid item xs={9}>
            <TaskList/>
          </Grid>
        </Grid>
      </Paper>
     </Container>
  
  );
};

const homePage = () => {
  return (
    <div className="App">
      <Home />
    </div>
  )

}
export default homePage;