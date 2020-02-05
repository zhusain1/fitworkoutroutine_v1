import React, { Component } from 'react';
import {
	withRouter
} from 'react-router-dom';
import './App.css'
import Navbar from './Navbar';
import logo from './logo.jpg';
import axios from 'axios';

class App extends Component {
    constructor(props){
        super(props)
        this.state={
          bodyPart:"Chest",
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

        const url = 'https://workoutappapi.herokuapp.com/workouts/type/'  + this.state.bodyPart;

        axios.get(url)
        .then(res => {
            const workout = res.data;
            this.props.history.push('/Workoutplan', { workout });
        })
      }

    render() {
        return (
            <div className="App">
                <Navbar />
                <div className="card  w-75">
                    <h2> Workout Routine </h2>
                    <img src={logo} alt="Logo" width="100" height="100" className="Image"/>
                    <form onSubmit={this.handleSubmit}>
                        <label htmlFor="bodyPart"> Body part to workout today: </label>
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
                    </form>
                </div>
            </div>
        );
    }
}
export default withRouter(App);