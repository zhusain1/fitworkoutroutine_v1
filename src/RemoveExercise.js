import React, { Component } from 'react';
import Navigationbar from './Navigationbar'
import axios from 'axios';
import Notification from './Notification'
import Cookies from 'universal-cookie';

class RemoveExercise extends Component {
    constructor(props) {
        super(props);
        var redirectFlag = false;
        const { match: { params } } = this.props;
        const cookies = new Cookies();

        // if there is no cookie
        if(cookies.get('code') === undefined || !cookies.get('code').length > 0){
          this.props.history.push('/');
        }
        
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
                //handle success
                console.log(response.data);
            })
            .catch((response) => {
                //handle error
                this.props.history.push('/');
            });
        }
        this.state ={
            files:null,
            title:'',
            type:'',
            description:'',
            id: 0,
            fileName: '',
            notification:false,
            formErrors: false,
            redirect: redirectFlag
        };
 
        if(!redirectFlag){
          this.getWorkoutData(params.exercise);
        }

        console.log(redirectFlag)

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChangeFile = this.handleChangeFile.bind(this);
        this.handleChangeTitle = this.handleChangeTitle.bind(this);
        this.handleChangeType = this.handleChangeType.bind(this);
        this.handleChangeDescription = this.handleChangeDescription.bind(this)
        this.handleFormErrors = this.handleFormErrors.bind(this);
    }

    getWorkoutData(id){
      const url = 'https://workoutappapi.herokuapp.com/workouts/exercise/'+id;
      axios.get(url)
      .then(res => {
          const workout = res.data;
          this.setState({
              title: workout.workoutName,
              description: workout.workoutDescription,
              id: workout.id,
              type: workout.workoutType,
              fileName: workout.workoutUrl
          });
      }).catch((res) => {
        this.props.history.push('/error');
      });
    }

    handleFormErrors(){
        if(this.state.title.length < 1){
          return true;
        }
        else if(this.state.description.length < 1){
          return true;
        }
        else{
          return false;
        }
      }

    handleSubmit(event){
        event.preventDefault() 
        console.log("File submitted and data submitted");
    
        // Save to DB
        var backend =  'https://workoutappapi.herokuapp.com/workouts/' + this.state.id; //'https://workoutappapi.herokuapp.com/workout';
    
        if(!this.handleFormErrors()){  
          axios({
            method: 'delete',
            url: backend,
            headers: {'Content-Type': 'application/json' }
            })
            .then((response) => {
                //handle success
                this.setState({
                  notification: true,
                  formErrors: false
                });
                this.props.history.push('/exerciseManager');
            })
            .catch((response) => {
                //handle error
                this.setState({
                  formErrors: true,
                });
            });
        } else{
          this.setState({
            formErrors: true
          });
        }
      }
    
      handleChangeFile(event) {
        let files = event.target.files;
    
        console.log(files);
        this.setState({ files: files[0] });
      }
    
      handleChangeTitle(event){
        this.setState({ title: event.target.value });
      }
    
      handleChangeType(event){
        this.setState({ type: event.target.value });
      }
    
      handleChangeDescription(event){
        this.setState({description: event.target.value });
      }
    
    render() {
        return (
        <div>
            <Navigationbar />
            {this.state.notification === true &&
              <Notification title="Update Successful" text="Your workout was deleted"/>
            }
            <div className="card  w-75">
               {this.state.formErrors === true &&
                  <div className="alert alert-danger" role="alert">
                    Please fill out all fields
                  </div>
                }
               <h2>Delete Exercise</h2>
               <form onSubmit={this.handleSubmit}>
                  <br/>
                  <div className="col-12">
                    <input type="text" className="form-control" placeholder="Title" 
                    onChange={this.handleChangeTitle} value={this.state.title} readOnly/>
                  </div>
                  <br/>
                  <div className="col-12">
                    <input type="text" className="form-control" placeholder="Description" 
                    onChange = {this.handleChangeDescription} value={this.state.description} readOnly/>
                  </div>
                  <br/>
                  <div className="col-5"> 
                    <select className="form-control" value={this.state.type} onChange={this.handleChangeType}>
                      <option disabled value="">Bodypart to choose...</option>
                      <option value="Chest">Chest</option>
                      <option value="Arms">Arms</option>
                      <option value="Legs">Legs</option>
                      <option value="Back">Back</option>
                      <option value="Abs">Abs</option>
                      <option value="Cardio">Cardio</option>
                    </select>
                  </div>
                  <br/>
                  <div className="col-5">
                    <input type="text" className="form-control" placeholder="FileName" 
                     value={this.state.fileName} readOnly/>
                  </div>
                  <p>
                    <button type="submit" className="btn btn-primary">Delete</button>
                  </p>
                </form>
            </div>
        </div>
        );
    }
}

export default RemoveExercise;