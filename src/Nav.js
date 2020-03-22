import React, { Component } from 'react';
import App from './App';
import Workoutplan from './Workoutplan';
import Navbar from './Navbar';
import Create from './Create';
import ErrorPage from './ErrorPage';
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";

class Nav extends Component {
    render() {
        return (   
            <Router>
                <Route exact path="/" component={App} /> 
                <Route exact path="/Create" component={Create} />
                <Route exact path="/Workoutplan" component={Workoutplan} />
                <Route path="/error" component={ErrorPage} />
            </Router>
        );
    }
}
export default Nav;