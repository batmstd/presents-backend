import React, {useState} from "react";
import TextField from "@material-ui/core/TextField";
import InputAdornment from "@material-ui/core/InputAdornment";
import IconButton from "@material-ui/core/IconButton";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {createStyles, Theme} from "@material-ui/core";

interface FieldState {
    id: string;
    label: string;
    value: string;
    type?: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const InputField: React.FC<FieldState> = ({id, label, value, onChange, type = 'text'}) => {
    const {field} = useStyles();
    return (<TextField
        {...{id, label, value, onChange, type, name: id}}
        margin="normal"
        variant="outlined"
        className={field}
        fullWidth
    />)
};

export const PasswordField: React.FC<FieldState> = ({id, label, value, onChange}) => {
    const {field} = useStyles();
    const [showPassword, setShowPassword] = useState(false);

    function handleClickShowPassword() {
        setShowPassword(prev => !prev);
    }

    function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
    }

    return (<TextField
        type={showPassword ? 'text' : 'password'}
        {...{id, label, value, onChange, name: id}}
        margin="normal"
        variant="outlined"
        className={field}
        fullWidth
        InputProps={{
            endAdornment: (
                <InputAdornment position="end">
                    <IconButton
                        edge="end"
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                        onMouseDown={handleMouseDownPassword}
                    >
                        {showPassword ? <VisibilityOff/> : <Visibility/>}
                    </IconButton>
                </InputAdornment>
            ),
        }}
    />)
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        field: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        }
    })
);
