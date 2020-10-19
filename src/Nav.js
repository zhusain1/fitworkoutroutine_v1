import React, { Component } from 'react';
import App from './App';
import UserWorkouts from './UserWorkouts';
import Workoutplan from './Workoutplan';
import Create from './Create';
import Edit from './Edit';
import ErrorPage from './ErrorPage';
import UpdateExercise from './UpdateExercise';
import Sample from './Sample';
import ExerciseManager from './ExerciseManager';
import CreateAccount from './CreateAccount';
import Delete from './Delete';
import RemoveExercise from './RemoveExercise';
import ForgotPassword from './ForgotPassword'
import UpdatePassword from './UpdatePassword';
import ForgotReset from './ForgotReset';
import Marketing from './Marketing';
import Footer from './Footer'
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
                    <Route exact path="/" component={Marketing} /> 
                    <Route exact path="/workouts" component={App} />
                    <Route exact path="/user/exercises" component={UserWorkouts} />
                    <Route exact path="/create" component={Create} />
                    <Route exact path="/edit" component={Edit} />
                    <Route exact path="/delete" component={Delete} />
                    <Route exact path="/workoutplan/:workout" component={Workoutplan} />
                    <Route exact path="/edit/exercise/:exercise" component={UpdateExercise} />
                    <Route exact path="/delete/exercise/:exercise" component={RemoveExercise} />
                    <Route exact path="/login" component={Sample} />
                    <Route exact path="/exerciseManager" component={ExerciseManager} />
                    <Route exact path="/createAccount" component={CreateAccount} />
                    <Route exact path="/forgotPassword" component={ForgotPassword} />
                    <Route exact path="/forgotPassword/user/:username" component={ForgotReset} />
                    <Route exact path="/forgotPassword/user/:username/reset" component={UpdatePassword} />
                    <Route component={ErrorPage} />
                </Switch>
                <Footer/>
            </Router>
        );
    }
}
export default Nav;