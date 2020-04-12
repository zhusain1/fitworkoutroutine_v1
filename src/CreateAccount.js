import React from "react";
import axios from 'axios';
import Navbar from "./Navbar";
import Notification from './Notification'

class CreateAccount extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      username:"",
      password:"",
      errors:false,
      notication: false
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleUsername(event){
    this.setState({ username: event.target.value });
  }

  handlePassword(event){
    this.setState({ password: event.target.value });
  }

  handleSubmit(event){
    event.preventDefault() 
  
    var backend = 'https://workoutappapi.herokuapp.com/admin/createAccount';

    var loginData =  {
      username: this.state.username,
      password: this.state.password
    };

    var found = false;
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
            password: ""
          });
      });
  }
  render() {
    return (
      <div>
        <Navbar />
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
                <div>
                    Username: 
                    <input type="text" className="form-control" placeholder="username" 
                    onChange={this.handleUsername} value={this.state.username}/>
                     Password:
                    <input type="password" className="form-control" placeholder="password" 
                    onChange={this.handlePassword} value={this.state.password}/>
                </div>
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