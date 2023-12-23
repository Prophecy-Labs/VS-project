'use client'
import React from "react";
import styles from "./main-page.module.css";
import Header from "@/components/header/header";
import GameCard from "@/components/gameCard/gameCard";
import Footer from "@/components/footer/footer";
import { SignalRContext } from "@/app/SignalRContext";
import { useContext, useEffect, useState } from 'react'
export default function MainPage({ params }) {
    //const context = useContext(SignalRContext);
    const name = params.name;
    let [gameList, setGameList] = useState([]);
  
    useEffect(() => {
        fetch('/Home/GetGameList/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ Login: name })
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                setGameList(data);
            });
    }, []);
    return(
        <>
        
            <Header  />
            <div className={styles['container']}>
                {gameList.map((game) => {
                    return (
                        <GameCard
                            gameName="Своя игра"
                            gameDescr={game}
                            image={require('../../../img/jeopardy.svg')}
                            gameType="test"
                            teacherName={ name }
                        />
                    );
                })}
            </div>
            <Footer />
        </>
    );
}