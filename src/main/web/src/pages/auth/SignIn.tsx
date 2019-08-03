import React, {useState} from 'react';
import {createStyles, Theme, Typography} from "@material-ui/core";
import TextField from "@material-ui/core/TextField";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {Link} from "../../core/CustomElements";

const SignIn: React.FC = () => {
    const classes = useStyles();
    const [form, setForm] = useState<{ login: string, password: string }>({
        login: "",
        password: ""
    });

    function handleChange({target: {id, value}}: React.ChangeEvent<HTMLInputElement>) {
        setForm(oldValues => ({...oldValues, [id]: value}))
    }

    return (<>
        <Typography variant={"h5"}>Авторизация</Typography>
        <form className={classes.container} autoComplete="off">
            <TextField
                id="login"
                label="Логин"
                value={form.login}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                className={classes.field}
                fullWidth
            />
            <TextField
                id="password"
                type="password"
                label="Пароль"
                value={form.password}
                onChange={handleChange}
                margin="normal"
                variant="outlined"
                className={classes.field}
                fullWidth
            />
            <Button className={classes.field} color={"primary"} variant={"contained"}>Войти</Button>
            <Button className={classes.field}>Забыли пароль?</Button>
            <Link to={"/register"} className={classes.field}>Зарегистрироваться</Link>
        </form>

    </>)
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

export default SignIn;