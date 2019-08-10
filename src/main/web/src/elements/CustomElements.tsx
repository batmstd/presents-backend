import React from "react";
import {RouteComponentProps, withRouter} from "react-router-dom";
import IconButton from "@material-ui/core/IconButton";
import Button, {ButtonProps} from "@material-ui/core/Button";

const RedirectWithIcon: React.FC<Link> = ({to, history, color, children}) => {
    const redirect = () => history.push(to);
    return <IconButton onClick={redirect} {...{color}}>
        {children}
    </IconButton>
};
export const IconLink = withRouter(RedirectWithIcon);

const Redirect: React.FC<Link> = ({to, history, children, variant, color}) => {
    const redirect = () => history.push(to);
    return <Button onClick={redirect} {...{children, variant, color}}/>
};
export const Link = withRouter(Redirect);

interface Link extends ButtonProps, RouteComponentProps {
    to: string;
}
