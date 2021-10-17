import React, { useState } from 'react';
import BtnAction from '../btnAction';
import styles from './index.module.css';
import { observer, inject } from "mobx-react";


const Row = inject(['wordsStore'])(observer(({ wordsStore }) => {

    const [editable, setEditable] = useState(false);
    const [isDisabledDelete, setIsDisabledDelete] = useState(false)
    const isLoading = wordsStore.isLoading

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
    const isSaveDisabled = Object.values(errors).some(el => el);
    const handleEdit = () => {
        setEditable(true);
        wordsStore.editWord()
    }
    const handleCancel = () => {
        setEditable(false);
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
            setIsLoading(isLoading)
            wordsStore.updateWord()
            setIsLoading(false)
            setEditable(false)
        }
    }
    const handleDelete = (id) => {
        setIsDisabledDelete(true)
        wordsStore.deleteWord()
    }

    return (
        <React.Fragment>
            {editable
                ? (<tr>
                    <td>
                        <input name={'english'} className={errors.english && styles.error_input} onChange={handleChangeWord} value={value.english} />
                        <div className={styles.textError}>{errors.english && errors.english}</div>
                    </td>
                    <td>
                        <input name={'transcription'} className={errors.transcription && styles.error_input} onChange={handleChangeWord} value={value.transcription} />
                        <div >{errors.transcription && errors.transcription}</div>
                    </td>
                    <td>
                        <input name={'russian'} className={errors.russian && styles.error_input} onChange={handleChangeWord} value={value.russian} />
                        <div>{errors.russian && errors.russian} </div>
                    </td>
                    <td>
                        <BtnAction className={styles.btnAction} btnName="save" onClick={handleSave} disabled={isSaveDisabled} />
                        <BtnAction className={styles.btnAction} btnName="cancel" onClick={handleCancel} />
                    </td>
                </tr>)
                : (<tr>
                    <td>{english}</td>
                    <td>{transcription}</td>
                    <td>{russian}</td>
                    <td>
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