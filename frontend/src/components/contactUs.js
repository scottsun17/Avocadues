import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Fab from '@material-ui/core/Fab';
import Drawer from '@material-ui/core/Drawer';
import { Grid, Typography, Zoom, Box, ButtonBase, Button, Avatar } from '@material-ui/core';
import CloseIcon from '@material-ui/icons/Close';
import { useTheme } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { brown, cyan, pink } from '@material-ui/core/colors';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > *': {
            margin: theme.spacing(1),
        },
    },
    extendedIcon: {
        marginRight: theme.spacing(1),
    },
    fab: {
        textTransform: "capitalize",
        position: 'fixed',
        padding: theme.spacing(2, 3),
        bottom: theme.spacing(3.5),
        left: theme.spacing(3),
    },
    popup: {
        height: 90,
        maxWidth: 1920,
        [theme.breakpoints.down('xs')]: {
            paddingTop: 12,
            height: 240,
        }
    },
    link: {
        margin: theme.spacing(2),
        "&:hover": {
            textDecoration: "underline",
        },
    },
    green: {
        color: "#fff",
        backgroundColor: cyan[400],
    },
    pink: {
        color: theme.palette.getContrastText(pink[400]),
        backgroundColor: pink[400],
    },
    brown: {
        color: theme.palette.getContrastText(brown[400]),
        backgroundColor: brown[400],
    },

}));

export default function FloatingActionButton() {
    const classes = useStyles();
    const [state, setState] = React.useState(false);
    const theme = useTheme();

    const transitionDuration = {
        enter: theme.transitions.duration.enteringScreen,
        exit: theme.transitions.duration.leavingScreen,
    };

    const toggleDrawer = () => (event) => {
        if (event && event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }
        setState(!state);
    }

    return (
        <div className={classes.root}>
            <Zoom in={!state} timeout={transitionDuration} style={{ transitionDelay: '100ms' }}>
                <Fab color="primary" className={classes.fab} variant="extended" onClick={toggleDrawer()}>
                    <Typography style={{ color: "#F7F8FF"}}>Contact Us</Typography>
                </Fab>
            </Zoom>
            <Drawer anchor="bottom" open={state} onClose={toggleDrawer()}>
                <Grid container justify="center" alignItems="center" >
                    <Grid item xs={12} sm={10} display="flex">
                        <Box m="auto">
                            <div className={classes.popup} onClick={toggleDrawer()} onKeyDown={toggleDrawer()}>
                                <Grid
                                    container
                                    direction="row"
                                    justify="space-evenly"
                                    alignItems="center"
                                    spacing={4}
                                    style={{height: '100%'}}
                                >
                                    <Grid item xs={12} sm align="center" container direction="row" justify="center" alignItems="center" spacing={2}>
                                        <Grid xs={5} item align="right"><Avatar className={classes.pink}>D</Avatar></Grid>
                                        <Grid xs item align="left"><Button component="div"><a href="https://thedannihuang.com/" style={{ textDecoration: "none", color: "#333" }}><Typography variant="body1" component="div" > Danni Huang </Typography></a></Button></Grid>
                                    </Grid>
                                    <Grid item xs={12} sm align="center" container direction="row" justify="center" alignItems="center" spacing={2}>
                                        <Grid xs={5} item align="right"><Avatar className={classes.brown}>G</Avatar></Grid>
                                        <Grid xs item align="left"><Button component="div"><a href="https://guanggeng-website.web.app/" style={{ textDecoration: "none", color: "#333" }}><Typography variant="body1" component="div"> Guanggeng Yang </Typography></a></Button></Grid>
                                    </Grid>
                                    <Grid item xs={12} sm align="center" container direction="row" justify="center" alignItems="center" spacing={2}>
                                        <Grid xs={5} item align="right"><Avatar className={classes.green}>S</Avatar></Grid>
                                        <Grid xs item align="left"><Button component="div"><a href="https://codebyscott.dev/" style={{ textDecoration: "none", color:"#333" }}><Typography variant="body1" component="div" > Scott Sun </Typography></a></Button></Grid>
                                    </Grid>
                                </Grid>
                            </div>
                        </Box>
                    </Grid>
                    <Grid item xs={12} sm={2} align="center">
                        <Button variant="outlined" color="primary" onClick={toggleDrawer()} style={{marginBottom: 12}}>
                            <CloseIcon color="primary" style={{ fontSize: 20, marginRight: 10 }} />
                            <Typography variant='subtitle2' display='inline'>Close</Typography>
                        </Button>
                    </Grid>
                </Grid>

            </Drawer>
        </div>
    );
}
