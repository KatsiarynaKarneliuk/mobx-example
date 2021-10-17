import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'mobx-react';
import WordsStore from './stores/wordsStore1.jsx';
import App from './App';

const stores = {
  wordsStore: new WordsStore()
}

ReactDOM.render(
  <Provider {...stores}>   
    <App />
  </Provider>,
  document.getElementById('root')
);

