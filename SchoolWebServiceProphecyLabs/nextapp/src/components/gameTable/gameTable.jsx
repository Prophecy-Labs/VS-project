import React, { useState } from "react";
import styles from './gameTable.module.css';
import QuestionJeopardy from "../questionJeopardy/questionJeopardy";

const GameTable = (props) => {
    const {topic, questions, questionsText} = props.gameContent;

    const [content, setContent] = useState(null);
    const handleClick = (topicIndex, questionIndex) => {
        setContent(
            <QuestionJeopardy topicIndex={topicIndex} questionIndex={questionIndex + 1} questionsList={questionsText} />
        )
    }

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
                                    return <div key={index} className={styles['game-card']} onClick={() => handleClick(index, elemIndex)}>{value}</div>;
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