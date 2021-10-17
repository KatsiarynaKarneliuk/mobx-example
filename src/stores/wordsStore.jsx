/* import React from 'react';


import { action, observable, makeautoObservable } from 'mobx';




class WordsStore extends React.Component {
    @observable words = []

    constructor(props) {
        super(props);

        this.state = {
            words: [],
            isLoading: false,
            errors: null,
        }
    }
    componentDidMount() {
        this.setState({ isLoading: true }); //включаем индикатор
        this.loadData()
    }
    @action loadData = () => {
        fetch('/api/words')
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

}
export default WordsStore;  */