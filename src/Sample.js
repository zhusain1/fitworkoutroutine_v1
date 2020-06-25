import React from "react";
import {
	withRouter, Redirect
} from 'react-router-dom';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Navigationbar from "./Navigationbar";
  
class Sample extends React.Component {
  constructor(props) {
    super(props);

    this.state ={
      username:"",
      password:"",
      redirect:false,
      errors:false
    };


    // Cookie stuff
    const cookies = new Cookies();

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
            this.setState({
              redirect:true
            });
        })
        .catch((response) => {
            //handle error
            console.log(response);
        });
    }
    
    this.handleSetShow = this.handleSetShow.bind(this);
    this.handleUsername = this.handleUsername.bind(this);
    this.handlePassword = this.handlePassword.bind(this);
  }

  handleUsername(event){
    this.setState({ username: event.target.value });
  }

  handlePassword(event){
    this.setState({ password: event.target.value });
  }

  handleSetShow(event){
    event.preventDefault() 
  
    var backend = 'https://workoutappapi.herokuapp.com/admin/login';

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
          const cookies = new Cookies();
          console.log(response.data);
          cookies.set('code', response.data, { path: '/' });
          this.setState({ 
            errors: false
          });
          this.props.history.push('/exerciseManager', {validRoute: true});
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
        <Navigationbar />
        {this.state.redirect === true ?
          <Redirect to={{
            pathname: '/exerciseManager',
            state: { validRoute: true }
        }}/>
        :
        <div className="card  w-75">
            {this.state.errors === true &&
                  <div className="alert alert-danger" role="alert">
                    Invalid username/password
                  </div>
              }
            <h2> Exercise Manager </h2>
            
              <form onSubmit={this.handleSetShow} id="adminLogin" >
              <div className="form-group">
                <div>
                    Username: 
                    <input type="text" className="form-control" placeholder="username" 
                    onChange={this.handleUsername} value={this.state.username}/>
                     Password:
                    <input type="password" className="form-control" placeholder="password" 
                    onChange={this.handlePassword} value={this.state.password}/>
                     <div className="col">
                      <Link to="/forgotPassword">
                        <small>Forgot Password </small>
                        <br/>
                      </Link>
                    </div>
                </div>
              </div>
                <div className="row">
                  <div className="col">
                    <button type="submit" className="btn btn-primary" form="adminLogin">
                      Login
                    </button>
                  </div>
                  <div className="col">
                    <Link to="/createAccount">
                      <button className="btn btn-secondary">Create Account </button>
                    </Link>
                  </div>
                </div>
                <br/>
              </form>
        </div>}
      </div>
    );
  }
}
export default withRouter(Sample);