import React from 'react';
/* import Nav from '../App.js'; */
/* import LoadedComponent from '../components/isLoading'; */

import { action, observable, makeautoObservable } from 'mobx';


/* export const Context = React.createContext(); */

class WordsStore extends React.Component {
    @observable words = []
    /*  @observable isLoading: false;
     @errors: null; */
    constructor(props) {
        super(props);
        /* makeautoObservable(this) */
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
                    isLoading: false,  //выключаем индикатор
                })
            )
            .catch(error => this.setState({ error: error, isLoading: false }));
    }
    /* render() {
        const { words, isLoading, error } = this.state;

        return (
            <Provider value={{ words: words, loadData: this.loadData }} >
                <LoadedComponent isLoading={isLoading} error={error} >
                    <Nav />
                </LoadedComponent>
            </Provider >
        )
    } */
}
export default WordsStore;