import React from "react";
import Header from "@/components/header/header";
import Footer from "@/components/footer/footer";
import styles from '../lobby.module.css';
import { useEffect, useState } from "react";
import * as signalR from "@microsoft/signalr";
import { useRouter } from 'next/router'

export default function Lobby() {
    const router = useRouter()
    if (!router.isReady) return <div>Loading...</div>
    const { params } = router.query; 

    const usersList = [];
    const [message, setMessage] = useState(JSON.stringify(usersList));

    var parts = params.split('&');
    var name = parts[0];
    var code = parts[1];
    useEffect(() => {
        const connection = new signalR.HubConnectionBuilder()
            .withUrl(`/lobbyHub`, { withCredentials: false })
            .build();

        connection.start()
            .then(() => {
                
               
                console.log("Connection started!");
                usersList.push("Connection started!");
                connection.invoke("JoinTeam", code, name);
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
                <p>Your code: {params}</p>
                <p>{message}</p>
            </div>
            <Footer />
        </>
        
    )
}
