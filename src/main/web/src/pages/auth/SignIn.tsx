import React, {useState} from 'react';
import {createStyles, Theme, Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {Link} from "../../elements/CustomElements";
import {InputField, PasswordField} from "../../elements/CustomInputs";

const SignIn: React.FC = () => {
    const classes = useStyles();
    const [form, setForm] = useState<{ email: string, password: string }>({
        email: "",
        password: ""
    });

    function handleChange({target: {id, value}}: React.ChangeEvent<HTMLInputElement>) {
        setForm(oldValues => ({...oldValues, [id]: value}))
    }

    return (<>
        <Typography variant={"h5"}>Авторизация</Typography>
        <form className={classes.container}>
            <InputField id={"email"} label={"Email"} value={form.email} onChange={handleChange} type="email"/>
            <PasswordField id={"password"} label={"Пароль"} value={form.password} onChange={handleChange}/>
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