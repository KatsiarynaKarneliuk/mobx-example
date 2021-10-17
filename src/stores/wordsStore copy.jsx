import React from 'react';
import { action, makeAutoObservable } from 'mobx';

class WordsStore extends React.Component {
    words = []
    error = null
    isLoading = false
    id = null
    value = " "

    constructor(props) {
        super(props);
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
                this.setState({
                    words: response,
                    isLoading: false,
                })
            )
            .catch(error => this.setState({ error: error, isLoading: false }));
    }
    @action deleteWord = (id) => {
        this.isLoading(true)
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
            .then(() => this.setState({ isLoading: false, isDisabledDelete: false }))
    }
    @action updateWord = () => {
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
            .then(() => this.setState({ isLoading: false, isEditable: false }))

    }
    @action addWord = () => {
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

            .then(() => this.setState({ isLoading: false })
    }
}

export default WordsStore;