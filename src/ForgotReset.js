import React from "react";
import axios from 'axios';
import Navigationbar from "./Navigationbar";
import {
	withRouter
} from 'react-router-dom';

class ForgotReset extends React.Component {
  constructor(props) {
    super(props);

    var emailAddress = "";
    var username = "";
    try{
        const validRoute = this.props.history.location.state.validRoute;
        emailAddress = this.props.history.location.state.email;
        username = this.props.history.location.state.username;
        console.log("Valid Route: " + validRoute)
    }catch(error){
    console.log("Invalid Route");
    this.props.history.push('/');
    }

    this.state ={
      emailCode:"",
      username:username,
      email:emailAddress,
      errors:false,
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleEmailCode = this.handleEmailCode.bind(this);
    this.handleEmail = this.handleEmail.bind(this);
  }

  handleEmailCode(event){
    this.setState({ emailCode: event.target.value });
  }

  handleEmail(event){
    this.setState({ email: event.target.value });
  }

  handleSubmit(event){
    event.preventDefault() 
  
    var backend = 'https://workoutappapi.herokuapp.com/admin/verifyEmailCode';

    if(this.state.emailCode.length > 5  && this.state.email.length > 5){
      var loginData =  {
        emailCode: this.state.emailCode,
        email: this.state.email,
        username: this.state.username,
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
              errors: false
            })
            var path = '/forgotPassword/user/' + this.state.username + "/reset";
            this.props.history.push(path, {validRoute: true, username: this.state.username});
        })
        .catch((response) => {
            //handle error
            console.log(response);
            this.setState({ 
              errors: true,
              emailCode: "",
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
                    Error creating your account
                  </div>
              }
            <h2> Email Code </h2>
            
              <form onSubmit={this.handleSubmit} id="adminLogin" >
              <div className="form-group">
                    Sent to <u>{this.state.email}:</u>
                    <input type="text" className="form-control" placeholder="Email Code" 
                    onChange={this.handleEmailCode} value={this.state.emailCode}/>
              </div>
                <p>
                  <button type="submit" className="btn btn-primary"  form="adminLogin">
                    Reset Password
                  </button>
                </p>
              </form>
        </div>
      </div>
    );
  }
}
export default withRouter(ForgotReset);