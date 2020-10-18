import React, { useEffect } from "react";
import "../css/App.css";
import HeaderInfo from "../components/homePage/headerInfo";

// material ui
import { makeStyles } from "@material-ui/core/styles";
import { Paper, Container, CssBaseline } from "@material-ui/core";

// url axios
import axios from "axios";
import { URL } from "../config";
import CategoryList from "../components/homePage/categoryList";

const useStyles = makeStyles((theme) => ({
  root: {
    borderRadius: theme.spacing(2),
  },
  title: {
    marginTop: theme.spacing(2),
  },
  backBtn: {
    marginTop: theme.spacing(4),
  },
}));

export const UserContext = React.createContext();

const Home = (props) => {
  const classes = useStyles();
  const [categories, setCategories] = React.useState([]);
  const user = props.user;

  const fetchCategories = async () => {
    const res = await axios.post(URL + "getCategoryByUid?uid=" + user.uid);
    console.log(res);
    setCategories(res);
  };

  useEffect(() => {
    fetchCategories();
    console.log(categories);
  }, []);

  console.log(props);

  return (
    <React.Fragment>
      {user !== undefined ? (
        <UserContext.Provider value={user}>
          <Container component="main" maxWidth="md">
            <CssBaseline />
            <Paper className={classes.root}>
              <HeaderInfo />
              <CategoryList list={categories.data}/>
            </Paper>
          </Container>
        </UserContext.Provider>
      ) : (
        <div> loading...</div>
      )}
    </React.Fragment>
  );
};

const homePage = (props) => {
  const user = props.location.query.user.user;

  return (
    <div className="App">
      <Home user={user} />
    </div>
  );
};
export default homePage;
