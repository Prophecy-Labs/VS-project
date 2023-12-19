import React, { useEffect, useState } from "react";
import styles from './questionJeopardy.module.css'

const QuestionJeopardy = (props) => {
    const {topicIndex, questionIndex, questionsList} = props;
    const question = questionsList[topicIndex][`q${questionIndex}00`];


    const [gaveAnswer, setGaveAnswer] = useState(false);
    const [content, setContent] = useState(null);
    useEffect(() => {
        if (gaveAnswer) {
            setContent (
                <input className={styles['question-input']} placeholder="поле для ответа"/>
            )
        } else {
            setContent(
                <button className={styles['go-answer__btn']} onClick={() => setGaveAnswer(true)}>ответить</button>
            )
        }
    }, [gaveAnswer]);
    return (
        <div className={styles['question-window']}>
            <p className={styles['question-text']}>{question}</p>
            {content}
        </div>
    );
}

export default QuestionJeopardy;