'use client'
import React, { useEffect, useState, useContext } from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import styles from './lobby.module.css';
import StudentList from "@/components/student-list/student-list";
import LobbyView from "@/components/lobbyView/lobbyView";
import LobbyViewStud from "@/components/LobbyVeiwForStudent/LobbyStudView";
import { useRouter } from 'next/navigation';
import { SignalRContext } from "@/app/SignalRContext";

export default function Lobby({ params }) {
    
    const router = useRouter();
    const [students, setStudents] = useState([]);
    const name = params.slug[0]
    const role = params.slug[2]
    const addStudent = () => {
        setStudents([...students]);
    };
    const connectionCode = params.slug[1];
    const gameInformation = {
        gameTitle: 'своя игра',
        name: 'История 10Г Первая мировая война',
        description: 'своя игра - это...',
        image: require('../../../../img/jeopardy.svg'),
    }
    const connection = useContext(SignalRContext);

    const [teacherName, setTeacherName] = useState("");

    const [member, setMember] = useState(role);
    const [container, setContainer] = useState(null);
    useEffect(() => {

        if (connection && connection._connectionState == "Disconnected") {
            connection.start()
                .then(() => {
                    connection.invoke("JoinTeam", connectionCode, name, role);
                    connection.on("Notify", (newMessage, teacher) => {
                        students.splice(0, students.length);
                        students.push(...newMessage.map(item => item.name));
                        addStudent();
                        setTeacherName("John Doe");
                        console.log(teacherName);
                    });
                });

           
          
        }
        const startGame = () => {
            connection.invoke("StartGame", connectionCode);
        }
        connection.on("GamePush", () => {
            //e.preventDefault();
            
            router.push(`/main-page/jeopardy/${name}/${connectionCode}/${role}`);
        })
            if (member === 'teacher') {
                setContainer(
                    <div className="left-container">
                        <span className={styles["top-span"]}>КОД ПОДКЛЮЧЕНИЯ: {connectionCode}</span>
                        <div className={styles['game-settings']}>
                            <button className={styles['btn-start']} onClick={startGame} >Начать сессию</button>
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
        }, []);

    //заменить gameInformation = {} на {gameInformation} = props, в котором данные будут так же написаны, их можно получить в gameCard и передать в лобби.(пример такого присвоения есть в gameView.jsx)

    return (
        <>
           
            <Header />
                    <div className={styles['container']}>
                        {container}
                        <StudentList students={students} className={styles['student-list']} />
                    </div>
                <Footer />
        </>
    )
}