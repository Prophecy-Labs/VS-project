import React from "react";
import  styles from './button.module.css'

const Button = (props) => {
    return (
        <button
            type = {props.type}
            className={`${styles.btn_reset} ${styles.register_btn}`}
            onClick={props.onClick}
            disabled={props.disabled}
        >
            {props.children}
        </button>
    );
};

export default Button;