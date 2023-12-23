import React, { useContext, useEffect, useState } from "react";
import styles from "./questionJeopardy.module.css";
import { SignalRContext } from "@/app/SignalRContext";
const QuestionJeopardy = (props) => {
  const { topicIndex, questionIndex, questionsList, costList, role, name } = props;
  const question = questionsList[topicIndex][`${questionIndex}`];
  const cost = costList[topicIndex][`${questionIndex}`];
    const [member, setMember] = useState(role);
    //const [studentName, setStudentName] = useState("");
  const connection = useContext(SignalRContext);

    //connection.on("GetAnswer", (sName, answer) => { Эта хуйня должна получить какой именно еблан отвечает на вопрос, и его ответ
    //    setStudentName();

    //})

  const [teacherContent, setTeacherContent] = useState(
    <div>
      <input
        type="text"
        className={styles["question-input"]}
        placeholder="ответ ученика"
        disabled={true}
      />
          <div className={styles["teacher-buttons"]}>
              <button className={styles["count-ans__btn"]} onClick={handleAnswer(cost)}>зачесть ответ</button>
              <button className={styles["dont-count-ans__btn"]} onClick={handleAnswer(-cost)} >Пропустить</button>
          </div>
    </div>
  );
    //const handleAnswer = (score) => {
    //    connection.invoke("HandleAnswer", props.teamcode, studentName, props.score); Это хуйня обаюатывает ответ учителя на ответ игрока
    //} 

  const [timer, setTimer] = useState(30);

    useEffect(() => {
        if (time != 0) {
            const interval = setInterval(() => {
                setTimer((timer) => timer - 1);
            }, 1000);
        } else {
      //      connection.invoke("GiveAnswer", name, ); Тут надо еще передать значение ответа
        }
    return () => clearInterval(interval);
  }, []);

  const [gaveAnswer, setGaveAnswer] = useState(false);
  const [content, setContent] = useState(
    <button
      className={styles["go-answer__btn"]}
      onClick={() => setGaveAnswer(true)}
    >
      ответить
    </button>
  );
  useEffect(() => {
    if (gaveAnswer) {
      setContent(
        <input
          className={styles["question-input"]}
          placeholder="поле для ответа"
        />
      );
    } else {
      setContent(
        <button
          className={styles["go-answer__btn"]}
          onClick={() => setGaveAnswer(true)}
        >
          ответить
        </button>
      );
    }
  }, [gaveAnswer]);

  useEffect(() => {
    if (member === "teacher") {
      setTeacherContent(
        <div className={styles["teacher-container"]}>
          <input
            type="text"
            className={styles["question-input"]}
            placeholder="ответ ученика"
            disabled
          />
          <div className={styles["teacher-buttons"]}>
            <button className={styles["count-ans__btn"]}>зачесть ответ</button>
            <button className={styles["dont-count-ans__btn"]}>
              Пропустить
            </button>
          </div>
        </div>
      );
    } else {
      setTeacherContent({ content });
    }
  }, [member]);

  return (
    <div className={styles["question-window"]}>
      <div className={styles['progress-bar']} style={{width: `${(timer/30 *100)}%`}}>
        <div className={styles["timer"]}>{timer}</div> 
      </div>
      <p className={styles["question-text"]}>{question}</p>
      {member === "teacher" ? teacherContent : content}
    </div>
  );
};

export default QuestionJeopardy;
