import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  IconButton,
  Typography,
} from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckAnim from "../iconAnimation/checkAnim";
import "../../css/App.css";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(2),
    width: "100%",
  },
  checkbox: {
    marginRight: theme.spacing(2),
  },
  content: {
    height: 18,
  },
  deletebtn: {
    marginRight: theme.spacing(2),
  }
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
            <Grid item xs={1}>
              <Typography>
                aaaa
              </Typography>
            </Grid>
          </Grid>
          <Grid item xs={1} className={classes.deletebtn}>
            <IconButton>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
