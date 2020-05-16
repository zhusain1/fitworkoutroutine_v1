import React, { Component } from 'react';
import {
	withRouter, Link
} from 'react-router-dom';
import './App.css'
import Navbar from './Navbar';
import Cookies from 'universal-cookie';
import Brand from './Brand';

class ExerciseManager extends Component {
    constructor(props){
        super(props)
        try{
            var validRoute = this.props.history.location.state.validRoute;
            console.log("Valid Route: " + validRoute)
          }catch(error){
            console.log("Invalid Route");
            this.props.history.push('/');
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
            <div className="ExerciseManager">
                <Navbar/>
                <Brand/>
                <div className="card w-75">
                    <h2> Exercise Manager </h2>
                    <ul className="list-group">
                        <li className="list-group-item">
                            <Link to='/create' className="btn btn-primary btn-lg btn-block">
                                Create
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link to='/edit' className="btn btn-primary btn-lg btn-block">
                                Edit
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <Link to='/delete' className="btn btn-primary btn-lg btn-block">
                                Delete
                            </Link>
                        </li>
                        <li className="list-group-item">
                            <button className="btn btn-secondary" onClick={this.handleLogout}>
                                Logout
                            </button>
                        </li>
                    </ul>
                </div>
            </div>
        );
    }
}
export default withRouter(ExerciseManager);