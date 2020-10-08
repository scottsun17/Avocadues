import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Grid } from '@material-ui/core';


const useStyles = makeStyles({
    SummaryBox: {
        backgroundColor: '#81c784'
      
    }
})


export default function SummaryBox(){
    const classes = useStyles();

    return(
        <div className ={classes.SummaryBox}>
            <Grid></Grid>
            aaa
        </div>
    )
}