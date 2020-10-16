import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { ButtonBase, Grid, List, ListItem, Tab, Tabs, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';

// framer motion
import { motion } from "framer-motion";

import TaskItem from './teskItem';
import '../../css/App.css'


const useStyles = makeStyles((theme) => ({
    taskList: {
        height: '60vh',
        opacity: '0.8',
        borderRadius: theme.spacing(4),
        padding: theme.spacing(4, 3, 1, 3),
    },
    createBtn: {
        width: 52,
        height: 52,
        backgroundColor: "#aed581",
        borderRadius: '50%',
        color: "white",
        // marginRight: theme.spacing(4),
    },
    panel: {
        padding: theme.spacing(4),
    }
}))

const MyTabs = withStyles((theme) => ({
    root: {
        borderBottom: "1px solid #f1f2f6",
        maxWidth: 418,
        paddingLeft: theme.spacing(2),
    },
    indicator: {
        backgroundColor: "#aed581"
    }
}))(Tabs);

const MyTab = withStyles((theme) => ({
    root: {
        textTransform: "none",
        minWidth: 90,
        fontWeight: theme.typography.fontWeightRegular,
        transition: "easeInOut 0.4s",
        fontSize: 18,
        padding: 0,
        "&:hover": {
            fontSize: "2.2rem",
            color: "#A4C1A1",
            opacity: 1,
            marginBottom: theme.spacing(1),
            fontWeight: theme.typography.fontWeightMedium
        },
        "&$selected": {
            color: "#A4C1A1",
            marginBottom: theme.spacing(1),
            fontWeight: theme.typography.fontWeightMedium
        },
        "&:focus": {
            color: "#A4C1A1"
        }
    },
    selected: {
        fontSize: "2.2rem"
    }
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
    const { children, value, index, ...other } = props;
    const classes = useStyles();

    return (
        <div hidden={value !== index} {...other} className={classes.panel}>
            {value === index && (
                <div>{children}</div>
            )}
        </div>
    );
}


export default function TaskList(){
    const classes = useStyles();
    const [value, setValue] = React.useState(0);

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    return (
        <React.Fragment>
            <div className={`taskList-bgcolor ${classes.taskList}`}>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid item>
                        <MyTabs value={value} onChange={handleChange}>
                            <MyTab label="All" ></MyTab>
                            <MyTab label="Process"></MyTab>
                            <MyTab label="Done"></MyTab>
                        </MyTabs>
                    </Grid>
                    <Grid item>
                        <motion.div
                            whileHover={{         
                                rotate: [0, 0, 360, 360, 0],
                            }}
                            transition={{
                                duration: 1,
                                ease: "easeInOut",
                                times: [0, 0.2, 0.5, 0.8, 1],
                            }}
                        >
                            <ButtonBase variant="contained" color="primary" className={classes.createBtn}>
                                <AddIcon fontSize="large"/>
                            </ButtonBase>
                        </motion.div>
                    </Grid>
                </Grid>
                <TabPanel value={value} index={0}>
                    <List>
                        {
                            [0, 1, 2, 3].map(v => 
                                <ListItem key={v}>
                                    <TaskItem />
                                </ListItem>
                            )
                        }
                    </List>
                </TabPanel>
                <TabPanel value={value} index={1}>
                    Item Two
                </TabPanel>
                <TabPanel value={value} index={2}>
                    Item Three
                </TabPanel> 
            </div>
        </React.Fragment>
    )
}