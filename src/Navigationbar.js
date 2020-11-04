import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import Brand from './Brand';
import axios from 'axios';
import Cookies from 'universal-cookie';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';

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
        this.handleLogout = this.handleLogout.bind(this);
    }

    handleLogout(event){
        const cookies = new Cookies();
        cookies.set('code', "0", { path: '/' })
        console.log(cookies);
        this.props.history.push('/');
    }


    render() {
        return (
            <div>
                <div className="NavBar">
                    <ul className="navItems">   
                    <Navbar expand="lg">
                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <li>
                        <Link to="/">
                            <Brand/>
                        </Link>
                    </li>
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Nav className="mr-auto">
                            <li>
                                {this.state.validRoute === true ?
                                <Link to={{pathname:"/workouts", state:{validRoute: this.state.validRoute}}} id="login">
                                    Exercises
                                </Link> :
                                <Link to="/" id="login"> Exercises</Link>
                                }
                            </li>
                            <li>
                                {this.state.validRoute === true ?
                                <Link to={{pathname:"/exerciseManager", state:{validRoute: this.state.validRoute}}} id="login">
                                    Exercise Manager
                                </Link>:
                                <Link to="/login" id="login"> Exercise Manager </Link>
                                }
                            </li>                           
                            <div className="user">
                                <button className="btn btn-secondary" onClick={this.handleLogout}>
                                    Logout
                                </button>
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
export default withRouter(Navigationbar);