import { React, useEffect } from 'react';
import styles from './index.module.css';
import Row from '../row';
import LoadedComponent from '../../isLoading';
import AddNewWord from '../newword';
import { observer, inject } from "mobx-react";


const Table = inject(['wordsStore'])(observer(({ wordsStore }) => {
    const listWords = wordsStore.words
    console.log('listwords', listWords)
    const isLoading = wordsStore.isLoading
    const error = wordsStore.error
    const fetchData = wordsStore.fetchData
    const deleteWord = wordsStore.deleteWord
    const updateWord = wordsStore.updateWord

    useEffect(() => {
        wordsStore.fetchData();
    }, []);

    return (
        <LoadedComponent isLoading={isLoading} error={error}>
            <div className={styles.wraper}>
                <AddNewWord handleSave={fetchData} />
                <table className={styles.table}>
                    <caption><h1>Слова для изучения</h1></caption>
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
                                updateWord={word.updateWord}
                                deleteWord={word.deleteWord}
                            />
                        )}
                    </tbody>
                </table>
            </div>
        </LoadedComponent >
    )
}));
export default Table;

