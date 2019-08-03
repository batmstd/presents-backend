import React from 'react';
import {createStyles, Grid, Theme} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import {UserInterface} from "./UserModel";
import Content from "./Content";
import {IconLink, Link} from "../elements/CustomElements";
import makeStyles from "@material-ui/core/styles/makeStyles";
import useMediaQuery from "@material-ui/core/useMediaQuery";
import Auth from "../pages/auth/Auth";

const Master: React.FC<UserInterface> = ({user}) => {
    const classes = useStyles();
    const matches = useMediaQuery('(min-width:600px)');
    console.log(matches)
    return <div className={classes.root}>
        <Grid container spacing={3}>
            <Grid item xs={12}>
                <AppBar position="static" color="primary">
                    <Toolbar>
                        <Typography variant="h5" color="inherit" className={classes.title}>
                            <Link color="inherit" to={"/"}>Home</Link>
                        </Typography>
                        <IconLink className={classes.menuButton} color="inherit" icon={"account_circle"} to={"/auth"}/>
                    </Toolbar>
                </AppBar>
            </Grid>
            {matches && <Grid item xs={3}></Grid>}
            <Grid item xs={matches ? 9 : 12}>
                {user ? <Content/> : <Auth/>}
            </Grid>
        </Grid>
    </div>
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
        },
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        },
    }),
);

export default Master;
