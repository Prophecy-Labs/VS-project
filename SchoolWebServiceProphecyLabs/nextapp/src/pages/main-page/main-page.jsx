import React from "react";
import styles from "@/pages/main-page/main-page.module.css";
import Header from "@/components/header/header";
import GameCard from "@/components/gameCard/gameCard";
import Footer from "@/components/footer/footer";

export default function MainPage() {

    return(
        <>
            <Header  />
            <div className={styles['container']}>
                <GameCard
                    gameName="Своя игра"
                    gameDescr="История 10г Первая мировая"
                    image={require('../../img/jeopardy.svg')}
                    gameType="test"
                />
                <GameCard
                    gameName="Слабое звено"
                    gameDescr="Биология 6А Размножение"
                    image={require('../../img/weak-link.svg')}
                    gameType="weakLink"
                />
                <GameCard
                    gameName="тест 3"
                    gameDescr="История 10В Реформы Александра Первого"
                    image={require('../../img/test.svg')}
                    gameType="test"
                />
                <GameCard
                    gameName="тест 4"
                    gameDescr="История 10В Реформы Александра Первого"
                    image={require('../../img/test.svg')}
                    gameType="test"
                />
                <GameCard
                    gameName="тест 5"
                    gameDescr="История 10В Реформы Александра Первого"
                    image={require('../../img/test.svg')}
                    gameType="test"
                />
                <GameCard
                    gameName="тест 6"
                    gameDescr="История 10В Реформы Александра Первого"
                    image={require('../../img/test.svg')}
                    gameType="test"
                />
            </div>
            <Footer />
        </>
    );
}