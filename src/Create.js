import React from 'react';
import ReactDOM from 'react-dom';
import axios, { post } from 'axios';
import Navbar from './Navbar'
import Sample from './Sample'
import Notification from './Notification'

class Create extends React.Component {
  constructor(props) {
    super(props);
    this.state ={
      files:null,
      title:'',
      type:'Chest',
      description:'',
      notification:false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this)
  }

  handleSubmit(event){
    event.preventDefault() 
    console.log("File submitted and data submitted");

    // Save to DB
    var backend = 'https://workoutappapi.herokuapp.com/workout';

    var workoutData =  {
      workoutName: this.state.title,
      workoutDescription: this.state.description,
      workoutType: this.state.type,
      workoutUrl: this.state.files.name
    };
    axios({
      method: 'post',
      url: backend,
      data: workoutData,
      headers: {'Content-Type': 'application/json' }
      })
      .then(function (response) {
          //handle success
          console.log(response);
      })
      .catch(function (response) {
          //handle error
          console.log(response);
      });

      
    // Save to S3
    var server = 'https://workoutappapi.herokuapp.com/api/v1/workout-video/workoutVideo/upload';

    var bodyFormData = new FormData();
    bodyFormData.append('file', this.state.files); 
      
    axios({
      method: 'post',
      url: server,
      data: bodyFormData,
      headers: {'Content-Type': 'application/x-www-form-urlencoded' }
      })
      .then(function (response){
          //handle success
          console.log(response);
      })
      .catch(function (response) {
          //handle error
          console.log(response);
      });
      this.setState({
        notification: true,
      });
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
      <div className="Create">
        <Navbar />
        {this.state.notification === true &&
          <Notification/>
        }
        <Sample />
        <div className="card w-75">
                <h2> Create an exercise </h2>
                <form onSubmit={this.handleSubmit}>
                  <br/>
                  <div className="col-5">
                    <input type="text" className="form-control" placeholder="Title" 
                    onChange={this.handleChangeTitle}/>
                  </div>
                  <br/>
                  <div className="col-12">
                    <input type="text" className="form-control" placeholder="Description" 
                    onChange = {this.handleChangeDescription}/>
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
                  <div className="col-12">
                    <small id="fileDescription" className="form-text text-muted">
                      Choose a video that is less than 100 mb
                    </small>
                    <input type="file" onChange={this.handleChangeFile} className="form-control-file" />
                  </div>
                  <p>
                    <button type="submit" className="btn btn-primary">Create</button>
                  </p>
                </form>
           </div>             
        </div>
    );
  }
}


export default Create;
