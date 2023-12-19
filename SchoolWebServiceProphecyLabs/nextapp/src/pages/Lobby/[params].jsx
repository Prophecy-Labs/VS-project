import React, { useEffect, useState } from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import styles from './lobby.module.css';
import StudentList from "@/components/student-list/student-list";
import LobbyView from "@/components/lobbyView/lobbyView";
import LobbyViewStud from "@/components/LobbyVeiwForStudent/LobbyStudView";
import { useRouter } from 'next/router'
import * as signalR from "@microsoft/signalr";
export default function Lobby(props) {
    const router = useRouter()
    if (!router.isReady) return <div>Loading...</div>
    const { params } = router.query; 
    const [name, code, role] = params.split('&');

    const teacherName = 'Иванов И. И.';

    const [students, setStudents] = useState([]);

    const addStudent = () => {
        setStudents([...students]);
    };
    const connectionCode = code;//заменить на данные с бэка
    const gameInformation = {
        gameTitle: 'своя игра',
        name: 'История 10Г Первая мировая война',
        description: 'своя игра - это...',
        image: require('../../img/jeopardy.svg'),
    }

    const [member, setMember] = useState(role);//изменять member можно в любом другом месте
    const [container, setContainer] = useState(null);
    useEffect(() => {

        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`/lobbyHub`, { withCredentials: false })
            .build();

        sessionStorage.setItem('signalRConnection', JSON.stringify(connection));

        connection.start()
            .then(() => {
                console.log("Connection started!");
                connection.invoke("JoinTeam", code, name);
                connection.on("Notify", (newMessage) => {
                    students.splice(0, students.length);
                    students.push(...newMessage);
                    addStudent();
                    console.log(students);
                });
                connection.on("Start Game", () => {
                    e.preventDefault();
                    router.push(`/jeopardy/Jeopardy`);
                })
            })
            .catch(err => console.log("Error while establishing connection :(", err));

        const startGame = (e) => {   
            connection.invoke("StartGame");
        }

        if (member === 'teacher') {
            setContainer(
                <div className="left-container">
                    <span className={styles["top-span"]}>КОД ПОДКЛЮЧЕНИЯ: {connectionCode}</span>
                    <div className={styles['game-settings']}>
                        <button className={styles['btn-start']} onClick={startGame}>Начать сессию</button>
                        <LobbyView data={gameInformation} />
                        <button className={styles['btn-end']}>закрыть сессию</button>
                    </div>
                </div>
            );
        } else {
            setContainer(
                <div className="left-container">
                    <span className={styles['top-span']}>Организатор: {teacherName}</span>
                    <div className={styles['game-settings']}>
                        <LobbyViewStud data={gameInformation} />
                        <button className={styles['disconnect-btn']}>отключиться</button>
                    </div>
                </div>
            );
        }
        return () => {
            connection.stop();
        };
    }, []);

    //заменить gameInformation = {} на {gameInformation} = props, в котором данные будут так же написаны, их можно получить в gameCard и передать в лобби.(пример такого присвоения есть в gameView.jsx)

    return (
        <>
            <Header />
            <div className={styles['container']}>
                {container}
                <StudentList students={students} className={styles['student-list']} />
            </div>
            <Footer/>
        </>
    )
}