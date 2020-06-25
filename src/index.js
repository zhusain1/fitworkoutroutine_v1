import React from 'react';
import ReactDOM from 'react-dom';    
import 'bootstrap/dist/css/bootstrap.css';
import Nav from './Nav';
import * as serviceWorker from './serviceWorker';

function noop() {}
console.log = noop;
console.error = noop;
console.warn = noop;

ReactDOM.render(
    <Nav />, document.getElementById('root'));
serviceWorker.unregister();
