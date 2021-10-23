import { React, useEffect, useState } from 'react';
import styles from './index.module.css';
import Row from '../row';
import LoadedComponent from '../../isLoading';
import AddNewWord from '../newword';
import Pagination from './../../pagination'
import { observer, inject } from "mobx-react";


const Table = inject(['wordsStore'])(observer(({ wordsStore }) => {
    const listWords = wordsStore.words
    console.log('listwords', listWords)
    const isLoading = wordsStore.isLoading
    const error = wordsStore.error
    const fetchData = wordsStore.fetchData
    const deleteWord = wordsStore.deleteWord
    const updateWord = wordsStore.updateWord

    const [currentPage, setCurrentPage] = useState(1)
    const [perPage] = useState(5)
    const lastRowIndex = currentPage * perPage
    const firstRowIndex = lastRowIndex - perPage
    const currentRow = listWords.slice(firstRowIndex, lastRowIndex)

    const paginate = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    const nextPage = () => setCurrentPage(prev => prev + 1)
    const prevPage = () => setCurrentPage(prev => prev - 1)



    useEffect(() => {
        wordsStore.fetchData();
    }, []);

    return (
        <LoadedComponent isLoading={isLoading} error={error} /* words={listWords} */>
            <div className={styles.wraper}>
                <AddNewWord fetchData={fetchData} />
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
                        {/* listWords */currentRow.map(word =>
                            <Row
                                id={word.id}
                                english={word.english}
                                transcription={word.transcription}
                                russian={word.russian}
                                updateWord={updateWord}
                                deleteWord={deleteWord}
                            />
                        )}
                    </tbody>
                </table>
                <div className={styles.btns}>
                    <button className={styles.countBtn} onClick={prevPage}>Prev Page</button>
                    <Pagination
                        perPage={perPage} total={listWords.length} paginate={paginate}
                    />
                    <button className={styles.countBtn} onClick={nextPage}>Next Page</button>
                </div>
            </div>
        </LoadedComponent >
    )
}));
export default Table;

