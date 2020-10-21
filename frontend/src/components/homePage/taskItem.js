import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Grid, IconButton, Typography } from "@material-ui/core";
import ClearIcon from '@material-ui/icons/Clear';
import CheckAnim from "../iconAnimation/checkAnim";
import "../../css/App.css";

// url axios
import axios from "axios";
import { URL } from "../../config";

// react-alert
import { useAlert } from "react-alert";
import { useContext } from "react";
import { FetchStatusContext } from "./categoryList";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(2),
    width: "100%",
  },
  checkbox: {
    marginRight: theme.spacing(2),
  },
  content: {
    // height: 18,
    position: "relative"
  },
  deletebtn: {
    position: "absolute",
    top: 2,
    right: 6,
    // marginRight: theme.spacing(2),
  },
}));

export default function TaskItem(props) {
  const { description, status, taskId } = props.taskInfo;
  const fetchData = props.fetchData;
  const classes = useStyles();
  const alert = useAlert();

  const fetchStatus = useContext(FetchStatusContext);

  const deleteTask = async () => {
    await axios.post(URL + "deleteTaskByTaskId?task_id=" + taskId);
    fetchData();
    fetchStatus()
    alert.success("Deleted task!");
  };

  return (
    <React.Fragment>
      <div className={classes.root} style={{ backgroundColor: "#F4F6FF", padding: "0 8px" }}>
        <Grid
          className={classes.content}
          container
          direction="row"
          justify="space-between"
          alignItems="center"
        >
          <Grid item container justify="flex-start" alignItems="baseline" xs>
            <Grid item xs={1} className={classes.checkbox}>
              <CheckAnim status={status} tid={taskId} fetchData={fetchData}/>
            </Grid>
            <Grid item xs>
              {status == true ? (
                <Typography variant="body2" component="p" style={{textDecoration: 'line-through', wordWrap: "break-word", color:"lightgrey" }}>{description}</Typography>
              ) : (
                <Typography variant="body2" component="p"style={{ wordWrap: "break-word"}} >{description}</Typography>
              )}
            </Grid>
          </Grid>
          <IconButton className={classes.deletebtn} onClick={deleteTask}>
            <ClearIcon style={{ color: "#909297E6", fontSize: "12px"}}/>
          </IconButton>
        </Grid>
      </div>
    </React.Fragment>
  );
}
