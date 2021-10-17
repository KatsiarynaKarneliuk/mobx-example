import React, { useState, useContext } from 'react';
import CardWrapper from '../flashcards/cardWrapper';
import styles from './index.module.css';
import { observer, inject } from "mobx-react";




const Slider = inject(['wordsStore'])(observer(({ wordsStore }) => {
    useEffect(() => {
        wordsStore.fetchData()
    }, [])
    const listWords = wordStore.words
    const [position, setPosition] = useState(0);

    const showPreviousHandler = () => {
        if (position > 0) {
            setPosition(position - 1);
        }
    };
    const showNextHandler = () => {
        if (position < listWords.length - 1) {
            setPosition(position + 1);
            console.log(position)
        }
        else {
            setPosition(0);
        }
    }

    return (
        <div className={styles.slider}>
            <CardWrapper
                onShowPrevious={showPreviousHandler}
                onShowNext={showNextHandler}
                number={position + 1}
                position={position}
                listWords={listWords}
                dataLength={listWords.length}
            />
        </div>
    )
}
export default Slider;