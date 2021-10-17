import { React, useState } from 'react'
/* import BtnAction from '../btnAction'; */
import styles from './index.module.css';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { observer, inject } from "mobx-react";




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
    const isSaveDisabled = Object.values(errors).some(el => el);


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
            wordsStore.addWord()
        }
    }
    const [open, setOpen] = useState(false);
    const handleClickOpen = () => {
        setOpen(true);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <div>
            <Button variant="outlined" onClick={handleClickOpen}>
                Добавить слово
            </Button>
            <Dialog open={open} onClose={handleClose}>
                <DialogTitle>Subscribe</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        Введите слово, транскрипцию и перевод
                    </DialogContentText>
                    <TextField name={'english'} className={errors.english && styles.error_input} onChange={handleChangeWord} value={value.english}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="english"
                        type="text"
                        fullWidth
                        variant="standard"

                    />
                    <TextField name={'transcription'} className={errors.transcription && styles.error_input} onChange={handleChangeWord} value={value.transcription}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="transcription"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                    <TextField name={'russian'} className={errors.russian && styles.error_input} onChange={handleChangeWord} value={value.russian}
                        autoFocus
                        margin="dense"
                        id="name"
                        label="russian"
                        type="text"
                        fullWidth
                        variant="standard"
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose}>Cancel</Button>
                    <Button onClick={handleSave} disabled={isSaveDisabled}>Save</Button>
                </DialogActions>
            </Dialog>
        </div>
    );
}


/* return (
    <tr>
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
            <BtnAction className={styles.btnAction} btnName="saveNewWord" onClick={handleSave} disabled={isSaveDisabled} />
        </td>
    </tr>
)
} */

export default AddNewWord;

