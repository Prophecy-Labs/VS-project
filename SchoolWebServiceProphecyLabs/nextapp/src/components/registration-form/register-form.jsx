'use client';
import React from 'react';
import {useForm} from "react-hook-form";
import Button from "@/components/Button/button.jsx";
import styles from "./register-form.module.css";
import Label from "@/components/Label/label.jsx";

export default function RegForm(props) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => {
        console.log(data);
        fetch('/Home/Register/', { 
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.text())
            .then(data => console.log(data));
    };

    return (
        <form className={`${styles.register__form}`} onSubmit={handleSubmit(onSubmit)}>
            <Label text={'логин'}
                   htmlFor={'login'}></Label>
            <input
                id="login"
                type="text"
                {...register("login", { required: true })}
                className={styles.register__input}
            />

            <Label text={'пароль'} htmlFor={'password'}></Label>
            <input
                id="password"
                type="password"
                {...register("password", { required: true })}
                className={styles.register__input}
            />

            <Label text={'почта'} htmlFor={'email'}></Label>
            <input
                id="email"
                type="email"
                {...register("email", { required: true })}
                className={styles.register__input}
            />
            {errors.login && <span>This field is required</span>}
            {errors.password && <span>This field is required</span>}
            {errors.email && <span>This field is required</span>}

            <Button type="submit">регистрация</Button>
            <button className={styles.btn__lower} onClick={props.changeForm}>войти</button>
        </form>
    );
};