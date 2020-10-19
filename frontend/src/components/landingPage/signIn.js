import React, { useEffect } from 'react';

// form
import { useForm } from "react-hook-form";

// material ui
import { makeStyles } from '@material-ui/core/styles';
import { Box, Button, Checkbox, Divider, Grid, IconButton, Paper, Typography, Container, CssBaseline, Snackbar } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';

// react-alert
import { useAlert } from "react-alert";

// framer motion
import { motion } from "framer-motion";

//css
import '../../css/App.css'

// icons
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import GitHubIcon from '@material-ui/icons/GitHub';
import googleIcon from '../../assets/imgs/icons/Google.png'
import img from '../../assets/imgs/logo.png';

// router
import { Link, useHistory } from "react-router-dom";

//firebaseAuth
import firebase from "firebase";
import firebaseAuth from '../firebase';




// axios
import axios from "axios";
import { URL } from '../../config';

const provider = new firebase.auth.TwitterAuthProvider();

const twitterLogin = () => {
    
    firebase.auth().signInWithPopup(provider).then(function(result) {
        var token = result.credential.accessToken;
        var secret = result.credential.secret;

        var user = result.user;
    }).catch(function(error) {
        var errorCode = error.code;
        var errorMessage = error.message;

        var email = error.email;
        var credential = error.credential;
    });
}







function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link style={{ textDecoration: "none" }} to="/signin">
                <Typography component="span" variant="body2" color="primary">Avocadues.com</Typography>
            </Link>{' '}
            {new Date().getFullYear()}
            {'.'}
        </Typography>
    );
}

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


export default function SignIn(props) {
     

    const classes = useStyles();
    const hist = useHistory();
    const alert = useAlert();
    const { register, handleSubmit, watch, errors } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });

    const postUid = (uid) => {
        axios.post(URL + 'addUser?uid=' + uid);
    }

    const onSubmit = data => {
        console.log(data);
        try{
            firebaseAuth.login( data.email, data.password)
            .then(res => {
                console.log(res.user)
                if(res.user.uid !== undefined) {
                    alert.success("Log in successfully!")
                    // postUid(res.user.uid);
                    hist.push({
                        pathname: '/home',
                        query: { user: res },
                    })
                }
            }).catch(err => {
                alert.error(err.message)
            })
        }catch(error){
            alert(error.message)
        }
    }

    // useEffect(() => postUid(), [])
    
    const loginWithGithub = () => {
        const provider = new firebase.auth.GithubAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            const token = result.credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            alert.success("Log in successfully!")
            hist.push({
                pathname: '/home',
                query: { user: user },
            })
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebaseAuth.auth.AuthCredential type that was used.
            var credential = error.credential;
            alert.error(error.message)
          });
    }
    
    const loginWithFacebook = () => {
        const provider = new firebase.auth.FacebookAuthProvider();
        firebase.auth().signInWithPopup(provider).then(function(result) {
            // This gives you a GitHub Access Token. You can use it to access the GitHub API.
            const token = result.credential.accessToken;
            // The signed-in user info.
            const user = result.user;
            console.log(user);
            alert.success("Log in successfully!")
            hist.push({
                pathname: '/home',
                query: { user: user },
            })
            // ...
          }).catch(function(error) {
            // Handle Errors here.
            var errorCode = error.code;
            var errorMessage = error.message;
            // The email of the user's account used.
            var email = error.email;
            // The firebaseAuth.auth.AuthCredential type that was used.
            var credential = error.credential;
            alert.error(error.message)
          });
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
                    <img width="80px" src={img} alt="logo"/>
                </motion.div> 

                <Typography component="h1" variant="h5" className={classes.title}>
                    Sign In
                </Typography>
                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container alignItems="center">
                        <Grid item xs={12}>
                            <input name="email" type="email" ref={register({ required: true })} className={classes.inputCard} placeholder="Email *" />
                            {errors.email && <Typography variant="caption" component="p" color="error" style={{ marginBottom: "4px" }}>This field is required</Typography>}
                        </Grid>
                        <Grid item xs={12}>
                            <input name="password" type="password" ref={register({ required: true })} className={classes.inputCard} placeholder="Password *" />
                            {errors.password && <Typography variant="caption" component="p" color="error" style={{marginBottom: "4px"}}>This field is required</Typography> }
                        </Grid>
                        <Grid item xs={12} container alignItems="baseline">
                            <Grid item xs align="left">
                                <Checkbox size="small"></Checkbox><Typography variant="body2" component="span" >Remeber me</Typography>
                            </Grid>
                            <Grid item xs align="right">
                                <Link to="/forgotpwd" style={{ textDecoration: "none" }}><Typography variant="body2" component="span" color="primary">Forgot Password?</Typography></Link>
                            </Grid>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" fullWidth type="submit" disableElevation className={`btn-grad ${classes.submit}`}>Sign In</Button>
                        </Grid>
                    </Grid>
                </form>

                <Box mt={2} className={classes.otherSignin} textAlign="center">
                    <Divider light />
                    <Typography variant="caption" component="span" >or sign in with social networks</Typography>
                </Box>
                <Box>
                
                    <IconButton onClick={loginWithFacebook}><FacebookIcon /></IconButton>
                    {/* <IconButton ><LinkedInIcon /></IconButton> */}
                    <IconButton onClick={loginWithGithub}><GitHubIcon  style={{fontSize: "18px"}}/></IconButton>
                </Box>
                <Box mt={2}>
                    <Typography component="span" variant="body2" className={classes.signup}>
                        Don't have an account?
                        <Link style={{ marginLeft: "6px", textDecoration: "none" }} to="/signup">
                            <Typography variant="body2" component="span" color="primary">Sign Up</Typography>
                        </Link>
                    </Typography>
                </Box>
                <Box mt={8} mb={2}>
                    <Copyright />
                </Box>
            </Paper>
        </Container>
    );

}