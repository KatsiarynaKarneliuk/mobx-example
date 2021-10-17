import { React, useEffect } from 'react';
import styles from './index.module.css';
import Row from '../row';
import LoadedComponent from '../../isLoading';
import AddNewWord from '../newword';
import { observer, inject } from "mobx-react";



const Table = inject(['wordsStore'])(observer(({ wordsStore }) => {
    useEffect(() => {
        wordsStore.fetchData()
    }, [])
    const listWords = wordsStore.words()
    console.log(listWords)
    const isLoading = wordsStore.isLoading
    const error = wordsStore.error

    return (
        <LoadedComponent isLoading={isLoading} error={error}>
            <div className={styles.wraper}>
                <table className={styles.table}>
                    <caption><h1>Слова для изучения</h1></caption>
                    <AddNewWord></AddNewWord>
                    <thead className={styles.thead}>
                        <tr className={styles.tr}>
                            <td>english</td>
                            <td>transcription</td>
                            <td>russian</td>
                            <td>Action</td>
                        </tr>
                    </thead>

                    <tbody className={styles.tbody}>
                        {listWords.map(word =>
                            <Row
                                id={word.id}
                                english={word.english}
                                transcription={word.transcription}
                                russian={word.russian}
                                refreshData={word.refreshData}
                            />
                        )}
                    </tbody>
                </table>
            </div>
        </LoadedComponent >
    )
}));
export default Table;

