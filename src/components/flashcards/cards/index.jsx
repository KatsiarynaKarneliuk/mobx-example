import { React, useState, useEffect } from 'react';
import Flashcard from '../сard';
import styles from './index.module.css';
import Button from '@mui/material/Button';
import { observer, inject } from "mobx-react";


const Flashcards = inject(['wordsStore'])(observer(({ wordsStore }) => {
    const listWords = wordsStore.words
    const [amountOfChecked, setAmountOfChecked] = useState(0);
    const upAmountOfChecked = () => {
        setAmountOfChecked(amountOfChecked + 1)
        console.log(amountOfChecked)
    }

    useEffect(() => {
        wordsStore.fetchData()
    }, [])

    return (
        < div >
            <Button className={styles.countBtn} variant="outlined">Просмотрено {amountOfChecked} переводов</Button>
            <div className={styles.flashcards}>
                {listWords.map(flashcard => {
                    return <Flashcard
                        english={flashcard.english}
                        transcription={flashcard.transcription}
                        russian={flashcard.russian}
                        upAmountOfChecked={upAmountOfChecked}
                    />
                })}
            </div>
        </div >
    )
}));

export default Flashcards;