import React, { Component } from 'react';
import Navbar from './Navbar'
import axios from 'axios';
import Sample from './Sample';
import Notification from './Notification'

class UpdateExercise extends Component {
    constructor(props) {
        super(props);

        const { match: { params } } = this.props;
        console.log(params.exercise);

        this.getWorkoutData(params.exercise)
      
        this.state ={
            files:null,
            title:'',
            type:'',
            description:'',
            id: 0,
            fileName: '',
            notification:false,
            formErrors: false
          };
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
          
          var filePath;
          if(this.state.files == null){
            filePath = this.state.fileName;
          } else{
            filePath = this.state.files.name;
          }

          var workoutData =  {
            workoutName: this.state.title,
            workoutDescription: this.state.description,
            workoutType: this.state.type,
            workoutUrl: filePath
          };
          
          axios({
            method: 'put',
            url: backend,
            data: workoutData,
            headers: {'Content-Type': 'application/json' }
            })
            .then((response) => {
                //handle success
                this.setState({
                  notification: true,
                  formErrors: false
                });
                console.log(response);
            })
            .catch((response) => {
                //handle error
                this.setState({
                  formErrors: true,
                });
            });
      
            
          
          var server =  'https://workoutappapi.herokuapp.com/api/v1/workout-video/workoutVideo/update' //'https://workoutappapi.herokuapp.com/api/v1/workout-video/workoutVideo/upload';
      
          var bodyFormData = new FormData();
          bodyFormData.append('file', this.state.files); 
          
          if(!this.state.formErrors && this.state.files != null){
            axios({
              method: 'post',
              url: server,
              data: bodyFormData,
              headers: {'Content-Type': 'application/x-www-form-urlencoded' }
              })
              .then((response) =>{
                  //handle success
                  console.log(response);
                  this.setState({
                    fileName: this.state.files.name
                  });
                  console.log(this.state);
              })
              .catch((response) => {
                  //handle error
                  this.setState({
                    formErrors: true,
                  });
              });
          }
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
            <Navbar />
            {this.state.notification === true &&
              <Notification/>
            }
            <div className="card  w-75">
               <Sample/>
               {this.state.formErrors === true &&
                  <div className="alert alert-danger" role="alert">
                    Please fill out all fields
                  </div>
                }
               <h2>Edit Exercise</h2>
               <form onSubmit={this.handleSubmit}>
                  <br/>
                  <div className="col-5">
                    <input type="text" className="form-control" placeholder="Title" 
                    onChange={this.handleChangeTitle} value={this.state.title}/>
                  </div>
                  <br/>
                  <div className="col-12">
                    <input type="text" className="form-control" placeholder="Description" 
                    onChange = {this.handleChangeDescription} value={this.state.description}/>
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
                  <div className="col-12">
                    <small id="fileDescription" className="form-text text-muted">
                      Choose a video that is less than 100 mb
                    </small>
                    <input type="file" onChange={this.handleChangeFile} className="form-control-file"/>
                  </div>
                  <p>
                    <button type="submit" className="btn btn-primary">Update</button>
                  </p>
                </form>
            </div>
        </div>
        );
    }
}

export default UpdateExercise;