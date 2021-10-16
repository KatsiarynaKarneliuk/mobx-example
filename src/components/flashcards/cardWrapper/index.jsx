import React from 'react';
import Flashcard from '../сard';
import styles from './index.module.css';
import Button from '@mui/material/Button';


const CardWrapper = ({ position, onShowPrevious, onShowNext, listWords, number, dataLength }) => {


    return (
        <div className={styles.cardWrapper}>
            <div className={styles.aroundCard}>
                <Button className={styles.countBtn} variant="outlined" onClick={onShowPrevious}>left</Button>
                <Flashcard
                    english={listWords[position].english}
                    transcription={listWords[position].transcription}
                    russian={listWords[position].russian}
                />
                <Button className={styles.countBtn} variant="outlined" onClick={onShowNext}>right</Button>
            </div>
            <p>{number} / {dataLength}</p>
        </div>
    )
}
export default CardWrapper;