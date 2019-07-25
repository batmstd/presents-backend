import React from 'react';
import {Grid} from "@material-ui/core";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";

const Master: React.FC = () => {
    return <Grid container spacing={3}>
        <Grid xs={12}>
            <AppBar position="static" color="primary">
                <Toolbar>
                    <Typography variant="h5" color="inherit">
                        header
                    </Typography>
                </Toolbar>
            </AppBar>
        </Grid>
        <Grid xs={3}></Grid>
        <Grid xs={9}></Grid>
    </Grid>
};

export default Master;