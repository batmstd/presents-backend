import React from 'react';
import {Route, Switch} from "react-router";
import SignUp from "../pages/auth/SignUp";

const Content: React.FC = () => {
    return (<Switch>
        <Route path="/register" component={() => <SignUp/>}/>
        <Route exact path="/" component={() => <div/>}/>
    </Switch>)
};
export default Content;