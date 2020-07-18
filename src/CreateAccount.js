import React from "react";
import axios from 'axios';
import Navigationbar from "./Navigationbar";
import Notification from './Notification'
import {Helmet} from "react-helmet";

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      username:"",
      password:"",
      email:"",
      errors:false,
      notication: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }

  handleUsername(event){
    this.setState({ username: event.target.value });
  }

  handleEmail(event){
    this.setState({ email: event.target.value });
  }

  handlePassword(event){
    this.setState({ password: event.target.value });
  }

  handleSubmit(event){
    event.preventDefault() 
  
    var backend = 'https://workoutappapi.herokuapp.com/admin/createAccount';

    if(this.state.username.length > 5  && this.state.password.length > 5 && this.state.email.length > 5){
      var loginData =  {
        username: this.state.username,
        email: this.state.email,
        password: this.state.password,
      };
  
      axios({
        method: 'post',
        url: backend,
        data: loginData,
        headers: {'Content-Type': 'application/json' }
        })
        .then((response) => {
            //handle success
            console.log(response.data);
            this.setState({
              notication: true,
              errors: false
            })
        })
        .catch((response) => {
            //handle error
            console.log(response);
            this.setState({ 
              errors: true,
              username: "",
              email: "",
              password: ""
            });
        });
    } else{
      this.setState({ errors: true });
    }
  }
  render() {
    return (
      <div>
        <Helmet>
          <title>Create Account</title>
        </Helmet>
        <Navigationbar />
        {this.state.notication === true &&
            <Notification title="Account Created" text="You can create/edit exercises"/>
        }
        <div className="card  w-75">
            {this.state.errors === true &&
                  <div className="alert alert-danger" role="alert">
                    Error creating your account
                  </div>
              }
            <h2> Create Account </h2>
            
              <form onSubmit={this.handleSubmit} id="adminLogin" >
              <div className="form-group">
                    Username: 
                    <input type="text" className="form-control" placeholder="username" 
                    onChange={this.handleUsername} value={this.state.username}/>
                    Email: 
                    <input type="email" className="form-control" placeholder="email" 
                    onChange={this.handleEmail} value={this.state.email}/>
                    Password:
                    <input type="password" className="form-control" placeholder="password" 
                    onChange={this.handlePassword} value={this.state.password}/>
              </div>
                <p>
                  <button type="submit" className="btn btn-primary"  form="adminLogin">
                    Create Account
                  </button>
                </p>
              </form>
        </div>
      </div>
    );
  }
}
export default CreateAccount