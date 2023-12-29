import React, { useState, useEffect, useContext } from "react";
import styles from './gameTable.module.css';
import QuestionJeopardy from "../questionJeopardy/questionJeopardy";
import { SignalRContext } from "@/app/SignalRContext";
const GameTable = (props) => {
    const { topic, questions, questionsText, questionsAnswers } = props.gameContent;
    const connection = useContext(SignalRContext);
    const [content, setContent] = useState(null);
    const handleClick = (topicIndex, questionIndex) => {
        connection.invoke("HandleQuestion", props.params[1], topicIndex, questionIndex);
    }
    connection.on("OpenQuestion", (tIndex, qIndex) => {
        setContent(
            <QuestionJeopardy topicIndex={tIndex} questionIndex={qIndex} questionsList={questionsText} Answers={questionsAnswers} costList={questions} params={props.params} />
        );
        document.getElementById(`${tIndex}-${qIndex}`).style.visibility = 'hidden';
    });
    connection.on("QuestionResolve", () => {
        setContent(null)
    });

    return (
        <>
            {content}
            <div className={styles['game-container']}>
                <div className={styles['topic-container']}>
                    {topic.map((topic, index) => {
                        return (
                            <div className={styles['game-card']}>{topic}</div>
                        );
                    })}
                </div>
                <div className={styles['questions-container']}>
                    {questions.map((elem, index) => {
                        return (
                            <div className={styles['string-container']}>
                                {Object.values(elem).map((value, elemIndex) => {
                                    return <div key={index} id={`${index}-${elemIndex}`} className={styles['game-card']} onClick={() => handleClick(index, elemIndex)}>{value}</div>;
                                })}
                            </div>
                        );
                    })}
                </div>
            </div>
        </>
    );
}

export default GameTable;