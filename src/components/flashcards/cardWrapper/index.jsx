import React from 'react';
import Flashcard from '../сard';
import styles from './index.module.css';



const CardWrapper = ({ position, onShowPrevious, onShowNext, listWords, number, dataLength, id }) => {
    return (
        <div className={styles.cardWrapper}>
            <div className={styles.aroundCard}>
                <div className={styles.countBtn} variant="outlined" onClick={onShowPrevious}>left</div>
                <Flashcard key={id}
                    english={listWords[position].english}
                    transcription={listWords[position].transcription}
                    russian={listWords[position].russian}
                />
                <div className={styles.countBtn} variant="outlined" onClick={onShowNext}>right</div>
            </div>
            <p>{number} / {dataLength}</p>
        </div>

    )
}
export default CardWrapper;