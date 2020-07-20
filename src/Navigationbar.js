import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import account from './account.png';
class Navigationbar extends Component {
    constructor(props){
        super(props)

        const cookies = new Cookies();

        this.state ={
            validRoute:false,
            username: ""
        };
        
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
                this.setState({
                    validRoute: true,
                    username: response.data
                });
            })
            .catch((response) => {
                //handle error
                this.setState({
                    validRoute: false
                });
            });
        }
    }


    render() {
        return (
            <div>
                <div className="NavBar">
                    <ul className="navItems">   
                    <Navbar expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <li>
                                <Link to="/">Workouts</Link>
                            </li>
                            <li>
                                {this.state.validRoute === true ?
                                <Link to={{pathname:"/exerciseManager", state:{validRoute: this.state.validRoute}}}>
                                    Manage Exercises
                                </Link>:
                                <Link to="/login">Manage Exercises</Link>
                                }
                            </li>
                            <li>
                                <Link to="/createAccount">Create Account</Link>
                            </li>
                            <div className="user">
                                <img src={account} alt="account" width="30" height="30"/> 
                                <span className="avatar"> {this.state.username} </span>
                            </div>
                        </Nav>
                    </Navbar.Collapse>
                    </Navbar>
                    </ul>
                </div>
            </div>
        );
    }
}
export default Navigationbar;