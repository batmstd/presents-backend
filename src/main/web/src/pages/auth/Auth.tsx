import React from 'react';
import {Typography} from "@material-ui/core";
import {UserInterface, UserModel} from "../../core/UserModel";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Auth: React.FC = () => {
    return (<>
        {<SignIn/>}
    </>)
};

export default Auth;