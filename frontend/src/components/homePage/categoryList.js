import React from "react";
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

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    padding: theme.spacing(2, 6),
  },
  categoryBtns: {
    maxHeight: "35vh",
    overflow: "auto",
  },
  categoryBtn: {
    // height: 36,
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
  },
  icon: {
    paddingTop: 6,
    fontSize: 18,
  },
  closeIcon: {
    fontSize: 12,
  },
  categoryContent: {
    marginLeft: 8,
  },
  addCategroyBtn: {
    padding: theme.spacing(1, 2),
    backgroundColor: "#aed581",
    borderRadius: 4,
    color: "white",
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
    width: "40vw",
    height: "20vh",
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.spacing(2),
    padding: theme.spacing(2, 4, 3),
    outline: 0,
  },
  inputCard: {
    border: "0px solid",
    borderRadius: "8px",
    backgroundColor: grey[200],
    alignItems: "center",
    width: "100%",
    height: "3rem",
    margin: theme.spacing(0.5, 0, 1.5, 0),
    padding: theme.spacing(1.5),
    outline: "none",
  },
  submit: {
    textTransform: "none",
    width: "40%",
    height: "2.5rem",
    borderRadius: "8px",
    marginTop: theme.spacing(1),
    padding: theme.spacing(0, 6),
    flexGrow: 1,
  },
}));

const colorMap = {
  RED: "#e66767",
  GREEN: "#1abc9c",
  BLUE: "#778beb",

  GREY: "#a4b0be",
  DARK: "#2f3542",
  PINK: "#f8a5c2",
};

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div hidden={value !== index} {...other}>
      {value === index && <Box ml={4}>{children}</Box>}
    </div>
  );
}

const CategoryList = (props) => {
  const classes = useStyles();
  const categoryArr = props.list;
  const alert = useAlert();

  const [value, setValue] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const [categroyName, setCategroyName] = React.useState("");

  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      content: "",
    },
  });

  const onSubmit = async (data) => {
    console.log(data);
    setCategroyName(data.content);
    await axios.post(
      URL +
        "addCategory?category_name=" +
        data.content +
        "&color=" +
        "#e66767" +
        "&uid="
    );
    alert.success("Categroy added!");
    handleClose();
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  let date = new Date().toLocaleDateString();

  return (
    <div className={classes.root}>
      <Grid container>
        <Grid item xs={3} container direction="column" justify="space-evenly">
          <Grid item>
            <Typography variant="h5" component="div">
              <Box fontWeight="600" component="p">
                Today is {date}
              </Box>
            </Typography>
            <Typography variant="body1" component="p">
              Today you have
            </Typography>
          </Grid>
          <Grid item style={{ paddingLeft: 12 }}>
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
                          <IconButton style={{ padding: 4 }}>
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
            <ButtonBase
              color="primary"
              className={classes.addCategroyBtn}
              onClick={handleOpen}
            >
              <AddCircleIcon style={{ marginRight: 8 }} />
              <Typography>Add New</Typography>
            </ButtonBase>
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
                    </Grid>
                    <Grid item xs={12}>
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
        <Grid item xs={9}>
          {categoryArr ? (
            categoryArr.map((item, index) => {
              return (
                <TabPanel value={value} index={index} key={item.category_id}>
                  <TaskList cid={item.category_id} />
                </TabPanel>
              );
            })
          ) : (
            <div className={classes.categoryBtns}>Loading</div>
          )}
        </Grid>
      </Grid>
    </div>
  );
};

export default CategoryList;
