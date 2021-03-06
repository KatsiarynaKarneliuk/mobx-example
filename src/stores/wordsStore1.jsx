import { action, makeAutoObservable } from 'mobx';

class WordsStore {
    words = [];
    error = null;
    isLoading = false;
    isLoaded = false;

    constructor() {
        makeAutoObservable(this)
    }
    @action fetchData = () => {
        if (this.isLoaded && this.isLoading) {
            return;
        }
        this.isLoading = true;
        this.isLoaded = false;
        return fetch('/api/words')
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong')
                }
            })
            .then((response) => {
                this.words = response;
                this.isLoading = false;
                this.isLoaded = true;

            })
            .catch(error => {
                this.error = error;
                this.isLoading = false;
                this.isLoaded = true;
            });

    }
    @action deleteWord = (id) => {
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
            .then(() => {
                this.words = this.words.filter(item => item.id !== id)
            })
            .catch(error => {
                this.error = error;
            });
    }
    @action updateWord = (id, value) => {
        const updatedWord = {
            id: id,
            english: value.english,
            russian: value.russian,
            transcription: value.transcription,
            tags: []
        }
        return fetch(`/api/words/${id}/update`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(updatedWord)
        })

            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong')
                }
            })
            .then(() => {
                const index = this.words.findIndex(item => item.id === id)
                this.words[index] = updatedWord;
            })
            .catch(error => {
                this.error = error;
            });
    }
    @action addWord = (value) => {
        const newWord = {
            english: value.english,
            russian: value.russian,
            transcription: value.transcription,
            tags: []
        };
        return fetch('/api/words/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json;charset=utf-8'
            },
            body: JSON.stringify(newWord)
        })
            .then((response) => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Something went wrong')
                }
            })
            .then(() => {
                this.words.push(newWord);
            })
            .catch(error => {
                this.error = error;
            });
    }
}

export default WordsStore;