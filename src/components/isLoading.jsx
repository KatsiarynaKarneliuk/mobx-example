import React from 'react'
import Spiner from './spiner'


const LoadedComponent = ({/*  words, */ isLoading, error, children }) => {
    if (isLoading /* && words.length === 0 */) {
        return (<Spiner />);

    }
    if (error) {
        return <p>(error.message)</p>;
    }
    return children //сюда попадет все, что будем оборачивать в LoadedComponent(сделать в файле context)
}
export default LoadedComponent;