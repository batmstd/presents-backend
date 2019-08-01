import React from 'react';
import {UserInterface} from "./UserModel";
import {Route, Switch} from "react-router";
import Auth from "../pages/auth/Auth";

const Content: React.FC<UserInterface> = ({user}) => {
    return (<Switch>
        <Route path="/auth" component={() => <Auth {...{user}}/>}/>
        <Route exact path="/" component={() => <div/>}/>
    </Switch>)
};
export default Content;