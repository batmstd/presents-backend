import React, {useState} from 'react';
import {createStyles, Theme, Typography} from "@material-ui/core";
import Button from "@material-ui/core/Button";
import makeStyles from "@material-ui/core/styles/makeStyles";
import {InputField, PasswordField} from "../../elements/CustomInputs";

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

    function handleChange({target: {id, value}}: React.ChangeEvent<HTMLInputElement>) {
        setForm(oldValues => ({...oldValues, [id]: value}))
    }

    return (<>
        <Typography variant={"h5"}>Регистрация</Typography>
        <form className={classes.container} autoComplete="off">
            <InputField id={"name"} label={"Имя"} value={form.name} onChange={handleChange}/>
            <InputField id={"email"} label={"Email"} value={form.email} onChange={handleChange} type="email"/>
            <PasswordField id={"password"} label={"Пароль"} value={form.password} onChange={handleChange}/>
            <PasswordField id={"repeatPassword"} label={"Повтор пароля"} value={form.repeatPassword} onChange={handleChange}/>
            <Button className={classes.field} color={"primary"} variant={"contained"}>Зарегистрироваться</Button>
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

export default SignUp;