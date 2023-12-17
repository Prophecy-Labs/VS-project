import React from "react";
import styles from './lobbyStudView.module.css';
import Image from "next/image";

const LobbyViewStud = (props) => {
    const {data} = props;

    return (
        <div className={styles['container']}>
            <p className={styles['game-title']}>{data.gameTitle}</p>
            <p className={styles['game-name']}>{data.name}</p>
            <p className={styles['game-description']}>{data.description}</p>
            <Image src={data.image} alt="gameImage" className={styles['bg-image']} />
        </div>
    );
}

export default LobbyViewStud;