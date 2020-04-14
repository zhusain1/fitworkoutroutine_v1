import React, { Component } from 'react';
import App from './App';
import Workoutplan from './Workoutplan';
import Create from './Create';
import Edit from './Edit';
import ErrorPage from './ErrorPage';
import UpdateExercise from './UpdateExercise';
import Sample from './Sample';
import ExerciseManager from './ExerciseManager';
import CreateAccount from './CreateAccount';
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
                    <Route exact path="/create" component={Create} />
                    <Route exact path="/edit" component={Edit} />
                    <Route exact path="/workoutplan" component={Workoutplan} />
                    <Route exact path="/edit/exercise/:exercise" component={UpdateExercise} />
                    <Route exact path="/login" component={Sample} />
                    <Route exact path="/exerciseManager" component={ExerciseManager} />
                    <Route exact path="/createAccount" component={CreateAccount} />
                    <Route component={ErrorPage} />
                </Switch>
            </Router>
        );
    }
}
export default Nav;