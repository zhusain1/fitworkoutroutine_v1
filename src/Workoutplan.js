import React, { Component } from 'react';
import Navigationbar from './Navigationbar';
import Exercise from './Exercise';
import {Card } from 'react-bootstrap';
import {Helmet} from "react-helmet";
import Cookies from 'universal-cookie';
import axios from 'axios';
import { Link } from 'react-router-dom';
import plus from './plus.png';
import minus from './minus.png';
import Notification from './Notification';
class Workoutplan extends Component {
    constructor(props){
        super(props);
        const { match: { params } } = this.props;
        /*
        id: 1
        workoutName: "Dumbell Press"
        workoutDescription: "Move dumbells above chest keeping elbows straight"
        workoutType: "Chest"
        workoutUrl: "workout.com"
        */

    
        this.state={
            workoutId : '',
            workoutName : '',
            workoutDescription : '',
            workoutType : '' ,
            username: '',
            notification: ''
        };
        const cookies = new Cookies();
    
        /* Make call to check if code is valid from cookie */ 
        if(cookies.get('code') !== undefined && cookies.get('code').length > 0){
            // Server call post code and check if code is valid
            var backend = 'https://workoutappapi.herokuapp.com/admin/authorize';

            const code =  {
                authCode: cookies.get('code')
            };

            axios({
            method: 'post',
            url: backend,
            data: code,
            headers: {'Content-Type': 'application/json' }
            })
            .then((response) => {
                this.setState({username: response.data})
            })
            .catch((response) => {
                //handle error
            });
        }

        this.getWorkoutData(params.workout);

        this.handleAddWorkout = this.handleAddWorkout.bind(this);
        this.handleRemoveWorkout = this.handleRemoveWorkout.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleSubmit(){
        console.log('called');
        this.setState({
            notification: false
        });
    }

    handleAddWorkout(){
        console.log(this.state);
        // Make post call to link user and workout
        const backend = 'https://workoutappapi.herokuapp.com/admin/addWorkout/'+ this.state.username + '/' + this.state.workoutId;
        axios({
            method: 'post',
            url: backend
            })
        .then(res => {
            this.setState({
                notification: 'Exercise added'
            })
        }).catch((res) => {
            console.log(res);
        });
        this.setState({
            notification: ''
        });
    }

    handleRemoveWorkout(){
        console.log(this.state);
        // Make post call to link user and workout
        const backend = 'https://workoutappapi.herokuapp.com/admin/removeWorkout/'+ this.state.username + '/' + this.state.workoutId;
        axios({
            method: 'post',
            url: backend
            })
        .then(res => {
            this.setState({
                notification: 'Exercise Removed'
            })
        }).catch((res) => {
            console.log(res);
        });
        this.setState({
            notification: ''
        });
    }

    getWorkoutData(id){
        const url = 'https://workoutappapi.herokuapp.com/workouts/exercise/'+id;
        axios.get(url)
        .then(res => {
            const workout = res.data;
            this.setState({
                workoutName: workout.workoutName,
                workoutDescription: workout.workoutDescription,
                workoutId: workout.id,
                workoutType: workout.workoutType,
            });
        }).catch((res) => {
          this.props.history.push('/error');
        });
    }

    render() {
        return (
            <div className="WorkoutPlan" key={this.state.workoutId}>
                <Helmet>
                    <title>Workout Plan</title>
                </Helmet>
                <Navigationbar />
                {this.state.notification.length > 0 &&
                    <Notification title={this.state.notification} text="This exercise has been updated in Exercise Manager"/>
                }
                <Card className="card  w-75">
                <div className="back">
                    <Link to="/user/exercises">
                        Back
                    </Link>
                </div>
                <form onSubmit={this.handleSubmit}>
                    {this.state.username.length > 0 &&
                        <div>
                            <button type="button" className="btn btn-primary" id="icon" onClick={this.handleRemoveWorkout}>
                                <img src={minus} alt="minus"  id="minus"  width="30" height="30"/>
                            </button>
                            <button type="button" className="btn btn-primary" id="icon" onClick={this.handleAddWorkout}>
                                <img src={plus} alt="plus"  id="plus"  width="30" height="30"/>
                            </button>
                            <br/>
                        </div>
                    }
                    <Exercise title= {this.state.workoutName}   
                            text={this.state.workoutDescription}
                            id={this.state.workoutId}
                            type={this.state.workoutType}> 
                    </Exercise>
                </form>
                </Card>
            </div>
        );
    }
}
export default Workoutplan;
