import React, { Component } from 'react';
import PreNavigationbar from './PreNavigationbar';
import { Link } from 'react-router-dom';
import './App.css'

class Marketing extends Component{
    render(){
        return(
            <div className="marketing">
                <PreNavigationbar/>
                <div class="container">
                    <br/>
                    <br/>
                    <br/>
                    <h2> Find the right exercises for you</h2>
                        <div className="col">
                            <Link to="/login" id="login"> 
                                <button className="btn btn-primary">Login</button>
                            </Link>
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