import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  ButtonBase,
  Grid,
  IconButton,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckAnim from "../iconAnimation/checkAnim";
import "../../css/App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(2),
    padding: theme.spacing(1),
    width: "100%",
    height: "5vh",
  },
  checkbox: {
    marginRight: theme.spacing(2),
  },
}));

export default function TaskItem() {
  const classes = useStyles();
  return (
    <React.Fragment>
      <div className={classes.root} style={{ backgroundColor: "#F4F6FF" }}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item container justify="flex-start" alignItems="baseline" xs>
            <Grid item xs={1} className={classes.checkbox}>
              <CheckAnim />
            </Grid>
            <Grid item xs>
              <Typography>aaa</Typography>
            </Grid>
          </Grid>
          <Grid item xs={1}>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
