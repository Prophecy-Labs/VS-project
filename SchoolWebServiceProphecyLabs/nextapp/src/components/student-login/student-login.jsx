'use client';
import React from 'react';
import {useForm} from "react-hook-form";
import Button from "@/components/Button/button.jsx";
import styles from "./student-login.module.css";
import Label from "@/components/Label/label.jsx";

export default function StudentForm(props) {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm()

    const onSubmit = (data) => console.log(data)

    return (
        <form className={`${styles.register__form}`} onSubmit={handleSubmit(onSubmit)}>
            <Label text={'код подключения'}
                   htmlFor={'connection_code'}></Label>
            <input
                id="connection_code"
                type="text"
                {...register("connection_code", { required: true })}
                className={styles.register__input}
            />

            <Label text={'имя'} htmlFor={'name'}></Label>
            <input
                id="name"
                type="text"
                {...register("name", { required: true })}
                className={styles.register__input}
            />

            {errors.login && <span>This field is required</span>}
            {errors.password && <span>This field is required</span>}

            <Button type="submit">вход</Button>
            <button className={styles.btn__lower} onClick={props.changeStudentForm}>я организатор</button>
        </form>
    );
};