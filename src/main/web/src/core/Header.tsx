import React from 'react';
import Typography from "@material-ui/core/Typography";
import {IconLink, Link} from "../elements/CustomElements";
import {AccountCircle} from "@material-ui/icons";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";

export const Header: React.FC = () => {
    const classes = useStyles();
    return (<>
        <Typography variant="h5" color="inherit" className={classes.title}>
            <Link color="inherit" to={"/"}>Presents</Link>
        </Typography>
        <IconLink className={classes.menuButton} color="inherit" to={"/auth"}>
            <AccountCircle/>
        </IconLink>
    </>)
};


const useStyles = makeStyles((theme: Theme) => createStyles({
        menuButton: {
            marginRight: theme.spacing(2),
        },
        title: {
            flexGrow: 1,
        }
    })
);
