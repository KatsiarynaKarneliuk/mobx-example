import { action, makeAutoObservable } from 'mobx';

class WordsStore {
    words = []
    error = null
    isLoading = false

    constructor(props) {
        makeAutoObservable(this)
    }

    @action fetchData = () => {
        this.isLoading = true;
        return fetch('/api/words')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong')
                }
            })
            .then((response) =>
                this.words = response,
                this.isLoading = false,
            )
        /* .then(() => this.isLoading = false) */
    }
    @action deleteWord = (id) => {
        this.isLoading = true
        this.isDisabledDelete(true)
        return fetch(`/api/words/${id}/delete`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            }
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong')
                }
            })
        /* .then(() => this.isLoading = false) */
    }
    @action updateWord = (id, value) => {
        this.isLoading(true)
        return fetch(`/api/words/${id}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                english: value.english,
                russian: value.russian,
                transcription: value.transcription,
                tags: []
            })
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong')
                }
            })
        /* .then(() => this.isLoading = false) */

    }
    @action addWord = (value) => {
        this.isLoading(true)
        return fetch('/api/words/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify({
                english: value.english,
                russian: value.russian,
                transcription: value.transcription,
                tags: []
            })
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong')
                }
            })

        /* .then(() => this.isLoading = false) */
    }
}

export default WordsStore;