import { React, useState } from 'react'
import styles from './index.module.css';
import TextField from '@mui/material/TextField';
import { observer, inject } from "mobx-react";
import BtnAction from './btnAction';



const AddNewWord = inject(['wordsStore'])(observer(({ wordsStore }) => {
    const [value, setValue] = useState({
        english: '',
        russian: '',
        transcription: '',
    });
    const [errors, setErrors] = useState({
        english: false,
        russian: false,
        transcription: false
    })
    const [isAddDisabled, setAddDisabled] = useState(false);

    const handleChangeWord = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: !e.target.value.trim() })
    }
    const handleCancel = (e) => {
        setValue({
            english: '',
            russian: '',
            transcription: '',
        });
        setErrors({
            english: false,
            russian: false,
            transcription: false,
        })
    }
    const handleAdd = () => {
        if (!/^[a-zA-Z]+$/.test(value.english)) {
            setErrors({ ...errors, english: "Только английские буквы" })
        }
        else if (!/^[а-яА-Я]+$/.test(value.russian)) {
            setErrors({ ...errors, russian: "Только на кирилице" })
        } else if (value.english === 0) {
            setErrors({ ...errors, russian: "введите слово" })
        }
        else {
            setAddDisabled(true)
            wordsStore.addWord(value)
            setValue({
                english: '',
                russian: '',
                transcription: '',
            })
            setAddDisabled(false)
        }
    }
    return (
        <div className={styles.newWordRow}>
            <tr className={styles.tr}>
                <td className={styles.word}>
                    <TextField id="standard-basic" label="english" variant="standard" name={'english'} className={errors.english && styles.error_input} onChange={handleChangeWord} value={value.english} />
                    <div className={styles.textError}>{errors.english && errors.english}</div>
                </td>
                <td className={styles.word}>
                    <TextField id="standard-basic" label="transcription" variant="standard" name={'transcription'} className={errors.transcription && styles.error_input} onChange={handleChangeWord} value={value.transcription} />
                    <div className={styles.textError}>{errors.transcription && errors.transcription}</div>
                </td>
                <td className={styles.word}>
                    <TextField id="standard-basic" label="russian" variant="standard" name={'russian'} className={errors.russian && styles.error_input} onChange={handleChangeWord} value={value.russian} />
                    <div className={styles.textError}>{errors.russian && errors.russian} </div>
                </td>
                <td className={styles.btn}>
                    <BtnAction className={styles.btnAction} btnName="add" onClick={handleAdd} disabled={isAddDisabled} />
                    <BtnAction className={styles.btnAction} btnName="cancel" onClick={handleCancel} />
                </td>
            </tr>
        </div>
    )
}));
export default AddNewWord;



