import React, { useContext, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Box,
  ButtonBase,
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
} from "@material-ui/core";
import TaskList from "./taskList";

import FiberManualRecordIcon from "@material-ui/icons/FiberManualRecord";
import AddCircleIcon from "@material-ui/icons/AddCircle";
import CloseIcon from "@material-ui/icons/Close";

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
  },
  categoryBtns: {
    maxHeight: "30vh",
    overflow: "auto",
  },
  categoryBtn: {
    width: 120,
    padding: theme.spacing(0.5, 1),
    borderRadius: 4,
  },
  listItem: {
    textTransform: "none",
    display: "flex",
    justifyContent: "start",
    padding: theme.spacing(1, 2),
    borderRadius: theme.spacing(1),
    marginBottom: 8,
    "&:focus": {
      color: '#ffffff',
      backgroundColor: '#AED580'
    }
  },
  icon: {
    paddingTop: 6,
    fontSize: 18,
  },
  icon2: {
    fontSize: 18,
  },
  iconButton: {
    display: 'none',
    "&:hover": {
      display: 'unset'
    }
  },
  closeIcon: {
    fontSize: 12,
  },
  categoryContent: {
    marginLeft: 8,
  },
  addCategroy: {
    display: "flex",
    justifyContent: "center",
  },
  addCategroyBtn: {
    width: "90%",
    padding: theme.spacing(1, 2),
    borderRadius: 4,
    color: "#757575E8",
  },
  userStatus: {
    height: 120,
    marginBottom: theme.spacing(4),
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
      {value === index && <Box ml={4}>{children}</Box>}
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
    console.log(res.data);
  };

  const fetchStatus = async () => {
    const res = await axios.post(URL + "getTaskStatusCountByUserId?uid=" + user.uid);
    setUserStatus(res.data);
    console.log(res.data);
  }

  const onSubmit = async (data) => {
    console.log(data);
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
    console.log(res);
    fetchCategories();
    alert.success("Categroy deleted!");
  };

  let date = new Date().toLocaleDateString();

  useEffect(() => {
    fetchCategories();
    fetchStatus();
  }, [categroyName]);

  return (
    <div className={classes.root}>
      <FetchStatusContext.Provider value={fetchStatus}>
        <Grid container>
        <Grid item xs={3}>
          <div className={classes.userStatus}>
            <Typography variant="h5" component="div">
              <Box fontWeight="600" component="p">
                Today is {date}
              </Box>
            </Typography>
            {userStatus ?
              <Typography variant="body1" component="p">
                Today you have {userStatus.unfinshedCount} to dos, and {userStatus.finishedCount} are done.
              </Typography> : <div>loading...</div>
            }
          </div>
          <Grid style={{ paddingLeft: 12 }} container justify="center">
            <Grid item xs={12}>
              <List className={classes.categoryBtns}>
                {categoryArr ? (
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
                              onClick={() => deleteCategory(item.category_id)}
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
              <Grid item xs className={classes.addCategroy}>
              <ButtonBase
                color="primary"
                className={classes.addCategroyBtn}
                onClick={handleOpen}
              >
                <AddCircleIcon style={{ marginRight: 8 }} />
                <Typography>Add New</Typography>
              </ButtonBase>
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
                      {errors.username && (
                        <Typography
                          variant="caption"
                          component="p"
                          color="error"
                          style={{ marginBottom: "4px" }}
                        >
                          This field is required
                        </Typography>
                      )}
                      <FormControl className={classes.formControl} name="color">
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
                    <Grid item xs={12} style={{marginTop: 24}}>
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
        </Grid>
        <Grid item xs={9}>
          {categoryArr ? (
            categoryArr.map((item, index) => {
              return (
                <TabPanel value={value} index={index} key={item.category_id}>
                  <TaskList cid={item.category_id} fetchStatus={fetchStatus}/>
                </TabPanel>
              );
            })
          ) : (
            <div className={classes.categoryBtns}>Loading</div>
          )}
        </Grid>
      </Grid>
      </FetchStatusContext.Provider>
    </div>
  );
};

export default CategoryList;
