import React, { Component } from 'react';
import {
	withRouter
} from 'react-router-dom';
import PreNavigationbar from './PreNavigationbar';
import { Link } from 'react-router-dom';

class ErrorPage extends Component {
    render() {
        return (
            <div className="Errorpage">
                <PreNavigationbar />
                <div className="card  w-75">
                    <h2> Looks like you went to a page that doesn't exist! </h2>
                   <p> Find your way back  <u ><Link to="/">home</Link> </u> </p>
                </div>
            </div>
        );
    }
}
export default withRouter(ErrorPage);