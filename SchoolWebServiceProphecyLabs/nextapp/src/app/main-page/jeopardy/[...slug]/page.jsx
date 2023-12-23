'use client'
import React, { useEffect, useState, useContext } from "react";
import styles from './Jeopardy.module.css';
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import GameTable from "@/components/gameTable/gameTable";
import StudListJeopardy from "@/components/studentListJeopardy/studentListJeopardy";
import { SignalRContext } from "@/app/SignalRContext";
import { useParams } from 'next/navigation'
const Jeopardy = ({ params }) => {

    const connection = useContext(SignalRContext);
    const [name, code, role] = params.slug;
    //const params = useParams < { tag: string; item: string } > ()
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
    let [studList, setStudList] = useState([]);
    const [gameContent, setGameContent] = useState({
        topic: ['тема1'],
        questions: [questions1],
        questionsText: [qn1]
    });
    const changeContent = (content) => {
        setGameContent(content);
    }; 
    const [teacher, setTeacher] = useState(true);
    const [teacherName, setTeacherName] = useState(null);
    const [content, setContent] = useState(null);
    useEffect(() => {
        connection.invoke("CheckUsers", code);
        connection.on("Notify", (newMessage, teacher) => {
            setTeacherName(teacher);
            console.log(newMessage);
            setStudList(newMessage);
           
        });
        fetch('/Home/GetGamePack/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({ login:"pepega", name:"jeopardy_test"})
        })
            .then(response => response.json())
            .then(data => {
                //console.log(data)
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
                <GameTable gameContent={gameContent} teamCode={code} role={role} name={ name } />
                <StudListJeopardy studList={studList} teacherName={teacherName} className={styles['stud-list']} />
            </div>
            <Footer/>
        </>
    );
}

export default Jeopardy;