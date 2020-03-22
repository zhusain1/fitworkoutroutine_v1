import React, { Component } from 'react';
import App from './App';
import Workoutplan from './Workoutplan';
import Navbar from './Navbar';
import Create from './Create';
import ErrorPage from './ErrorPage';
import {
    BrowserRouter as Router,
    Route,
    Switch,
} from "react-router-dom";

class Nav extends Component {
    render() {
        return (   
            <Router>
                <Switch>
                    <Route exact path="/" component={App} /> 
                    <Route exact path="/Create" component={Create} />
                    <Route exact path="/Workoutplan" component={Workoutplan} />
                    <Route component={ErrorPage} />
                </Switch>
            </Router>
        );
    }
}
export default Nav;