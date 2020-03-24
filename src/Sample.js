import React from "react";
import {Button, Modal } from 'react-bootstrap';
import {
  Link
} from "react-router-dom";
import axios from 'axios';
  

class Sample extends React.Component {

  constructor(props) {
    super(props);

    this.state ={
      username:"",
      password:"",
      show:true,
      errors:false
    };
 
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

    var found = false;
    axios({
      method: 'post',
      url: backend,
      data: loginData,
      headers: {'Content-Type': 'application/json' }
      })
      .then((response) => {
          //handle success
          this.setState({ 
            show: false ,
            errors: false
          });

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
        <Modal show={this.state.show} animation={false
        }>
        <Modal.Header>
          <Modal.Title>
          {this.state.errors === true &&
                <div className="alert alert-danger" role="alert">
                  Invalid username/password
                </div>
            }
            Administrator Login
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <form onSubmit={this.handleSetShow} id="adminLogin">
          <div className="col-5">
          Username: 
              <input type="text" className="form-control" placeholder="username" 
              onChange={this.handleUsername} value={this.state.username}
              />
          </div>
            <br/>
            <div className="col-5">
            Password:
              <input type="password" className="form-control" placeholder="password" 
              onChange={this.handlePassword} value={this.state.password}
              />
          </div>
        </form>
        </Modal.Body>
        <Modal.Footer>
          <button type="submit" className="btn btn-primary"  form="adminLogin">
            Login
          </button>
          <Link to='/' > Close </Link>
        </Modal.Footer>
      </Modal>
      </div>
    );
  }
}
export default Sample;