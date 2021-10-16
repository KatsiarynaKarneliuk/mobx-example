import React from 'react';
import ReactDOM from 'react-dom';
/* import Words from './context'; */
import { Provider } from 'mobx-react';
import WordsStore from './stores/wordsStore.jsx';
import App from './App';

const stores = {
  wordsStore: new WordsStore()
}

ReactDOM.render(
  <Provider {...stores}>   
    {/* <Words /> */}
    <App />
  </Provider>,
  document.getElementById('root')
);

