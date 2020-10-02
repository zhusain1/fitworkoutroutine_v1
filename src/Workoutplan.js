import React, { Component } from 'react';
import Navigationbar from './Navigationbar';
import Exercise from './Exercise';
import {Card } from 'react-bootstrap';
import {Helmet} from "react-helmet";
import axios from 'axios';
import { Link } from 'react-router-dom';
class Workoutplan extends Component {
    
    constructor(props){
        super(props);
        const { match: { params } } = this.props;

        console.log(params);
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
            workoutType : '' 
        };
        
        this.getWorkoutData(params.workout);
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
                <Card className="card  w-75">
                <div className="back">
                    <Link to="/">
                        Back
                    </Link>
                </div>
                <form onSubmit={this.handleSubmit}>
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
