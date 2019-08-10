import React from 'react';
import {createStyles} from "@material-ui/core";
import {UserInterface} from "./UserModel";
import makeStyles from "@material-ui/core/styles/makeStyles";
import withWidth, {WithWidth} from "@material-ui/core/withWidth";
import {LargePage} from "./LargePage";
import {SmallPage} from "./SmallPage";

interface MasterProps extends UserInterface, WithWidth {
}

const Master: React.FC<MasterProps> = ({user, width}) => {
    const classes = useStyles();
    const isFull = new Set(["md", "lg", "xr"]).has(width);
    const Page = isFull ? LargePage : SmallPage;
    return <div className={classes.root}>
        <Page user={user}/>
    </div>
};

const useStyles = makeStyles(() => createStyles({root: {display: 'flex'}}));

export default withWidth()(Master);
