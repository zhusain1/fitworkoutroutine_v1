import React, { Component } from 'react';
import App from './App';
import Workoutplan from './Workoutplan';
import Navbar from './Navbar';
import Create from './Create';
import {
    BrowserRouter as Router,
    Route,
} from "react-router-dom";

class Nav extends Component {
    render() {
        return (   
            <Router>
                <Route exact path="/" component={App} /> 
                <Route path="/Create" component={Create} />
                <Route path="/Workoutplan" component={Workoutplan} />
            </Router>
        );
    }
}
export default Nav;