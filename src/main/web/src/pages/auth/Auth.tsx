import React from 'react';
import {Typography} from "@material-ui/core";
import {UserInterface, UserModel} from "../../core/UserModel";
import SignIn from "./SignIn";
import SignUp from "./SignUp";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";
import Grid from "@material-ui/core/Grid";
import {Route, Switch} from "react-router";

const Auth: React.FC = () => {
    const matches = useMediaQuery('(min-width:600px)');
    return (<Grid item xs={matches ? 6 : 12}>
        <Switch>
            <Route path="/register" component={() => <SignUp/>}/>
            <Route path="/" component={() => <SignIn/>}/>
        </Switch>
    </Grid>)
};

export default Auth;