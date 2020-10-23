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
    content: {
        padding: theme.spacing(2, 6)
    },
    backBtn: {
        marginTop: theme.spacing(4)
    }
}));


const Policy = () => {

    const classes = useStyles();
    let history = useHistory();

    const goBack = () => {
        history.push("/signup");
    }
    return (
        <Container component="main" maxWidth="md">
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
                    Terms of Service and our Privacy Policy
                </Typography>
                <Typography component="p" variant="body1" className={classes.content}>
                    {"   "}Thank you for using Avocadues. Avocadues is made by three computer science students who want to have a usable To Do List application that’s also clean, ads free, and cloud based. We created it for our own personal use. 
                    You are welcome to use Avocadues for free. However, we DO NOT collect or manage your personal information. Please DO NOT store any sensitive data in our application. We are not responsible for your data security. We use Firebase Authentication to manage sign up and log in. We have no access to your personal information. We are not responsible for whatever “todos” you stored on our application. Your “todos” on our cloud database are NOT encrypted and maybe at risk of data breach if someone is bored enough to hack our database. So, use our application at your own risk. 
                </Typography>
                <Typography component="p" variant="body1" className={classes.content}>
                    At the end of the day, Avocadues is our own little personal project and we use it for ourselves. Feel free to use it for fun. Hope you enjoy this application and if you have any suggestions or critics, feel free to email us at scottsun17@gmail.com, yangguanggeng960123@gmail.com, and dannnnihdn@gmail.com. We reserve the right to ignore your email 😉.
                    Enjoy Avocadues!
                </Typography>
                <Button color="primary" variant="outlined" className={classes.backBtn} onClick={goBack}>Go Back</Button>
            </Paper>

        </Container>

    )
}

const policyPage = () => {
    return (
        <div className="App">
            <Policy />
        </div>
    );
};

export default policyPage;