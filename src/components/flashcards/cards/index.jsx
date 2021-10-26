import { React, useState, useEffect } from 'react';
import Flashcard from '../сard';
import styles from './index.module.css';
import { observer, inject } from "mobx-react";
import Pagination from './../../pagination'


const Flashcards = inject(['wordsStore'])(observer(({ wordsStore }) => {
    const listWords = wordsStore.words
    const [amountOfChecked, setAmountOfChecked] = useState(0);
    const upAmountOfChecked = () => {
        setAmountOfChecked(amountOfChecked + 1)
        console.log(amountOfChecked)
    }
    const [currentPage, setCurrentPage] = useState(1)
    const [perPage] = useState(10)
    const lastCardIndex = currentPage * perPage
    const firstWordIndex = lastCardIndex - perPage
    const currentWorsd = listWords.slice(firstWordIndex, lastCardIndex)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const nextPage = () => setCurrentPage(prev => prev + 1)
    const prevPage = () => setCurrentPage(prev => prev - 1)

    useEffect(() => {
        wordsStore.fetchData()
    }, [])

    return (
        < div >
            <div className={styles.countBtn} variant="outlined">Просмотрено {amountOfChecked} переводов</div>
            <div className={styles.flashcards}>
                {/* listWords */currentWorsd.map(flashcard => {
                    return <Flashcard
                        english={flashcard.english}
                        transcription={flashcard.transcription}
                        russian={flashcard.russian}
                        upAmountOfChecked={upAmountOfChecked}
                    />
                })}
            </div>
            <div className={styles.btns}>
                <button className={styles.countBtn} onClick={prevPage}>Prev Page</button>
                <Pagination
                    perPage={perPage} total={listWords.length} paginate={paginate} currentPage={currentPage}
                />
                <button className={styles.countBtn} onClick={nextPage}>Next Page</button>
            </div>
        </div >
    )
}));

export default Flashcards;