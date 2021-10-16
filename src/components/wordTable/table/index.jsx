import { React, /* useState, */ useContext } from 'react';
import styles from './index.module.css';
import Row from '../row';
import { Context } from '../../../gotWords';
import LoadedComponent from '../../isLoading';
import AddNewWord from '../newword';


function Table({ isLoading, error }) {
    const context = useContext(Context);
    console.log(context)
    const listWords = context.words
    console.log(listWords)
    const refreshData = context.loadData
    console.log(refreshData)
    return (
        <LoadedComponent isLoading={isLoading} error={error}>
            <div className={styles.wraper}>
                <table className={styles.table}>
                    <caption><h1>Слова для изучения</h1></caption>
                    <AddNewWord refreshData={refreshData}></AddNewWord>
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
}
export default Table;

