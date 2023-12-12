import React from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import styles from '../lobby.module.css';
import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { useRouter } from 'next/router'

export default function Lobby() {
    const router = useRouter()
    const { code } = router.query;
    const usersList = [];
    const [message, setMessage] = useState(JSON.stringify(usersList));

    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`/lobbyHub`, { withCredentials: false })
            .build();

        connection.start()
            .then(() => {
                console.log(router.query);
                console.log("Connection started!");
                usersList.push("Connection started!");
                connection.invoke("JoinTeam", code, "pepega");
                connection.on("Notify", (newMessage) => {
                    usersList.push(newMessage);
                    setMessage(JSON.stringify(usersList));
                });
            })
            .catch(err => console.log("Error while establishing connection :(", err));

        return () => {
            connection.stop();
        };
    }, []);

    return (
        <>
            <Header />
            <div>
                <h1>Welcome to the lobby!</h1>
                <p>Your code: {code}</p>
                <p>{message}</p>
            </div>
            <Footer />
        </>

    )
}
