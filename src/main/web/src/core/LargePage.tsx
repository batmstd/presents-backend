import React from 'react';
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import {Header} from "./Header";
import Drawer from "@material-ui/core/Drawer";
import {Menu} from "./Menu";
import {Main} from "./Main";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";
import {UserInterface} from "./UserModel";

interface LargePageInterface extends UserInterface {
}

export const LargePage: React.FC<LargePageInterface> = ({user}) => {
    const classes = useStyles();
    return (<>
        <AppBar position="fixed" color="primary" className={classes.appBar}>
            <Toolbar>
                <Header/>
            </Toolbar>
        </AppBar>
        <Drawer className={classes.drawer} variant="permanent" classes={{paper: classes.drawerPaper}}>
            <div className={classes.toolbar}/>
            <Menu/>
        </Drawer>
        <main className={classes.content}>
            <div className={classes.toolbar}/>
            <Main user={user}/>
        </main>
    </>)
};
const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            zIndex: theme.zIndex.drawer + 1,
        },
        drawer: {
            width: drawerWidth,
            flexShrink: 0,
        },
        drawerPaper: {
            width: drawerWidth
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3),
        },
        toolbar: theme.mixins.toolbar
    }),
);
