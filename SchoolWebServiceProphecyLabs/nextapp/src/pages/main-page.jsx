import React from "react";
import styles from "@/pages/main-page/main-page.module.css";
import Header from "@/components/header/header";
import GameCard from "@/components/gameCard/gameCard";
import Footer from "@/components/footer/footer";

export default function MainPage() {
    return(
        <>
            <Header  />
            <div className={styles.container}>
                <GameCard
                    gameName="тест"
                    gameDescr="История 10В Реформы Александра Первого"
                    image={require('../img/test.svg')}
                />
                <GameCard
                    gameName="тест"
                    gameDescr="История 10В Реформы Александра Первого"
                    image={require('../img/test.svg')}
                />
                <GameCard
                    gameName="тест"
                    gameDescr="История 10В Реформы Александра Первого"
                    image={require('../img/test.svg')}
                />
                <GameCard
                    gameName="тест"
                    gameDescr="История 10В Реформы Александра Первого"
                    image={require('../img/test.svg')}
                />
                <GameCard
                    gameName="тест"
                    gameDescr="История 10В Реформы Александра Первого"
                    image={require('../img/test.svg')}
                />
                <GameCard
                    gameName="тест"
                    gameDescr="История 10В Реформы Александра Первого"
                    image={require('../img/test.svg')}
                />
            </div>
            <Footer />
        </>
    );
}