import React, { Component } from 'react';
import Navigationbar from './Navigationbar';
import Exercise from './Exercise';
import {Card } from 'react-bootstrap';
import {Helmet} from "react-helmet";
import axios from 'axios';
class Workoutplan extends Component {
    
    constructor(props){
        super(props);
        var workout;
        try{
            workout = this.props.history.location.state.workout;        
        }catch(error){
            console.log("ERROR");
            console.log(workout);
            workout = {}
            this.props.history.push('/error');
        }

        if(workout === undefined){
            console.log("ERROR AGAIN")
            this.props.history.push('/error');
        }
        /*
        id: 1
        workoutName: "Dumbell Press"
        workoutDescription: "Move dumbells above chest keeping elbows straight"
        workoutType: "Chest"
        workoutUrl: "workout.com"
        */

        this.state={
            workoutId : workout.id,
            workoutName : workout.workoutName,
            workoutDescription : workout.workoutDescription,
            workoutType : workout.workoutType,
            workoutUrl : workout.workoutUrl    
        };
        console.log(this.state);
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    handleSubmit(event){
        event.preventDefault();
        const url = 'https://workoutappapi.herokuapp.com/workouts/type/workout/'  + this.state.workoutType;
        axios.get(url)
        .then(res => {
            if(this.state.workoutId !== res.data.id){
                this.setState=({
                    workoutId : res.data.id,
                    workoutName : res.data.workoutName,
                    workoutDescription : res.data.workoutDescription,
                    workoutType : res.data.workoutType
                });
            }
            console.log(this.state);
        })
    } 

    render() {
        return (
            <div className="WorkoutPlan" key={this.state.workoutId}>
                <Helmet>
                    <title>Workout Plan</title>
                </Helmet>
                <Navigationbar />
                <Card className="card  w-75">
                <form onSubmit={this.handleSubmit}>
                    <Exercise title= {this.state.workoutName}   
                            text={this.state.workoutDescription}
                            id={this.state.workoutId}
                            type={this.state.workoutType}> 
                    </Exercise>
                    {/*<button type="submit" className="btn btn-primary">Next Exercise</button>*/ }
                </form>
                </Card>
            </div>
        );
    }
}
export default Workoutplan;
