import React from 'react';
import axios from 'axios';
import NavBar from './NavBar'
import Notification from './Notification'
import Cookies from 'universal-cookie';
import { Spinner } from 'reactstrap';

class Create extends React.Component {

  componentWillMount(){
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
        })
        .catch((response) => {
            //handle error
            this.props.history.push('/');
        });
    }

  }

  constructor(props) {
    super(props);
    this.state ={
      files:null,
      title:'',
      type:'Chest',
      description:'',
      notification: false,
      loading: false,
      formErrors: false
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleChangeFile = this.handleChangeFile.bind(this);
    this.handleChangeTitle = this.handleChangeTitle.bind(this);
    this.handleChangeType = this.handleChangeType.bind(this);
    this.handleChangeDescription = this.handleChangeDescription.bind(this)
    this.handleFormErrors = this.handleFormErrors.bind(this);
  }

  handleFormErrors(){
    if(this.state.title.length < 1){
      return true;
    }
    else if(this.state.description.length < 1){
      return true;
    }
    else if(this.state.files === null){
      return true;
    }
    else if(this.state.files.size >= 60000000){
      return true;
    } 
    else{
      return false;
    }
  }

  handleSubmit(event){
    event.preventDefault() 

    // Save to DB
    var backend =  'https://workoutappapi.herokuapp.com/workout';

    if(!this.handleFormErrors()){
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
        .then((response) => {
            //handle success
            this.setState({
              loading: true
            })
        })
        .catch((response) => {
            //handle error
            this.setState({
              formErrors: true,
              loading: false,
              files: null,
              title: '',
              type: 'Chest',
              description: ''
            });
        });
  
        
      // Save to S3
      var server =  'https://workoutappapi.herokuapp.com/api/v1/workout-video/workoutVideo/upload';
  
      var bodyFormData = new FormData();
      bodyFormData.append('file', this.state.files); 
      
      if(!this.handleFormErrors()){
        axios({
          method: 'post',
          url: server,
          data: bodyFormData,
          headers: {'Content-Type': 'application/x-www-form-urlencoded' }
          })
          .then((response) =>{
              //handle success
              this.setState({
                notification: true,
                formErrors: false,
                loading: false,
                files: null,
                title: '',
                type: 'Chest',
                description: ''
              });
          })
          .catch((response) => {
              //handle error
              this.setState({
                formErrors: true,
                files: null,
                title: '',
                type: 'Chest',
                description: ''
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
        <NavBar />

        {this.state.loading === true &&
          <div id="info"> Uploading <Spinner color="dark" /> </div>
        }

        {this.state.notification === true &&
          <Notification title="Upload successful" text="Your workout was saved"/>
        }
        <div className="card w-75">
                {this.state.formErrors === true &&
                  <div className="alert alert-danger" role="alert">
                    Please fill out all fields
                  </div>
                }
                <h2> Create an exercise </h2>
                <form onSubmit={this.handleSubmit}>
                  <br/>
                  <div className="col-12">
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
                  <div className="col-12">
                    <small id="fileDescription" className="form-text text-muted">
                      Choose a video that is less than 60 mb
                    </small>
                    <input type="file" onChange={this.handleChangeFile} className="form-control-file"/>
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
