import React from "react";
import styles from './student-list.module.css';

const StudentList = (props) => {
    //key={id} поможет при отключении кого-то из игроков
    return (
        <div className={styles['container']}>
            <p className={styles['title']}>Подключенные ученики</p>
            <ul className={styles['student-list']}>
                {props.students.map((student, id) => <li key={id} className={styles['student-li']}>{student}</li>)}
            </ul>
        </div>
    );
}

export default StudentList;