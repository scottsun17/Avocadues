import React from 'react';
import { makeStyles, withStyles } from '@material-ui/core/styles';
import { ButtonBase, Grid, IconButton, Tab, Tabs, Typography } from '@material-ui/core';
import AddIcon from '@material-ui/icons/Add';
import { green } from '@material-ui/core/colors';
import '../../css/App.css'


const useStyles = makeStyles((theme) => ({
    taskList: {
        backgroundColor: '#a6d4fa',
        height: '80vh',
        backgroundColor: '#F7F8FF',
        opacity: '0.8',
        borderRadius: theme.spacing(2),
        padding: theme.spacing(4, 3, 1, 3),
    },
    createBtn: {
        width: 48,
        height: 48,
        backgroundColor: "#aed581",
        borderRadius: '50%',
        color: "white"
    }
}))

const MyTabs = withStyles((theme) => ({
    root: {
        borderBottom: "1px solid #f1f2f6",
        borderRadius: theme.spacing(1),
        maxWidth: 418,
    },
    indicator: {
        backgroundColor: green[200]
    }
}))(Tabs);

const MyTab = withStyles((theme) => ({
    root: {
        textTransform: "none",
        minWidth: 130,
        fontWeight: theme.typography.fontWeightRegular,
        transition: "easeInOut 0.4s",
        fontSize: 16,
        padding: 0,
        "&:hover": {
            fontSize: "1.5rem",
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
        fontSize: "1.5rem"
    }
}))((props) => <Tab disableRipple {...props} />);

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <div hidden={value !== index} {...other}>
            {value === index && (
                <Typography>{children}</Typography>
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
                            <AddIcon/>
                        </ButtonBase>
                    </Grid>
                </Grid>
                <TabPanel value={value} index={0}>
                    Item One
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