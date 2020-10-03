import React from "react";
import axios from 'axios';
import {
	withRouter
} from 'react-router-dom';
import Navigationbar from "./Navigationbar";

class ForgotPassword extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      username:"",
      email:"",
      errors:false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }

  handleUsername(event){
    this.setState({ username: event.target.value });
  }

  handleEmail(event){
    this.setState({ email: event.target.value });
  }

  handleSubmit(event){
    event.preventDefault() 
  
    var backend = 'https://workoutappapi.herokuapp.com/admin/resetPassword';

    if(this.state.username.length > 5  && this.state.email.length > 5){
      var loginData =  {
        username: this.state.username,
        email: this.state.email
      };
  
      axios({
        method: 'post',
        url: backend,
        data: loginData,
        headers: {'Content-Type': 'application/json' }
        })
        .then((response) => {
            //handle success
            this.setState({
              errors: false
            })

            var path = '/forgotPassword/user/' + this.state.username;
            this.props.history.push(path, {validRoute: true, email: this.state.email, username: this.state.username});
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
        <Navigationbar />
        <div className="card  w-75">
            {this.state.errors === true &&
                  <div className="alert alert-danger" role="alert">
                    Error cannot find username/email
                  </div>
              }
            <h2> Reset Password </h2>
            
              <form onSubmit={this.handleSubmit} id="adminLogin" >
              <div className="form-group">
                    <label htmlFor="username" id="username"> Username:</label> 
                    <input type="text" className="form-control" placeholder="username" 
                    onChange={this.handleUsername} value={this.state.username}/>
                    <label htmlFor="email" id="email"> Email:</label> 
                    <input type="email" className="form-control" placeholder="email" 
                    onChange={this.handleEmail} value={this.state.email}/>
              </div>
                <p>
                  <button type="submit" className="btn btn-primary"  form="adminLogin">
                    Submit
                  </button>
                </p>
              </form>
        </div>
      </div>
    );
  }
}
export default withRouter(ForgotPassword);