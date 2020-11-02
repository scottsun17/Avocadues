import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  Grid,
  IconButton,
  List,
  ListItem,
  Modal,
  Typography,
  Backdrop,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Hidden,
  Popover,
} from "@material-ui/core";
import TaskList from "./taskList";

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CloseIcon from "@material-ui/icons/Close";
import FormatListNumberedRtlIcon from '@material-ui/icons/FormatListNumberedRtl';

// url axios
import axios from "axios";
import { URL } from "../../config";
// form
import { useForm } from "react-hook-form";
import "../../css/App.css";
// react-alert
import { useAlert } from "react-alert";
import { grey } from "@material-ui/core/colors";
import { UserContext } from "../../pages/homePage";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: theme.spacing(2, 6),
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(1, 4),
    },
    [theme.breakpoints.down('xs')]: {
      padding: theme.spacing(0.5, 2),
    },
  },
  userStatus: {
    minHeight: "20vh",
    padding: theme.spacing(4, 1),
    marginBottom: theme.spacing(1),
  },
  userStatusMobile: {
    padding: '0 36px',
    marginBottom: theme.spacing(1),
  },
  categoryBtns: {
    maxHeight: "30vh",
    overflow: "auto",
  },
  listItem: {
    textTransform: "none",
    display: "flex",
    justifyContent: "start",
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(1),
    marginBottom: 8,
    "&:focus": {
      color: "#ffffff",
      backgroundColor: "#AED580",
    },
  },
  addCategroy: {
    textTransform: "none",
    display: "flex",
    justifyContent: "start",
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(1),
  },
  icon: {
    paddingTop: 6,
    fontSize: 18,
  },
  icon2: {
    fontSize: 18,
  },
  closeIcon: {
    fontSize: 12,
  },
  categoryContent: {
    marginLeft: 8,
  },
  button: {
    height: "3rem",
    borderRadius: "8px",
    color: '#FDFDFD',
    marginRight: 12,
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
    height: 360,
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(4),
    outline: 0,
  },
  inputCard: {
    border: "0px solid",
    borderRadius: "8px",
    backgroundColor: grey[200],
    alignItems: "center",
    width: "100%",
    height: "3rem",
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
  formControl: {
    margin: theme.spacing(1),
    minWidth: 200,
  },
}));

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box>{children}</Box>}
    </div>
  );
}

export const FetchStatusContext = React.createContext();

const CategoryList = (props) => {
  const classes = useStyles();
  const user = useContext(UserContext);
  const alert = useAlert();

  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [categoryArr, setCategories] = React.useState([]);
  const [categroyName, setCategroyName] = React.useState("");
  const [color, setColor] = React.useState("");
  const [userStatus, setUserStatus] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleChange = (event) => {
    setColor(event.target.value);
  };

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      content: "",
      color: "",
    },
  });

  const fetchCategories = async () => {
    const res = await axios.post(URL + "getCategoryByUid?uid=" + user.uid);
    setCategories(res.data);
  };

  const fetchStatus = async () => {
    const res = await axios.post(
      URL + "getTaskStatusCountByUserId?uid=" + user.uid
    );
    setUserStatus(res.data);
  };

  const onSubmit = async (data) => {
    setCategroyName(data.content);
    const res = await axios.post(
      URL +
        "addCategory?category_name=" +
        data.content +
        "&color=" +
        color +
        "&uid=" +
        user.uid
    );
    fetchCategories();
    alert.success("Categroy added!");
    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const deleteCategory = async (cid) => {
    const res = await axios.post(
      URL + "deleteCategoryByCategoryId?category_id=" + cid
    );
    fetchCategories();
    setValue(value - 1);
    alert.success("Categroy deleted!");
  };

  const categoryClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const categoryClose = () => {
    setAnchorEl(null);
  };

  const categoryOpen = Boolean(anchorEl);
  

  let date = new Date().toLocaleDateString();

  useEffect(() => {
    fetchCategories();
    fetchStatus();
  }, [categroyName, value]);

  return (
    <div className={classes.root}>
      <FetchStatusContext.Provider value={fetchStatus}>
        <Grid container spacing={2} justify="space-around" style={{marginTop: '8px'}}>
          <Hidden mdUp>
            <Grid container item xs={12} >
              <Grid item xs={8} align="left" style={{paddingLeft: 12}}>
                <Typography variant="h5" component="div">
                  <Box fontWeight="600">Today is {date}</Box>
                </Typography>
                {userStatus ? (
                  <Typography variant="body2" component="p">
                    Today you have {userStatus.unfinshedCount} to dos, and{" "}
                    {userStatus.finishedCount} are done.
                  </Typography>
                ) : (
                    <div>loading...</div>
                  )}
              </Grid>
              <Grid item xs align="right">
                <Button
                  variant="contained"
                  color="primary"
                  className={classes.button}
                  endIcon={<FormatListNumberedRtlIcon />}
                  onClick={categoryClick}
                  disableElevation
                >
                  <Typography >Tasks</Typography>
                </Button>
                <Popover
                  open={categoryOpen}
                  anchorEl={anchorEl}
                  onClose={categoryClose}
                  anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  elevation={2}
                >
                  <Grid container style={{padding: '8px'}}>
                    <Grid item xs={12}>
                      <List className={classes.categoryBtns}>
                        {categoryArr.length ? (
                          categoryArr.map((item, index) => {
                            return (
                              <ListItem
                                className={classes.listItem}
                                key={item.category_id}
                                button
                                onClick={() => setValue(index)}
                                disableTouchRipple
                              >
                                <Grid
                                  container
                                  direction="row"
                                  justify="space-between"
                                  alignItems="baseline"
                                >
                                  <Grid item xs>
                                    <FiberManualRecordIcon
                                      className={classes.icon}
                                      style={{ color: `${item.color}` }}
                                    />
                                    <Typography
                                      variant="body2"
                                      component="span"
                                      className={classes.categoryContent}
                                    >
                                      {item.categoryName}
                                    </Typography>
                                  </Grid>
                                  <Grid item xs={1}>
                                    <IconButton
                                      style={{ padding: 4 }}
                                      onClick={() => {
                                        deleteCategory(item.category_id);
                                      }}
                                      className={classes.iconButton}
                                    >
                                      <CloseIcon className={classes.closeIcon} />
                                    </IconButton>
                                  </Grid>
                                </Grid>
                              </ListItem>
                            );
                          })
                        ) : (
                            <div className={classes.categoryBtns}>Loading</div>
                          )}
                      </List>
                    </Grid>
                    <Grid item xs={12}>
                      <ListItem
                        className={classes.addCategroy}
                        button
                        onClick={handleOpen}
                        disableTouchRipple
                      >
                        <Grid
                          container
                          direction="row"
                          justify="space-between"
                          alignItems="baseline"
                        >
                          <Grid item xs>
                            <AddCircleIcon className={classes.icon} />
                            <Typography
                              variant="body2"
                              component="span"
                              className={classes.categoryContent}
                            >
                              Add New
                            </Typography>
                          </Grid>
                        </Grid>
                      </ListItem>
                    </Grid>

                  </Grid> 
                </Popover>
              </Grid>
            </Grid>
          </Hidden>
          <Hidden smDown>
            <Grid item md={3}>
              <div className={classes.userStatus}>
                <Typography variant="h5" component="div">
                  <Box fontWeight="600">Today is {date}</Box>
                </Typography>
                {userStatus ? (
                  <Typography variant="body1" component="p">
                    Today you have {userStatus.unfinshedCount} to dos, and{" "}
                    {userStatus.finishedCount} are done.
                  </Typography>
                ) : (
                  <div>loading...</div>
                )}
              </div>
              <Grid container>
                <Grid item xs={12}>
                  <List className={classes.categoryBtns}>
                    {categoryArr.length ? (
                      categoryArr.map((item, index) => {
                        return (
                          <ListItem
                            className={classes.listItem}
                            key={item.category_id}
                            button
                            onClick={() => setValue(index)}
                            disableTouchRipple
                          >
                            <Grid
                              container
                              direction="row"
                              justify="space-between"
                              alignItems="baseline"
                            >
                              <Grid item xs>
                                <FiberManualRecordIcon
                                  className={classes.icon}
                                  style={{ color: `${item.color}` }}
                                />
                                <Typography
                                  variant="body2"
                                  component="span"
                                  className={classes.categoryContent}
                                >
                                  {item.categoryName}
                                </Typography>
                              </Grid>
                              <Grid item xs={1}>
                                <IconButton
                                  style={{ padding: 4 }}
                                  onClick={() => {
                                    deleteCategory(item.category_id);
                                  }}
                                  className={classes.iconButton}
                                >
                                  <CloseIcon className={classes.closeIcon} />
                                </IconButton>
                              </Grid>
                            </Grid>
                          </ListItem>
                        );
                      })
                    ) : (
                      <div className={classes.categoryBtns}>Loading</div>
                    )}
                  </List>
                </Grid>
                <Grid item xs={12}>
                  <ListItem
                    className={classes.addCategroy}
                    button
                    onClick={handleOpen}
                    disableTouchRipple
                  >
                    <Grid
                      container
                      direction="row"
                      justify="space-between"
                      alignItems="baseline"
                    >
                      <Grid item xs>
                        <AddCircleIcon className={classes.icon} />
                        <Typography
                          variant="body2"
                          component="span"
                          className={classes.categoryContent}
                        >
                          Add New
                        </Typography>
                      </Grid>
                    </Grid>
                  </ListItem>
                </Grid>
              </Grid>
            </Grid>
          </Hidden>
          <Grid item xs={12} md={9}>
            {categoryArr.length ? (
              categoryArr.map((item, index) => {
                return (
                  <TabPanel value={value} index={index} key={item.category_id}>
                    <TaskList
                      cid={item.category_id}
                      fetchStatus={fetchStatus}
                    />
                  </TabPanel>
                );
              })
            ) : (
              <div className={classes.categoryBtns}>Loading</div>
            )}
          </Grid>
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
                <Box fontWeight="300">Add New Category</Box>
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
                      placeholder="New Category"
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
                    <FormControl
                      className={classes.formControl}
                      name="color"
                    >
                      <InputLabel>Add Color</InputLabel>
                      <Select value={color} onChange={handleChange}>
                        <MenuItem value="%23e66767">
                          <FiberManualRecordIcon
                            className={classes.icon2}
                            style={{ color: "#e66767" }}
                          />
                          <Typography
                            variant="body2"
                            component="span"
                            className={classes.categoryContent}
                          >
                            Red
                                </Typography>
                        </MenuItem>
                        <MenuItem value="%231abc9c">
                          <FiberManualRecordIcon
                            className={classes.icon2}
                            style={{ color: "#1abc9c" }}
                          />
                          <Typography
                            variant="body2"
                            component="span"
                            className={classes.categoryContent}
                          >
                            Green
                                </Typography>
                        </MenuItem>
                        <MenuItem value="%23778beb">
                          <FiberManualRecordIcon
                            className={classes.icon2}
                            style={{ color: "#778beb" }}
                          />
                          <Typography
                            variant="body2"
                            component="span"
                            className={classes.categoryContent}
                          >
                            Blue
                                </Typography>
                        </MenuItem>
                        <MenuItem value="%23a4b0be">
                          <FiberManualRecordIcon
                            className={classes.icon2}
                            style={{ color: "#a4b0be" }}
                          />
                          <Typography
                            variant="body2"
                            component="span"
                            className={classes.categoryContent}
                          >
                            Grey
                                </Typography>
                        </MenuItem>
                        <MenuItem value="%232f3542">
                          <FiberManualRecordIcon
                            className={classes.icon2}
                            style={{ color: "#2f3542" }}
                          />
                          <Typography
                            variant="body2"
                            component="span"
                            className={classes.categoryContent}
                          >
                            Dark
                                </Typography>
                        </MenuItem>
                        <MenuItem value="%23f8a5c2">
                          <FiberManualRecordIcon
                            className={classes.icon2}
                            style={{ color: "#f8a5c2" }}
                          />
                          <Typography
                            variant="body2"
                            component="span"
                            className={classes.categoryContent}
                          >
                            Pink
                                </Typography>
                        </MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} style={{ marginTop: 24 }}>
                    <Button
                      variant="contained"
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
      </FetchStatusContext.Provider>
    </div>
  );
};

export default CategoryList;
