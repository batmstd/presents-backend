import React from 'react';
import {Typography} from "@material-ui/core";
import {UserInterface, UserModel} from "../../core/UserModel";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Auth: React.FC<UserInterface> = ({user}) => {
    return (<>
        {user ? <SignIn/> : <SignUp/>}
    </>)
};

export default Auth;