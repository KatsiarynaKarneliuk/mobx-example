import React, { useState } from 'react';
import BtnAction from './btnAction';
import styles from './index.module.scss';
import TextField from '@mui/material/TextField';

const Row = ({ english, russian, transcription, id, deleteWord, updateWord }) => {
    const [editable, setEditable] = useState(false);
    const [isDisabledDelete, setIsDisabledDelete] = useState(false);
    const [isSaveDisabled, setSaveDisabled] = useState(false);

    const [value, setValue] = useState({
        english: english,
        russian: russian,
        transcription: transcription,
        id: id
    });
    const [errors, setErrors] = useState({
        english: false,
        russian: false,
        transcription: false
    })
    const handleEdit = () => {
        setEditable(true);
    }
    const handleCancel = () => {
        setEditable(false);
    }
    const handleDelete = (id) => {
        setIsDisabledDelete(true)
        deleteWord(id)
        setIsDisabledDelete(false)
    }
    const handleChangeWord = (e) => {
        setValue({ ...value, [e.target.name]: e.target.value })
        setErrors({ ...errors, [e.target.name]: !e.target.value.trim() })
    }
    const handleSave = () => {
        if (!/^[a-zA-Z]+$/.test(value.english)) {
            setErrors({ ...errors, english: "Только английские буквы" })
        }
        else if (!/^[а-яА-Я]+$/.test(value.russian)) {
            setErrors({ ...errors, russian: "Только на кирилице" })
        } else {
            setSaveDisabled(true)
            updateWord(id, value)
                .then(() => {
                    setSaveDisabled(false)
                    setEditable(false)
                })
        }
    }
    return (
        <React.Fragment>
            {editable
                ? (<tr className={styles.row}>
                    <td className={styles.word}>
                        <TextField id="standard-basic" variant="standard" name={'english'} className={errors.english} onChange={handleChangeWord} value={value.english} />
                        <span className={styles.textError}>{errors.english && errors.english}</span>
                    </td>
                    <td className={styles.word}>
                        <TextField id="standard-basic" variant="standard" name={'transcription'} className={errors.transcription} onChange={handleChangeWord} value={value.transcription} />
                        <span className={styles.textError}>{errors.transcription && errors.transcription}</span>
                    </td>
                    <td className={styles.word}>
                        <TextField id="standard-basic" variant="standard" name={'russian'} className={errors.russian} onChange={handleChangeWord} value={value.russian} />
                        <span className={styles.textError}>{errors.russian && errors.russian} </span>
                    </td>
                    <td className={styles.btns}>
                        <BtnAction className={styles.btnAction} btnName="save" onClick={handleSave} disabled={isSaveDisabled} />
                        <BtnAction className={styles.btnAction} btnName="cancel" onClick={handleCancel} />
                    </td>
                </tr>)
                : (<tr className={styles.row}>
                    <td className={styles.word}>{english}</td>
                    <td className={styles.word}>{transcription}</td>
                    <td className={styles.word}>{russian}</td>
                    <td className={styles.btns}>
                        <BtnAction className={styles.btnAction} btnName="edit" onClick={handleEdit} />
                        <BtnAction className={styles.btnAction} btnName="delete" onClick={() => handleDelete(id)} disabled={isDisabledDelete} />
                    </td>
                </tr>
                )
            }
        </React.Fragment>
    )
}
export default Row;