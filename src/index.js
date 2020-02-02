import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.css';
import Nav from './Nav';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
    <Nav />, document.getElementById('root'));
serviceWorker.unregister();
