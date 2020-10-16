import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { ButtonBase, Grid, IconButton, Tab, Tabs, Typography } from '@material-ui/core';
import '../../css/App.css'
import CheckAnim from '../iconAnimation/checkAnim';


const useStyles = makeStyles((theme) => ({
    root: {
        borderRadius: theme.spacing(2),
        padding: theme.spacing(1),
        width: '100%',
        height: '5vh',
    }
}))

export default function TaskItem(){
    const classes = useStyles();
    return (
        <React.Fragment>
            <div className={classes.root} style={{ backgroundColor: '#F4F6FF'}}>
                <Grid container direction="row" justify="space-between" alignItems="center">
                    <Grid item>
                        <CheckAnim />
                    </Grid>
                    <Grid item>aaa</Grid>
                    <Grid item>aaa</Grid>
                </Grid>
            </div>
        </React.Fragment>
    );
};
