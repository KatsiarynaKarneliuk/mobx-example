import React, { useState, useEffect } from 'react';
import CardWrapper from '../flashcards/cardWrapper';
import styles from './index.module.scss';
import LoadedComponent from './../isLoading';
import { observer, inject } from "mobx-react";

const Slider = inject(['wordsStore'])(observer(({ wordsStore }) => {
    const listWords = wordsStore.words;
    const isLoading = wordsStore.isLoading
    const error = wordsStore.error

    useEffect(() => {
        wordsStore.fetchData();
    }, []);
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
        <LoadedComponent isLoading={isLoading} error={error}>
            <div className={styles.slider}>
                {listWords.length &&
                    (<CardWrapper
                        onShowPrevious={showPreviousHandler}
                        onShowNext={showNextHandler}
                        number={position + 1}
                        position={position}
                        listWords={listWords}
                        dataLength={listWords.length}
                    />)
                }
            </div>
        </LoadedComponent >
    )
}));
export default Slider;