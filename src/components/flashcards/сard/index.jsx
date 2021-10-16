import React, { useState, useRef, useEffect } from 'react';
import styles from './index.module.css';


function Flashcard(props) {
    const { english, transcription, russian, key } = props;
    const [flip, setFlip] = useState(false)
    const [flipCount, setFlipCount] = useState(0)

    useEffect(() => {
        if (flip && flipCount === 1 && props.upAmountOfChecked) {
            props.upAmountOfChecked()
        }
    }, [flip, flipCount]);

    const handleChange = () => {
        setFlip(!flip);
        setFlipCount((prevState) => prevState + 1)
    }
    const focusButton = useRef();
    useEffect(() => {
        focusButton.current.focus();
    }, []);

    return (
        <div className={flip ? (styles.card + ' flip') : styles.card} >
            {
                !flip
                    ? (<div className={styles.cardFront}>{key}
                        <div className={styles.english}>{english}</div>
                        <div className={styles.transcription}>{transcription}</div>
                        <button className={styles.button} onClick={handleChange} ref={focusButton}>Проверить</button>
                    </div>)
                    : (
                        <div className={styles.cardBack}>
                            <div className={styles.russian}>{russian}</div>
                            <button className={styles.button} onClick={handleChange} ref={focusButton}>Вернуться</button>
                        </div>
                    )
            }
        </div>
    );
}
export default Flashcard;

