import React from 'react'

const LoadedComponent = ({ isLoading, error, children }) => {
    if (isLoading) {
        return <p>Loading ...</p>
    }
    if (error) {
        return <p>(error.message)</p>;
    }
    return children //сюда попадет все, что будем оборачивать в LoadedComponent(сделать в файле context)
}
export default LoadedComponent;