import React      from 'react';
import ReactDOM   from 'react-dom';
import {Provider} from 'react-redux';
import Home       from './containers/Home'
import thunkMiddleware     from 'redux-thunk';
import * as serviceWorker  from './serviceWorker';
import { createStore, applyMiddleware, combineReducers } from 'redux';
import { messageHandler, chatRoomHandler, contactHandler, signInHandler } from './reducers'
import './index.css';

const rootReducer = combineReducers({messageHandler, chatRoomHandler, contactHandler, signInHandler}) 
const store       = createStore(rootReducer, applyMiddleware(thunkMiddleware));


ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <Home />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
