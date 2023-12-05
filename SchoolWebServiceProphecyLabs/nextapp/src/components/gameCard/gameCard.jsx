import React from "react";
import styles from "./gameCard.module.css";
import Image from "next/image";

export default function GameCard(props) {
    return (
        <div className={styles.game__card}>
            <p className={styles.game__name}>{props.gameName}</p>
            <p className={styles.game__descr}>{props.gameDescr}</p>
            <Image src={props.image} alt="gameImage" className={styles.bg__svg} />
        </div>
    );
}