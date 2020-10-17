import React from 'react';

// form
import { useForm } from "react-hook-form";

// material ui
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Checkbox, Grid, Paper, Typography, Container, CssBaseline, ButtonBase } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

// react-alert
import { useAlert } from "react-alert";

// framer motion
import { motion } from "framer-motion";

//css
import '../../css/App.css'

// icons
import img from '../../assets/imgs/logo.png';

// router
import { Link, useHistory } from "react-router-dom";

//firebase
import firebase from '../firebase';


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
    form: {
        width: '100%', // Fix IE 11 issue.
        marginTop: theme.spacing(3),
    },
    submit: {
        width: "100%",
        height: "2.5rem",
        borderRadius: "8px",
        marginTop: theme.spacing(1),
        padding: theme.spacing(0, 6),
    },
    inputCard: {
        border: "0px solid",
        borderRadius: "8px",
        backgroundColor: grey[200],
        alignItems: 'center',
        width: "100%",
        height: "3rem",
        margin: theme.spacing(0.5, 0, 1.5, 0),
        padding: theme.spacing(1.5),
    },
    otherSignin: {
        width: "100%"
    }
}));


const ForgotPassword = () => {
    const classes = useStyles();
    const hist = useHistory();
    const alert = useAlert();
    const { register, handleSubmit, watch, errors } = useForm({
        defaultValues: {
            email: "",
        }
    });

    const onSubmit = data => {
        console.log(data);
        try{
            firebase.resetpassword(data.email)
            .then(res => {
                alert.success("Sent reset password successfully!")
                // hist.push({
                //     pathname: '/signin',
                //     query: { user: res },
                // })
            
        }).catch(err => {
            alert.error(err.message)
        })
    }catch(err) {
            console.log(err.message);
        }
    }
 
    const goBack = () => {
        hist.push("/signin");
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
                <Typography component="h1" variant="h5" className={classes.title}>
                    Forgot Password?
                </Typography>
                <Typography component="h3" variant="body1" align="center" className={classes.title}>
                    Enter your registered email ID to reset the password
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container alignItems="center">
                        <Grid item xs={12}>
                            <input name="" ref={register({ required: true })} className={classes.inputCard} placeholder="Email *" />
                            {errors.username && <Typography variant="caption" component="p" color="error" style={{ marginBottom: "4px" }}>This field is required</Typography>}
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" fullWidth type="submit" disableElevation className={`btn-grad ${classes.submit}`}>Send</Button>
                        </Grid>
                        <Grid item xs={12}>
                            <ButtonBase className={classes.submit} onClick={goBack}>Back</ButtonBase>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </Container>
    );
};

export default ForgotPassword;