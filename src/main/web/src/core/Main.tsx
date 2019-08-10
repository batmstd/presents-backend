import React from 'react';
import Content from "./Content";
import Auth from "../pages/auth/Auth";
import {UserInterface} from "./UserModel";

interface MainProps extends UserInterface {
}

export const Main: React.FC<MainProps> = ({user}) => {
    return (<>
        {user ? <Content/> : <Auth/>}
    </>)
};
