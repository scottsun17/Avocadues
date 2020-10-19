import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import { Box, Tab, Tabs } from "@material-ui/core";
import TaskList from "./taskList";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    display: "flex",
    padding: theme.spacing(2, 8, 2, 6),
  },
  tabs: {},
}));

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
  const [value, setValue] = React.useState(0);
  console.log(props);
  console.log(categoryArr);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
        <Tabs
          orientation="vertical"
          variant="scrollable"
          value={value}
          onChange={handleChange}
          className={classes.tabs}
        >
          {categoryArr ? (
            categoryArr.map((item) => {
              return <Tab label={item.categoryName} key={item.category_id} />;
            })
          ) : (
            <div>Loading</div>
          )}
        </Tabs>
        {categoryArr ? (
          categoryArr.map((item, index) => {
            return (
              <TabPanel value={value} index={index} key={item.category_id}>
                <TaskList cid={item.category_id} />
              </TabPanel>
            );
          })
        ) : (
          <div>Loading</div>
        )}
    </div>
  );
};

export default CategoryList;
