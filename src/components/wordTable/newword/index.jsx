import { React, useState } from 'react'
import styles from './index.module.scss';
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
        if (!e.target.value.trim()) {
            setErrors({ ...errors, [e.target.name]: "введите слово" })
        } else {
            switch (e.target.name) {
                case 'english':
                    if (!/^[a-zA-Z]+$/.test(value.english)) {
                        setErrors({ ...errors, english: "Только английские буквы" })
                    }
                    break;
                case 'russian':
                    if (!/^[а-яА-Я]+$/.test(value.russian)) {
                        setErrors({ ...errors, russian: "Только на кирилице" })
                    }
                    break;
                default: setErrors({
                    english: false,
                    russian: false,
                    transcription: false,
                })
            }
        }
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
        setAddDisabled(true)
        wordsStore.addWord(value)
        setValue({
            english: '',
            russian: '',
            transcription: '',
        })
        setAddDisabled(false)
    }
    return (
        <div className={styles.newWordRow}>
            <tr className={styles.tr}>
                <td className={styles.word}>
                    <TextField required id="standard-basic" label="english" variant="standard" name='english' onChange={handleChangeWord} value={value.english} />
                    <div className={styles.textError}>{errors && errors.english}</div>
                </td>
                <td className={styles.word}>
                    <TextField required id="standard-basic" label="transcription" variant="standard" name='transcription' onChange={handleChangeWord} value={value.transcription} />
                    <div className={styles.textError}>{errors && errors.transcription}</div>
                </td>
                <td className={styles.word}>
                    <TextField required id="standard-basic" label="russian" variant="standard" name='russian' onChange={handleChangeWord} value={value.russian} />
                    <div className={styles.textError}>{errors && errors.russian} </div>
                </td>
                <td className={styles.btn}>
                    <BtnAction className={styles.btnAction} btnName="add" onClick={handleAdd} disabled={isAddDisabled}/* {Object.values(errors).some((x) => x !== false)} */ />
                    <BtnAction className={styles.btnAction} btnName="cancel" onClick={handleCancel} />
                </td>
            </tr>
        </div>
    )
}));
export default AddNewWord;



