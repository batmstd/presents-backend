import React, {useState} from 'react';
import {createStyles, Theme, Typography} from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import IconButton from "@material-ui/core/IconButton";
import InputAdornment from "@material-ui/core/InputAdornment";
import {Visibility, VisibilityOff} from "@material-ui/icons";
import useMediaQuery from "@material-ui/core/useMediaQuery/useMediaQuery";

interface RegisterUser {
    name: string;
    email: string;
    password: string;
    repeatPassword: string;
}

const SignUp: React.FC = () => {
    const classes = useStyles();
    const [form, setForm] = useState<RegisterUser>({
        name: "",
        email: "",
        password: "",
        repeatPassword: ""
    });
    const [showPassword, setShowPassword] = useState(false);

    function handleChange({target: {id, value}}: React.ChangeEvent<HTMLInputElement>) {
        setForm(oldValues => ({...oldValues, [id]: value}))
    }

    function handleClickShowPassword() {
        setShowPassword(prev => !prev);
    }

    function handleMouseDownPassword(event: React.MouseEvent<HTMLButtonElement>) {
        event.preventDefault();
    }

    const matches = useMediaQuery('(min-width:600px)');
    return (<Grid item xs={matches ? 6 : 12}>
        <Typography variant={"h5"}>Регистрация</Typography>
        <form className={classes.container} autoComplete="off">
            <TextField
                id="email"
                label="Email"
                type="email"
                value={form.email}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                className={classes.field}
                fullWidth
            />
            <TextField
                id="name"
                label="Имя"
                value={form.name}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                className={classes.field}
                fullWidth
            />
            <TextField
                id="password"
                type={showPassword ? 'text' : 'password'}
                label="Пароль"
                value={form.password}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                className={classes.field}
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
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <TextField
                id="repeatPassword"
                type={showPassword ? 'text' : 'password'}
                label="Повтор пароля"
                value={form.repeatPassword}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                className={classes.field}
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
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                }}
            />
            <Button className={classes.field} color={"primary"} variant={"contained"}>Зарегистрироваться</Button>
        </form>

    </Grid>)
};

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        container: {
            display: 'flex',
            flexWrap: 'wrap',
        },
        field: {
            marginLeft: theme.spacing(1),
            marginRight: theme.spacing(1),
        }
    })
);

export default SignUp;