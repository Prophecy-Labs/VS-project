import React, { useEffect, useState } from "react";
import styles from './Jeopardy.module.css';
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import GameTable from "@/components/gameTable/gameTable";
import StudListJeopardy from "@/components/studentListJeopardy/studentListJeopardy";
import { useRouter } from 'next/router'
import * as signalR from "@microsoft/signalr";

const Jeopardy = (props) => {
    const router = useRouter()
    if (!router.isReady) return <div>Loading...</div>
    const { params } = router.query; 
    const [name, code, role] = params.split('&');
    //все данные о игре брать с пропса или с бд
    //если пропс, то передавать лучше props.gameInformation = gameInfornation
    //потом прописать const {data} = props.gameInformation, легче будет:)
    const gameName = 'биология 9б царство грибов';
    const questions1 = {
        0: '100'
    }
    const qn1 = {
        0: 'Какой гриб самый крутой?11'
    }
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
    const [gameContent, setGameContent] = useState({
        topic: ['тема1'],
        questions: [questions1],
        questionsText: [qn1]
    });
    const changeContent = (content) => {
        setGameContent(content);
    }; 
    const [teacher, setTeacher] = useState(true);
    const [content, setContent] = useState(null);
    useEffect(() => {
        console.log(gameContent)
        //const Connection = JSON.parse(sessionStorage.getItem('signalRConnection'));
        //Connection.invoke("CheckUsers", code);
        //Connection.on("Notify", (newMessage) => {
        //    //students.push(...newMessage);
        //    //addStudent();
        //    console.log(newMessage);
        //});
        fetch('/Home/GetGamePack/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ login:"pepega", name:"jeopardy_test"})
        })
            .then(response => response.json())
            .then(data => {
                console.log(data)
                const Content = {
                    topic: data.topics.map(topic => topic.title),
                    questions: data.topics.map(topic => topic.questions.map(questions => questions.cost)),
                    questionsText: data.topics.map(topic => topic.questions.map(questions => questions.text))
                }
                console.log(Content);
               changeContent(Content);
            });


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