import React, { useState, useEffect } from 'react';
import styles from './index.module.scss';


function Flashcard(props) {
    const { english, transcription, russian, id } = props;
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
    return (
        <div className={flip ? (styles.card + ' flip') : styles.card} >
            {
                !flip
                    ? (<div className={styles.cardFront}>{id}
                        <div className={styles.english}>{english}</div>
                        <div className={styles.transcription}>{transcription}</div>
                        <button className={styles.button} onClick={handleChange}>Проверить</button>
                    </div>)
                    : (
                        <div className={styles.cardBack}>
                            <div className={styles.russian}>{russian}</div>
                            <button className={styles.button} onClick={handleChange}>Вернуться</button>
                        </div>
                    )
            }
        </div>
    );
}
export default Flashcard;

