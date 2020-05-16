import React, { Component } from 'react';
import './App.css'
import logo from './logo-transparent.png';

class Brand extends Component{
    render(){
        return(
            <div className="Brand">
                <h2> Fit Workout Routine 
                    <img src={logo} alt="Logo" width="80" height="80" className="Image"/>
                </h2>
            </div>
        );
    }
}

export default Brand;