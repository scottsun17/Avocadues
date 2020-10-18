import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Box, Grid, IconButton, Typography } from '@material-ui/core';

import AccountCircleIcon from '@material-ui/icons/AccountCircle';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import { useContext } from 'react';
import { UserContext } from "../../pages/homePage";


// react-alert
import { useAlert } from "react-alert";

//firebaseAuth
import firebaseAuth from '../firebase';
import { useHistory } from 'react-router-dom';


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
        height: 42,
    },

}))




const HeaderInfo = () => {
    const alert = useAlert();
    const classes = useStyles();
    const hist = useHistory();
    const user = useContext(UserContext);
    console.log(user)

    const signOut =()=>{
        try{
            firebaseAuth.logout()
            .then(res => {
                console.log(res)
                // if(res.user.uid !== undefined) {
                    alert.success("Log out successfully!")
                    // postUid(res.user.uid);
                    hist.push({
                        pathname: '/landing',
                    })
                // }
            }).catch(err => {
                alert.error(err.message)
            })
        }catch(error){
            alert(error.message)
        }
    
    }

    return (
        <React.Fragment>
            <div className={classes.root}>
                <Grid container direction="row" justify="space-between" alignItems="flex-start">
                    <Grid item className={classes.title} xs={4}>
                        <Typography variant="h4" component="div">
                            <Box fontWeight="700">
                                Avocadues
                            </Box>
                        </Typography>
                    </Grid>
                    <Grid item className={classes.userInfo} xs={3}>
                        {
                            user != undefined ? <Typography component="span" variant="body1" style={{marginRight: 8}}>{user.displayName}</Typography> : <Typography component="span" variant="body1">unKnown</Typography>
                        }
                        <IconButton style={{marginRight: '6px'}}>
                            <AccountCircleIcon />
                        </IconButton>
                        <IconButton onClick={signOut}>
                            <ExitToAppIcon />
                        </IconButton>
                    </Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
};

export default HeaderInfo;