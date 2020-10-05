import React from 'react';

// material ui
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Paper, Typography, Container, CssBaseline } from '@material-ui/core';

// framer motion
import { motion } from "framer-motion";

// router
import { useHistory } from "react-router-dom";

import '../css/App.css'
import img from '../assets/imgs/logo.png';

const useStyles = makeStyles((theme) => ({
    paper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        borderRadius: theme.spacing(2),
        padding: theme.spacing(4)
    },
    title: {
        marginTop: theme.spacing(2)
    },
    backBtn: {
        marginTop: theme.spacing(4)
    }
}));


const Error = () => {
    
    const classes = useStyles();
    let history = useHistory();

    const goBack = () => {
        history.push("/signin");
    }
    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper className={classes.paper}>
                <motion.div
                    initial={{ scale: 0 }}
                    animate={{ rotate: 360, scale: 1 }}
                    transition={{
                        type: "spring",
                        stiffness: 260,
                        damping: 20
                    }}
                    whileHover={{ scale: 1.2 }}
                    whileTap={{ scale: 0.8 }}
                >
                    <img width="80px" src={img} alt="logo" />
                </motion.div>
                <Typography color="error" component="h1" variant="h3" className={classes.title}>
                    Oops...
                </Typography>
                <Typography component="h1" variant="body1" className={classes.title}>
                    The page you are looking for might have been removed, havd its Name changes, or is temporarily unavailable
                </Typography>
                <Button color="primary" variant="outlined" className={classes.backBtn} onClick={goBack}>Go Back</Button>
            </Paper>

        </Container>

    )
}

const errorPage = () => {
    return (
        <div className="App">
            <Error />
        </div>
    );
};

export default errorPage;