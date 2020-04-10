import React, { Component } from 'react';
import App from './App';
import Workoutplan from './Workoutplan';
import Navbar from './Navbar';
import Create from './Create';
import Edit from './Edit';
import ErrorPage from './ErrorPage';
import UpdateExercise from './UpdateExercise';
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
                    <Route exact path="/Edit" component={Edit} />
                    <Route exact path="/Workoutplan" component={Workoutplan} />
                    <Route exact path="/Edit/Exercise/:exercise" component={UpdateExercise} />
                    <Route component={ErrorPage} />
                </Switch>
            </Router>
        );
    }
}
export default Nav;