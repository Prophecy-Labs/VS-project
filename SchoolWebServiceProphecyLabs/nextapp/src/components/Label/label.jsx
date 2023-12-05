import React from "react";
import styles from './label.module.css';

const Label = (props) => {
    return (
        <label className={`${styles.form__label}`} htmlFor={props.htmlFor || ''}>
            {props.text}
        </label>
    );
}

export default Label;