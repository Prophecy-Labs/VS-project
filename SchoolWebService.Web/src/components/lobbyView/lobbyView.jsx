import React from "react";
import styles from './lobbyView.module.css';
import Image from "next/image";

const LobbyView = (props) => {
    const {data} = props;

    return (
        <div className={styles['container']}>
            <p className={styles['game-title']}>{data.gameTitle}</p>
            <p className={styles['game-name']}>{data.name}</p>
            <p className={styles['game-description']}>{data.description}</p>
            <Image src={data.image} alt="gameImage" className={styles['bg-image']} />
            <button className={styles['change-btn']}>сменить игру</button>
        </div>
    );
}

export default LobbyView;