import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import { useForm } from "react-hook-form";
import { Box, Button, Checkbox, Grid, Paper } from '@material-ui/core';
import { grey } from '@material-ui/core/colors';
import img from '../../assets/imgs/logo.png';
import '../../css/App.css'

function Copyright() {
    return (
        <Typography variant="body2" color="textSecondary" align="center">
            {'Copyright © '}
            <Link color="inherit" href="#">
                Avocadues.com
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
    // avatar: {
    //     margin: theme.spacing(1),
    //     backgroundColor: theme.palette.secondary.main,
    // },
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
}));

export default function SignIn() {
    const classes = useStyles();
    const { register, handleSubmit, watch, errors } = useForm({
        defaultValues: {
            email: "",
            password: ""
        }
    });
    const onSubmit = data => console.log(data);

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Paper className={classes.paper}>
                {/* <Avatar className={classes.avatar}> */}
                    {/* <LockOutlinedIcon /> */}
                    <img width="80px" src={img} alt="logo"/>
                {/* </Avatar> */}
                <Typography component="h1" variant="h5">
                    Sign in
                </Typography>

                <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
                    <Grid container alignItems="center">
                        <Grid item xs={12}>
                            <input name="email" type="email" ref={register({ required: true })} className={classes.inputCard} placeholder="Email *" />
                            {errors.email && <Typography variant="caption" component="p" color="error" style={{ marginBottom: "4px" }}>This field is required</Typography>}
                        </Grid>
                        <Grid item xs={12}>
                            <input name="password" type="password" ref={register({ required: true })} className={classes.inputCard} placeholder="Password *" />
                            {errors.password && <Typography variant="caption" component="p" color="error" style={{marginBottom: "4px"}}>This field is required</Typography>}
                        </Grid>
                        <Grid item xs={12}>
                            <Checkbox size="small"></Checkbox><Typography variant="body2" component="span" >Remeber me</Typography>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" fullWidth type="submit" disableElevation className={`btn-grad ${classes.submit}`}>Sign In</Button>
                        </Grid>

                    </Grid>
                </form>
                <Box mt={2}>
                    <Typography component="span" variant="body2" className={classes.signup}>
                        Don't have an account?
                    <Link style={{marginLeft: "6px"}}>Sign Up</Link>
                    </Typography>
                </Box>
                <Box mt={8} mb={2}>
                    <Copyright />
                </Box>
            </Paper>
        </Container>
    );
}