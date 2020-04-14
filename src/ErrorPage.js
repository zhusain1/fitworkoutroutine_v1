import React, { Component } from 'react';
import {
	withRouter
} from 'react-router-dom';
import Navbar from './Navbar';
import logo from './logo.jpg';
import { Link } from 'react-router-dom';

class ErrorPage extends Component {
    render() {
        return (
            <div className="Errorpage">
                <Navbar />
                <div className="card  w-75">
                    <h2> Looks like you went to a page that doesn't exist! </h2>
                    <img src={logo} alt="Logo" width="100" height="100" className="Image"/>

                   <p> Find your way back  <u ><Link to="/">home</Link> </u> </p>
                </div>
            </div>
        );
    }
}
export default withRouter(ErrorPage);