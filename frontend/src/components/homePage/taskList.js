import React, { useEffect } from "react";
// import PropTypes from "prop-types";
import { makeStyles, withStyles } from "@material-ui/core/styles";
import {
  Backdrop,
  Box,
  Button,
  ButtonBase,
  Fab,
  Grid,
  Hidden,
  List,
  ListItem,
  Modal,
  Tab,
  Tabs,
  Typography,
} from "@material-ui/core";
import AddIcon from "@material-ui/icons/Add";
import { grey } from "@material-ui/core/colors";
// url axios
import axios from "axios";
import { URL } from "../../config";
// form
import { useForm } from "react-hook-form";
// framer motion
import { motion } from "framer-motion";
// import { useSpring, animated } from "react-spring/web.cjs"; // web.cjs is required for IE 11 support
import TaskItem from "./taskItem";
import "../../css/App.css";
// react-alert
import { useAlert } from "react-alert";
import { useContext } from "react";
import { FetchStatusContext } from "./categoryList";
import img from "../../assets/imgs/loading.png";

const useStyles = makeStyles((theme) => ({
  taskList: {
    width: "100%",
    minHeight: "60vh",
    borderRadius: theme.spacing(4),
    padding: theme.spacing(4, 3, 1, 3),
    [theme.breakpoints.down('sm')]: {
      padding: theme.spacing(2, 1, 0.5, 1),
    },
  },
  createBtn: {
    width: 52,
    height: 52,
    backgroundColor: "#aed581",
    borderRadius: "50%",
    color: "white",
    [theme.breakpoints.down('sm')]: {
      width: 36,
      height: 36,
    },
  },
  addIcon: {
    fontSize: 32,
    [theme.breakpoints.down('sm')]: {
      fontSize: 24,
    }
  },
  panel: {
    padding: theme.spacing(4),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(2),
    },
  },

  list: {
    overflow: "auto",
    maxHeight: "35vh",
    [theme.breakpoints.down('xs')]: {
      maxHeight: "40vh",
    }
  },
  taskcontent: {
    height: "300px",
  },
  header: {
    paddingRight: theme.spacing(2),
  },
  fab: {
    position: 'fixed',
    padding: theme.spacing(2, 3),
    bottom: theme.spacing(4),
    right: theme.spacing(6),
  },
  // modal
  modal: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  form: {
    width: "100%", // Fix IE 11 issue.
    marginTop: theme.spacing(3),
  },
  paper: {
    width: 400,
    minHeight: "30vh",
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
    outline: 0,
  },
  inputCard: {
    height: 48,
    border: "0px solid",
    borderRadius: "8px",
    backgroundColor: grey[200],
    alignItems: "center",
    width: "100%",
    marginBottom: theme.spacing(1),
    padding: theme.spacing(1.5),
    outline: "none",
  },
  submit: {
    textTransform: "none",
    width: "100%",
    height: "3rem",
    borderRadius: "8px",
    padding: theme.spacing(0, 6),
    flexGrow: 1,
  },

}));

const MyTabs = withStyles((theme) => ({
  root: {
    borderBottom: "1px solid #f1f2f6",
    maxWidth: 418,
    [theme.breakpoints.down('sm')]: {
      maxWidth: '100%',
    },
    paddingLeft: theme.spacing(2),
  },
  indicator: {
    backgroundColor: "#aed581",
  },
}))(Tabs);

const MyTab = withStyles((theme) => ({
  root: {
    textTransform: "none",
    minWidth: 90,
    fontWeight: theme.typography.fontWeightRegular,
    transition: "easeInOut 0.4s",
    fontSize: 18,
    padding: 0,
    [theme.breakpoints.down('sm')]: {
      fontSize: 16,
    },
    "&:hover": {
      fontSize: "2.2rem",
      color: "#A4C1A1",
      opacity: 1,
      marginBottom: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
      [theme.breakpoints.down('xs')]: {
        fontSize: "1.5rem",
      }
    },
    "&$selected": {
      color: "#A4C1A1",
      marginBottom: theme.spacing(1),
      fontWeight: theme.typography.fontWeightMedium,
    },
    "&:focus": {
      color: "#A4C1A1",
    },
  },
  selected: {
    fontSize: "2.2rem",
    [theme.breakpoints.down('xs')]: {
      fontSize: "1.5rem",
    }
  },
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
  const { children, value, index, ...other } = props;
  const fetchStatus = props.fetchStatus;
  const classes = useStyles();

  return (
    <div hidden={value !== index} {...other} className={classes.panel}>
      {value === index && <div>{children}</div>}
    </div>
  );
}

export default function TaskList(props) {
  const classes = useStyles();
  const cid = props.cid;
  const alert = useAlert();

  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [taskArr, setTaskArr] = React.useState([]);
  const [inProcess, setInProcess] = React.useState([]);
  const [done, setDone] = React.useState([]);
  const [taskDescription, setTaskDescription] = React.useState("");

  const fetchStatus = useContext(FetchStatusContext);

  const fetchTasks = async () => {
    const res = await axios.post(
      URL + "getTasksByCategoryId?category_id=" + cid
    );
    const arr = splitTaskByStatus(res.data);
    setTaskArr(res.data.reverse());
    setInProcess(arr.inProcess);
    setDone(arr.done);
  };

  const splitTaskByStatus = (arr) => {
    const arr1 = []; // In process
    const arr2 = []; // Done
    arr.forEach((ele) => {
      if (ele.status) {
        arr2.push(ele);
      } else {
        arr1.push(ele);
      }
    });
    return { inProcess: arr1, done: arr2 };
  };

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data) => {
    setTaskDescription(data.content);
    await axios.post(
      URL + "addNewTask?description=" + data.content + "&category_id=" + cid
    );
    fetchTasks();
    fetchStatus();
    alert.success("Task added!");
    handleClose();
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  useEffect(() => {
    fetchTasks();
    fetchStatus();
  }, [taskDescription]);

  return (
    <React.Fragment>
      <div className={`taskList-bgcolor ${classes.taskList}`}>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="center"
          className={classes.header}
        >
          <Grid item>
            <MyTabs value={value} onChange={handleChange}>
              <MyTab label="All"></MyTab>
              <MyTab label="In progress"></MyTab>
              <MyTab label="Done"></MyTab>
            </MyTabs>
          </Grid>
          <Grid item>
            <Hidden xsDown>
              <motion.div whileHover={{ scale: 1.1 }}>
                <ButtonBase
                  variant="contained"
                  color="primary"
                  className={classes.createBtn}
                  onClick={handleOpen}
                >
                  <AddIcon className={classes.addIcon} />
                </ButtonBase>
              </motion.div>
            </Hidden>
            <Modal
              className={classes.modal}
              open={open}
              onClose={handleClose}
              closeAfterTransition
              BackdropComponent={Backdrop}
              BackdropProps={{
                timeout: 500,
              }}
            >
              <div className={classes.paper}>
                <Typography variant="h5" component="div">
                  <Box fontWeight="300">Add New Task</Box>
                </Typography>
                <form
                  className={classes.form}
                  onSubmit={handleSubmit(onSubmit)}
                >
                  <Grid container alignItems="center">
                    <Grid item xs={12}>
                      <input
                        name="content"
                        ref={register({ required: true })}
                        className={classes.inputCard}
                        placeholder="Task"
                      />
                      {errors.content && (
                        <Typography
                          variant="caption"
                          component="p"
                          color="error"
                          style={{ marginBottom: "4px" }}
                        >
                          This field is required
                        </Typography>
                      )}
                    </Grid>
                    <Grid item xs={12} style={{ marginTop: 24 }}>
                      <Button
                        variant="contained"
                        fullWidth
                        type="submit"
                        disableElevation
                        className={`btn-grad ${classes.submit}`}
                      >
                        Add
                      </Button>
                    </Grid>
                  </Grid>
                </form>
              </div>
            </Modal>
          </Grid>
        </Grid>
        <TabPanel value={value} index={0}>
          <List className={classes.list}>
            {taskArr ? (
              taskArr.length != 0 ? (
                taskArr.map((item) => {
                  return (
                    <ListItem key={item.taskId}>
                      <TaskItem taskInfo={item} fetchData={fetchTasks} />
                    </ListItem>
                  );
                })
              ) : (
                <Grid
                  className={classes.taskcontent}
                  container
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs align="center">
                    <img width="50px" src={img} alt="Loadinglogo" />
                    <Typography
                      component="p"
                      variant="body1"
                      align="center"
                      style={{ marginTop: "6px" }}
                    >
                      Nothing To Do!
                    </Typography>
                  </Grid>
                </Grid>
              )
            ) : (
              <div>Loading...</div>
            )}
          </List>
        </TabPanel>
        <TabPanel value={value} index={1}>
          <List className={classes.list}>
            {inProcess ? (
              inProcess.length != 0 ? (
                inProcess.map((item) => {
                  return (
                    <ListItem key={item.taskId}>
                      <TaskItem taskInfo={item} fetchData={fetchTasks} />
                    </ListItem>
                  );
                })
              ) : (
                <Grid
                  className={classes.taskcontent}
                  container
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs align="center">
                    <img width="50px" src={img} alt="Loadinglogo" />
                    <Typography
                      component="p"
                      variant="body1"
                      align="center"
                      style={{ marginTop: "6px" }}
                    >
                      Create A New To-Do!
                    </Typography>
                  </Grid>
                </Grid>
              )
            ) : (
              <div>Loading...</div>
            )}
          </List>
        </TabPanel>
        <TabPanel value={value} index={2}>
          <List className={classes.list}>
            {done ? (
              done.length != 0 ? (
                done.map((item) => {
                  return (
                    <ListItem key={item.taskId}>
                      <TaskItem taskInfo={item} fetchData={fetchTasks} />
                    </ListItem>
                  );
                })
              ) : (
                <Grid
                  className={classes.taskcontent}
                  container
                  justify="center"
                  alignItems="center"
                >
                  <Grid item xs align="center">
                    <img width="50px" src={img} alt="Loadinglogo" />
                    <Typography
                      component="p"
                      variant="body1"
                      align="center"
                      style={{ marginTop: "6px" }}
                    >
                      All Done, Great!
                    </Typography>
                  </Grid>
                </Grid>
              )
            ) : (
              <div>Loading...</div>
            )}
          </List>
        </TabPanel>
        <Hidden smUp>
          <Fab className={classes.fab} color="primary" onClick={handleOpen} style={{ color: "#fff" }}>
            <AddIcon/>
          </Fab>
        </Hidden>
      </div>
    </React.Fragment>
  );
}
