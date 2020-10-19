import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton, Typography } from "@material-ui/core";
import DeleteIcon from "@material-ui/icons/Delete";
import CheckAnim from "../iconAnimation/checkAnim";
import "../../css/App.css";

// url axios
import axios from "axios";
import { URL } from "../../config";

// react-alert
import { useAlert } from "react-alert";

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
  },
}));

export default function TaskItem(props) {
  const { description, status, taskId } = props.taskInfo;
  const fetchData = props.fetchData;
  const classes = useStyles();
  const alert = useAlert();

  const deleteTask = async () => {
    await axios.post(URL + "deleteTaskByTaskId?task_id=" + taskId);
    fetchData();
    alert.success("Deleted task!");
  };

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
              <CheckAnim status={status} tid={taskId} />
            </Grid>
            <Grid item xs>
              {status == true ? (
                <Typography variant="body2" variant="p" style={{textDecoration: 'line-through'}}>{description}</Typography>
              ) : (
                <Typography variant="body2" variant="p">{description}</Typography>
              )}
            </Grid>
          </Grid>
          <Grid item xs={1} className={classes.deletebtn}>
            <IconButton onClick={deleteTask}>
              <DeleteIcon />
            </IconButton>
          </Grid>
        </Grid>
      </div>
    </React.Fragment>
  );
}
