import React from "react";
import styles from './studentListJeopardy.module.css';

const StudListJeopardy = (props) => {
    let teacherName = 'Шадрин Денис';
    let {studList} = props;

    return (
        <div className={styles['container']}>
            <div className={styles['master-card']}>
                {teacherName}
            </div>
            <div className={styles['list-container']}>
                {studList.map((student, index) => {
                    return (
                        <div className={styles['student-card']}>
                            <span className={styles['student-name']}>{student.name}</span>
                            <span className={styles['student-score']}>{student.score}</span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default StudListJeopardy;