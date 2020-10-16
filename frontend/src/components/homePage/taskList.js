import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { ButtonBase, Grid, List, ListItem, Tab, Tabs, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { green } from '@material-ui/core/colors';
import '../../css/App.css'
import TaskItem from './teskItem';


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
        marginRight: theme.spacing(4),
    },
    panel: {
        padding: theme.spacing(4)
    }
}))

const MyTabs = withStyles((theme) => ({
    root: {
        borderBottom: "1px solid #f1f2f6",
        maxWidth: 418,
        paddingLeft: theme.spacing(2),
    },
    indicator: {
        backgroundColor: green[200]
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
            color: "#A8D9C9",
            opacity: 1,
            marginBottom: theme.spacing(1),
            fontWeight: theme.typography.fontWeightMedium
        },
        "&$selected": {
            color: "#A8D9C9",
            marginBottom: theme.spacing(1),
            fontWeight: theme.typography.fontWeightMedium
        },
        "&:focus": {
            color: "#A8D9C9"
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
                        {/* <Typography variant="caption" component="span" className={classes.createTitle}>Create New Todo</Typography> */}
                        <ButtonBase variant="contained" color="primary" className={classes.createBtn}>
                            <AddIcon fontSize="large"/>
                        </ButtonBase>
                    </Grid>
                </Grid>
                <TabPanel value={value} index={0}>
                    <List>
                        {
                            [0, 1, 2, 3].map((value) => 
                                <ListItem key={value}>
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