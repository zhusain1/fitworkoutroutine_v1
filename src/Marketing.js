import React, { Component } from 'react';
import Navigationbar from './Navigationbar';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'universal-cookie';
import './App.css'

class Marketing extends Component{
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
    render(){
        return(
            <div className="marketing">
                <Navigationbar/>
                <div class="container">
                    <br/>
                    <br/>
                    <br/>
                    <h2> Find the right exercises for you</h2>
                        <div className="col">
                            <Link to="/exerciseManager">
                                
                            </Link>
                            {this.state.validRoute === true ?
                                <Link to={{pathname:"/exerciseManager", state:{validRoute: this.state.validRoute}}} id="login">
                                    <button className="btn btn-primary">Login</button>
                                </Link>:
                                <Link to="/login" id="login"> 
                                    <button className="btn btn-primary">Login</button>
                                </Link>
                            }
                            <br/>
                            <small>
                                <Link to="/createAccount">
                                    <u> Sign up </u>
                                </Link>
                            </small>
                        </div>
                    </div>
                </div>
        );
    }
}

export default Marketing;