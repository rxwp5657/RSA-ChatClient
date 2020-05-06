import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux'
import { createStore } from 'redux';
import ChatRoom from './containers/ChatRoom.js'
import * as serviceWorker from './serviceWorker';
import { messageHandler } from './reducers'
import './index.css';


const store = createStore(messageHandler)


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChatRoom />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
