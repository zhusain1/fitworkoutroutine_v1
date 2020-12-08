import React, { Component } from 'react';
import '../App.css'
import Navigationbar from './Navigationbar';
import axios from 'axios';
import ListExercise from './ListExercise';
import Cookies from 'universal-cookie';
import { Spinner } from 'reactstrap';

class UserWorkouts extends Component {
    constructor(props){
        super(props)
        this.state={
            workoutNames: [],
            workoutId: [],
            username: ''
        };

        const cookies = new Cookies();

        /* Make call to check if code is valid from cookie */ 
        if(cookies.get('code') !== undefined && cookies.get('code').length > 1){
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
                console.log(response.data);
                this.setState({username: response.data})
                this.getWorkoutData();
            })
            .catch((response) => {
                this.props.history.push('/');
            });
        }
    }

    getWorkoutData(){
        const url = 'https://workoutappapi.herokuapp.com/admin/workouts/'+this.state.username;
        console.log(this.state.username);
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

    shouldComponentUpdate(nextProps, nextState) {
        return true;
    }

    render() {
        return (
            <div className="App">
                <Navigationbar />
                <div className="card  w-75">
                    <h2> My Exercises</h2>
                    <div>
                        {this.state.workoutNames.length < 1 &&
                            <Spinner color="dark" />
                        }
                        {this.state.workoutNames.length > 0 &&
                            this.state.workoutNames.map((workout, index) => (
                            <ListExercise title={this.state.workoutNames[index]}
                                id = {this.state.workoutId[index]}     
                                key={index}> 
                            </ListExercise>
                        ))}
                    </div>
                </div>
            </div>
        );
    }
}
export default UserWorkouts;
