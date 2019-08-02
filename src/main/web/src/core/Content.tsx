import React from 'react';
import {Route, Switch} from "react-router";
import Auth from "../pages/auth/Auth";
import SignUp from "../pages/auth/SignUp";

const Content: React.FC = () => {
    return (<Switch>
        <Route path="/auth" component={() => <Auth/>}/>
        <Route path="/register" component={() => <SignUp/>}/>
        <Route exact path="/" component={() => <div/>}/>
    </Switch>)
};
export default Content;