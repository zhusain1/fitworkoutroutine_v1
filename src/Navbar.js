import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
class Navbar extends Component {
    constructor(props){
        super(props)

        const cookies = new Cookies();

        this.state ={
            validRoute:false,
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
                console.log(response.data);
                this.setState({
                    validRoute: true
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
            <div className="NavBar">
                <ul className="navItems">
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
                </ul>
            </div>
        );
    }
}
export default Navbar;