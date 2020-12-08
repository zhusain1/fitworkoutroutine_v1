import React from "react";
import axios from 'axios';
import Navigationbar from "./Navigationbar";

class UpdatePassword extends React.Component {
  constructor(props) {
    super(props);

    var user = "";
    try{
      const validRoute = this.props.history.location.state.validRoute;
      user = this.props.history.location.state.username;
      console.log("Valid Route: " + validRoute)
    }catch(error){
      console.log("Invalid Route");
      this.props.history.push('/');
    }

    this.state ={
      password:"",
      confirmPassword:"",
      username:user
    };

    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleConfirmPassword = this.handleConfirmPassword.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }
  handleConfirmPassword(event){
    this.setState({ confirmPassword: event.target.value });
  }

  handlePassword(event){
    this.setState({ password: event.target.value });
  }

  handleSubmit(event){
    event.preventDefault() 
  
    var backend = 'https://workoutappapi.herokuapp.com/admin/updatePassword';

    if(this.state.password.length > 5  && this.state.confirmPassword.length > 5 && 
      this.state.password === this.state.confirmPassword){
      var loginData =  {
        username: this.state.username,
        password: this.state.password
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
            this.props.history.push('/');
        })
        .catch((response) => {
            //handle error
            console.log(response);
            this.setState({ 
              errors: true,
              username: "",
              confirmPassword: "",
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
                    Passwords do not match
                  </div>
              }
            <h2> Reset Password </h2>
              <form onSubmit={this.handleSubmit} id="adminLogin" >
              <div className="form-group">
                    <label htmlFor="password" id="password"> Password:</label> 
                    <input type="password" className="form-control" placeholder="password" 
                    onChange={this.handlePassword} value={this.state.password}/>
                    <label htmlFor="password" id="password"> Confirm Password:</label> 
                    <input type="password" className="form-control" placeholder="confirm password" 
                    onChange={this.handleConfirmPassword} value={this.state.confirmPassword}/>
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
export default UpdatePassword