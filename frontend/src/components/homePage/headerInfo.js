import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, IconButton, Typography } from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useContext } from 'react';
import { UserContext } from "../../pages/homePage";


const useStyles = makeStyles((theme) => ({
    root: {
        height: theme.spacing(10),
        borderRadius: theme.spacing(2, 2, 0, 0),
        padding: theme.spacing(3, 6, 0, 6),
    },
    title: {
        paddingTop: theme.spacing(2),
        color: '#2F4851',
        letterSpacing: '-1.5px',
    },
    userInfo: {
        
    },

}))

const HeaderInfo = () => {
    const classes = useStyles();
    const user = useContext(UserContext)
    console.log(user)

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Grid container direction="row" justify="space-between" alignItems="flex-start">
                    <Grid item className={classes.title}>
                        <Typography variant="h4" component="div">
                            <Box fontWeight="700">
                                Avocadues
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item className={classes.userInfo}>
                        <Typography>{user.displayName}</Typography>
                        <IconButton style={{marginRight: '6px'}}>
                            <AccountCircleIcon />
                        </IconButton>
                        <IconButton>
                            <ExitToAppIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
};

export default HeaderInfo;