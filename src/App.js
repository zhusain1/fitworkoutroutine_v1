import React, { Component } from 'react';
import {
	withRouter
} from 'react-router-dom';
import './App.css'
import Navigationbar from './Navigationbar';
import axios from 'axios';
import Info from './Info'
import {Helmet} from "react-helmet";
import ListExercise from './ListExercise';

class App extends Component {
    constructor(props){
        super(props)
        this.state={
            bodyPart:"Chest",
            workoutNames: [],
            workoutId: []
        };
    
        this.handleBodyPartChange = this.handleBodyPartChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleBodyPartChange(event){
        this.setState({
            bodyPart: event.target.value
        });
    }

    handleSubmit(event){
        event.preventDefault();

        const url = 'https://workoutappapi.herokuapp.com/workouts/type/'+this.state.bodyPart;

        axios.get(url)
        .then(res => {
            const workouts = res.data;
            var eNames = []
            var eId = []
            for(let i = 0; i < workouts.length; i++){
              eNames.push(workouts[i].workoutName);
              eId.push(workouts[i].id);
            }
            this.setState({
              workoutNames: eNames,
              workoutId: eId
            });
            console.log(this.state);
        })
    }

    render() {
        return (
            <div className="App">
                <Helmet>
                    <title>Fit Workout Routine</title>
                </Helmet>
                <Navigationbar />
                <div className="card  w-75">
                    <Info />
                    <h2> Find Exercises</h2>
                    {this.state.workoutNames.length > 0 &&
                        this.state.workoutNames.map((workout, index) => (
                        <ListExercise title={this.state.workoutNames[index]}
                            id = {this.state.workoutId[index]}     
                            key={index}> 
                        </ListExercise>
                    ))}
                    
                    {this.state.workoutNames.length < 1 &&
                        <form onSubmit={this.handleSubmit}>
                            <label htmlFor="bodyPart"> Focus workout on: </label>
                            <br/>
                            <div className="col-3">
                            <select className="form-control" value={this.state.bodyPart} onChange={this.handleBodyPartChange}>
                                <option value="Chest">Chest</option>
                                <option value="Arms">Arms</option>
                                <option value="Legs">Legs</option>
                                <option value="Back">Back</option>
                                <option value="Abs">Abs</option>
                                <option value="Cardio">Cardio</option>
                            </select>
                            <br/>
                            </div>
                            <p>
                                <button type="submit" className="btn btn-primary">Generate Workout</button>
                            </p>
                        </form>}
                </div>
            </div>
        );
    }
}
export default withRouter(App);
