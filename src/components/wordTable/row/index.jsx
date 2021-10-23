import React, { useState } from 'react';
import BtnAction from './btnAction';
import styles from './index.module.css';
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
    /* const isSaveDisabled = Object.values(errors).some(el => el); */
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
        else if (!/^[a-zA-Z\[\]]+$/.test(value.transcription)) {
            setErrors({ ...errors, transcription: "Только английские буквы" })
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
                ? (<tr>
                    <td>
                        <TextField id="standard-basic" variant="standard" name={'english'} className={errors.english && styles.error_input} onChange={handleChangeWord} value={value.english} />
                        <div className={styles.textError}>{errors.english && errors.english}</div>
                    </td>
                    <td>
                        <TextField id="standard-basic" variant="standard" name={'transcription'} className={errors.transcription && styles.error_input} onChange={handleChangeWord} value={value.transcription} />
                        <div >{errors.transcription && errors.transcription}</div>
                    </td>
                    <td>
                        <TextField id="standard-basic" variant="standard" name={'russian'} className={errors.russian && styles.error_input} onChange={handleChangeWord} value={value.russian} />
                        <div>{errors.russian && errors.russian} </div>
                    </td>
                    <td>
                        <div className={styles.btn}>
                            <BtnAction className={styles.btnAction} btnName="save" onClick={handleSave} disabled={isSaveDisabled} />
                            <BtnAction className={styles.btnAction} btnName="cancel" onClick={handleCancel} />
                        </div>
                    </td>
                </tr>)
                : (<tr>
                    <td>{english}</td>
                    <td>{transcription}</td>
                    <td>{russian}</td>
                    <td>
                        <div className={styles.btn}>
                            <BtnAction className={styles.btnAction} btnName="edit" onClick={handleEdit} />
                            <BtnAction className={styles.btnAction} btnName="delete" onClick={() => handleDelete(id)} disabled={isDisabledDelete} />
                        </div>
                    </td>
                </tr>
                )
            }
        </React.Fragment>
    )
}
export default Row;