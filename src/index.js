/**
 * @description entrance of front end
 */
import React from 'react';
import ReactDOM from 'react-dom';
// App is the root component of front end
import App from './App';
import * as serviceWorker from './serviceWorker';
// Global stylesheet
import './style.css'

const mountNode = document.getElementById('root')
ReactDOM.render(<App />, mountNode);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
