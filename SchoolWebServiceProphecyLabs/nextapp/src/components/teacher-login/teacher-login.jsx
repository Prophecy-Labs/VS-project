'use client';
import React from 'react';
import {useForm} from "react-hook-form";
import Button from "@/components/Button/button.jsx";
import styles from "./teacher-login.module.css";
import Label from "@/components/Label/label.jsx";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function LoginForm(props) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()
    const router = useRouter();
    const onSubmit = (data) => {
        console.log(data);
        fetch('/Home/LogIn/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(data)
        })
            .then(response => response.text())
            .then(data => {
                console.log(data)
                if (data == "successful") {
                    router.push('/main-page');
                } 
            });
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

            {errors.login && <span>This field is required</span>}
            {errors.password && <span>This field is required</span>}

            <Button type="submit">вход</Button>
            <button className={styles.btn__lower} onClick={props.changeForm}>регистрация</button>
            <button className={styles.btn__lower} onClick={props.changeStudentForm}>Я ученик</button>
        </form>
    );
};