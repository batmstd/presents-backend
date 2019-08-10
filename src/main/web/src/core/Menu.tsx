import React from 'react';
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import List from "@material-ui/core/List";

export const Menu:React.FC = () => {
    return (<List>
        <ListItem button>
            <ListItemText primary={'Главная'}/>
        </ListItem>
    </List>)
};