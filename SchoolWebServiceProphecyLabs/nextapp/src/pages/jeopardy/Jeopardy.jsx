import React, { useEffect, useState } from "react";
import styles from './Jeopardy.module.css';
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import GameTable from "@/components/gameTable/gameTable";
import StudListJeopardy from "@/components/studentListJeopardy/studentListJeopardy";

const Jeopardy = (props) => {
    //все данные о игре брать с пропса или с бд
    //если пропс, то передавать лучше props.gameInformation = gameInfornation
    //потом прописать const {data} = props.gameInformation, легче будет:)
    const gameName = 'биология 9б царство грибов';
    let stud1 = {
        name: 'Fedor Tipok',
        score: 1000
    }
    let stud2 = {
        name: 'Goshan',
        score: 21
    }
    let stud3 = {
        name: 'Antoha',
        score: -100
    }
    let studList = [stud1, stud2, stud3];


    const questions1 = {
        p100: '100',
        p200: '200',
        p300: '300',
        p400: '400',
        p500: '500',
        p600: '600',
    }
    const questions2 = {
        p100: '100',
        p200: '200',
        p300: '300',
        p400: '400',
        p500: '500',
        p600: '600',
    }
    const questions3 = {
        p100: '100',
        p200: '200',
        p300: '300',
        p400: '400',
        p500: '500',
        p600: '600',
    }
    const questions4 = {
        p100: '100',
        p200: '200',
        p300: '300',
        p400: '400',
        p500: '500',
        p600: '600',
    }
    const questions5 = {
        p100: '100',
        p200: '200',
        p300: '300',
        p400: '400',
        p500: '500',
        p600: '600',
    }
    const questions6 = {
        p100: '100',
        p200: '200',
        p300: '300',
        p400: '400',
        p500: '500',
        p600: '600',
    }
    const qn1 = {
        q100: 'Какой гриб самый крутой?11',
        q200: 'Какой гриб самый крутой?12',
        q300: 'Какой гриб самый крутой?13',
        q400: 'Какой гриб самый крутой?14',
        q500: 'Какой гриб самый крутой?15',
        q600: 'Какой гриб самый крутой?16',
    }
    const qn2 = {
        q100: 'Какой гриб самый крутой?21',
        q200: 'Какой гриб самый крутой?22',
        q300: 'Какой гриб самый крутой?23',
        q400: 'Какой гриб самый крутой?24',
        q500: 'Какой гриб самый крутой?25',
        q600: 'Какой гриб самый крутой?26',
    }
    const qn3 = {
        q100: 'Какой гриб самый крутой?31',
        q200: 'Какой гриб самый крутой?32',
        q300: 'Какой гриб самый крутой?33',
        q400: 'Какой гриб самый крутой?34',
        q500: 'Какой гриб самый крутой?35',
        q600: 'Какой гриб самый крутой?36',
    }
    const qn4 = {
        q100: 'Какой гриб самый крутой?41',
        q200: 'Какой гриб самый крутой?42',
        q300: 'Какой гриб самый крутой?43',
        q400: 'Какой гриб самый крутой?44',
        q500: 'Какой гриб самый крутой?45',
        q600: 'Какой гриб самый крутой?46',
    }
    const qn5 = {
        q100: 'Какой гриб самый крутой?51',
        q200: 'Какой гриб самый крутой?52',
        q300: 'Какой гриб самый крутой?53',
        q400: 'Какой гриб самый крутой?54',
        q500: 'Какой гриб самый крутой?55',
        q600: 'Какой гриб самый крутой?56',
    }
    const qn6 = {
        q100: 'Какой гриб самый крутой?51',
        q200: 'Какой гриб самый крутой?52',
        q300: 'Какой гриб самый крутой?53',
        q400: 'Какой гриб самый крутой?54',
        q500: 'Какой гриб самый крутой?55',
        q600: 'Какой гриб самый крутой?56',
    }
    const gameContent = {
        topic: ['тема1', 'тема2', 'тема3', 'тема4', 'тема5', 'тема6'],
        questions: [questions1, questions2, questions3, questions4, questions5, questions6],
        questionsText: [qn1, qn2, qn3, qn4, qn5, qn6]
    }

    const [teacher, setTeacher] = useState(true);
    const [content, setContent] = useState(null);
    useEffect(() => {

        const Connection = JSON.parse(sessionStorage.getItem('signalRConnection'));




        if (teacher){
            setContent(
                <button className={styles['btn-end']}>завершить сессию</button>
            )
        } else {
            setContent();
        }
    }, []);

    return (
        <>
            <Header/>
            {content}
            <div className={styles['container']}>
                <p className={styles['game-title']}>{gameName}</p>
                <GameTable gameContent={gameContent} />
                <StudListJeopardy studList={studList} className={styles['stud-list']} />
            </div>
            <Footer/>
        </>
    );
}

export default Jeopardy;