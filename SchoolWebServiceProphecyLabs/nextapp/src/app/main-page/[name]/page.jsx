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
               
                {/*<GameCard*/}
                {/*    gameName="Слабое звено"*/}
                {/*    gameDescr="Биология 6А Размножение"*/}
                {/*    image={require('../../../img/weak-link.svg')}*/}
                {/*    gameType="weakLink"*/}
                {/*/>*/}
                {/*<GameCard*/}
                {/*    gameName="тест 3"*/}
                {/*    gameDescr="История 10В Реформы Александра Первого"*/}
                {/*    image={require('../../../img/test.svg')}*/}
                {/*    gameType="test"*/}
                {/*/>*/}
                {/*<GameCard*/}
                {/*    gameName="тест 4"*/}
                {/*    gameDescr="История 10В Реформы Александра Первого"*/}
                {/*    image={require('../../../img/test.svg')}*/}
                {/*    gameType="test"*/}
                {/*/>*/}
                {/*<GameCard*/}
                {/*    gameName="тест 5"*/}
                {/*    gameDescr="История 10В Реформы Александра Первого"*/}
                {/*    image={require('../../../img/test.svg')}*/}
                {/*    gameType="test"*/}
                {/*/>*/}
                {/*<GameCard*/}
                {/*    gameName="тест 6"*/}
                {/*    gameDescr="История 10В Реформы Александра Первого"*/}
                {/*    image={require('../../../img/test.svg')}*/}
                {/*    gameType="test"*/}
                {/*/>*/}
            </div>
            <Footer />
        </>
    );
}