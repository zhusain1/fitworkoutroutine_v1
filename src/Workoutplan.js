import React, { Component } from 'react';
import Navbar from './Navbar';
import Exercise from './Exercise';
import {Card } from 'react-bootstrap';
class Workoutplan extends Component {
    
    constructor(props){
        super(props);
        var workouts;
        try{
            workouts = this.props.history.location.state.workout;        
        }catch(error){
            console.log("ERROR");
            console.log(workouts);
            workouts = {}
            this.props.history.push('/error');
        }

        if(workouts === undefined){
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
        var eId = []
        var eName = []
        var eDescription = []
        var eType = []
        var eUrl = []

        for(let i = 0; i < workouts.length; i++){
            eId.push(workouts[i].id);
            eName.push(workouts[i].workoutName);
            eDescription.push(workouts[i].workoutDescription);
            eType.push(workouts[i].workoutType);
            eUrl.push(workouts[i].workoutUrl);
        }

        this.state={
            workoutId : eId,
            workoutName : eName,
            workoutDescription : eDescription,
            workoutType : eType,
            workoutUrl : eUrl    
        };

        console.log(this.state)
    }

    render() {
        return (
            <div>
                <Navbar />
                <Card className="card  w-75">
                    {this.state.workoutName.map((workout, index) => (
                    <Exercise title= {this.state.workoutName[index]}   
                            text={this.state.workoutDescription[index]}
                            id={this.state.workoutId[index]} 
                            key={index}> 
                        </Exercise>
                    ))}
                </Card>
            </div>
        );
    }
}
export default Workoutplan;