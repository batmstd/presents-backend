import React, {useState} from 'react';
import {createStyles, Theme, Typography} from "@material-ui/core";
import makeStyles from "@material-ui/core/styles/makeStyles";
import Button from "@material-ui/core/Button";
import {Link} from "../../elements/CustomElements";
import axios from 'axios';
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

    function signIn(event: React.FormEvent<HTMLFormElement>) {
        event.preventDefault();
        const {email, password} = form;
        console.log(email, password);
        if (email === "" || password === "") return;
        axios({
            method: 'POST',
            url: '/login/user',
            auth: {
                username: email,
                password
            }
        }).then((res) => console.log(res.data), err => console.log(err));
    }

    return (<>
        <Typography variant={"h5"}>Авторизация</Typography>
        <form className={classes.container} onSubmit={signIn}>
            <InputField id={"email"} label={"Email"} value={form.email} onChange={handleChange} type="email"/>
            <PasswordField id={"password"} label={"Пароль"} value={form.password} onChange={handleChange}/>
            <Button type="submit" className={classes.field} color={"primary"} variant={"contained"}>Войти</Button>
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