import React, { useContext, useEffect, useState } from "react";
import styles from "./questionJeopardy.module.css";
import { SignalRContext } from "@/app/SignalRContext";
const QuestionJeopardy = (props) => {
    const { topicIndex, questionIndex, questionsList, Answers, costList, params } = props;
    const [name, code, role] = props.params;
    const question = questionsList[topicIndex][`${questionIndex}`];
    const cost = costList[topicIndex][`${questionIndex}`];
    const trueAnswer = Answers[topicIndex][`${questionIndex}`];
    const [member, setMember] = useState(role);
    //const [studentName, setStudentName] = useState("");
    const connection = useContext(SignalRContext);
    const [gaveAnswer, setGaveAnswer] = useState(false);

    const [stopTimer, setStopTimer] = useState(false);
    connection.on("GetAnswer", (sName, answer) => {
        setStopTimer(true);
        setTeacherContent(
            <div className={styles["teacher-container"]}>
                <p className={styles["regular-text"]}
                > {sName}</p>
                <input
                    type="text"
                    className={styles["question-input"]}
                    placeholder={answer ? answer : 'Нет ответа'}
                    disabled
                    id=''
                />
                <p className={styles["regular-text"]}
                >Правильный ответ: {trueAnswer}</p>
                <div className={styles["teacher-buttons"]}>
                    <button className={styles["count-ans__btn"]} onClick={() => handleAnswer(cost, sName)}>Верно</button>

                    <button className={styles["dont-count-ans__btn"]} onClick={() => handleAnswer(-cost, sName)}>

                        Неверно

                    </button>
                </div>
            </div>
        );
    });
    connection.on("BlockButton", () => {
        let btn = document.getElementById("answer button");
            btn.disabled = true;
    });
    const [studAnswer, setStudAnswer] = useState('');

    const [teacherContent, setTeacherContent] = useState('');
    const handleAnswer = (score, studentName) => {
        connection.invoke("HandleAnswer", code, studentName, score);
    } 

    const [timer, setTimer] = useState(30);

    useEffect(() => {
        let interval;//твой таймер был написан неправильно, я переписал
        //теперь таймер останавливается, если кто-то дал ответ на вопрос
        if (timer > 0 && !stopTimer) {
            interval = setInterval(() => {
                setTimer((timer) => timer - 1);
            }, 1000);
        } else {
            if (gaveAnswer) {
                GiveAnswer();
            }
            if (role == "teacher" && !stopTimer) {
                connection.invoke("NoAnswers", code);
            }
        }

        return () => clearInterval(interval);
    }, [timer]);
 
  const [content, setContent] = useState(null);

    const GiveAnswer = () => {
        let input = document.getElementById('student-input').value;
        connection.invoke("GiveAnswer", code, name, input);
    }

    useEffect(() => {
        if (gaveAnswer) {
            setContent(
                <div className={styles["student-container"]}>
                    <input
                        className={styles["question-input"]}
                        placeholder="поле для ответа"
                        id="student-input"
                        onChange={(e) => setStudAnswer(e.target.value)}
                    />
                        <button className={styles["count-ans__btn"]} onClick={GiveAnswer}>Отправить</button>
                </div>
            );//когда любой ученик тыкает кнопку ответить у учителя отображается интуп задизейбленный, в котором выведеться значение ученика
          
        } else {
            setContent(
                <button
                    id = "answer button"
                    className={styles["go-answer__btn"]}
                    onClick={() => { setGaveAnswer(true); connection.invoke("BlockButton", code); }}
                >
                    ответить
                </button>
            );
            setTeacherContent(
                <div className={styles["regular-text"]}>Еще не один ученик не дал ответ</div>
            );
        }
    }, [gaveAnswer]);

    return (
        <div className={styles["question-window"]}>
            <div className={styles['progress-bar']} style={{ width: `${(timer / 30 * 100)}%` }} />
            <p className={styles["question-text"]}>{question}</p>
            {member === "teacher" ? teacherContent : content}
        </div>
    );
};


export default QuestionJeopardy;
